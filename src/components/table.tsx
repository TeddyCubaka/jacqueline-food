import { useState, useEffect } from "react";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface Column<T> {
  key: string;
  header: string;
  render?: (value: any, item: T) => React.ReactNode;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  className?: string;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  selectable = false,
  onRowSelect,
  actions,
  filters,
  searchable = false,
  searchKeys = [],
  className = "",
}: TableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (searchable && searchTerm) {
      const filtered = data.filter((item) =>
        searchKeys.some((key) => {
          const value = item[key];
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        })
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, data, searchable, searchKeys]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.checked ? filteredData : [];
    setSelectedRows(selected);
    onRowSelect?.(selected);
  };

  const handleSelectRow = (item: T) => {
    const newSelectedRows = selectedRows.includes(item)
      ? selectedRows.filter((row) => row !== item)
      : [...selectedRows, item];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex justify-between items-center gap-4 mb-4">
          {searchable && (
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          {filters}
          {actions}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedRows.length === filteredData.length}
                    onChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left text-sm font-medium text-gray-500 tracking-wider ${
                    column.width || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((item, index) => (
              <tr
                key={item.id || index}
                className="hover:bg-gray-50 transition-colors"
              >
                {selectable && (
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedRows.includes(item)}
                      onChange={() => handleSelectRow(item)}
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td
                    key={`${item.id || index}-${column.key}`}
                    className="px-4 py-3 whitespace-nowrap text-sm text-gray-500"
                  >
                    {column.render
                      ? column.render(item[column.key as keyof T], item)
                      : String(item[column.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-4">
          <div className="text-sm text-gray-500">
            Affichage {startIndex + 1} à{" "}
            {Math.min(endIndex, filteredData.length)} sur {filteredData.length}{" "}
            entrées
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
