export type DisplayColumn = { key: string; header: string };

export type InputType = {
  label: string;
  proprety: string;
  type?: "text" | "number" | "select" | "date" | "file" | "float";
  placeholder: string;
  options?: Array<{ label: string; value: string | number }>;
  endpoint?: string;
  formatData?: (data: any) => Array<{ label: string; value: string | number }>;
};

export interface ModelFormat {
  verboseName: {
    single: string;
    plural: string;
  };
  displayColumns: DisplayColumn[];
  searchKeys: string[];
  form: InputType[];
  include?: { [key: string]: any };
}

export const product: ModelFormat = {
  verboseName: {
    single: "produit",
    plural: "produits",
  },
  searchKeys: ["name", "price", "litrage"],
  displayColumns: [
    { key: "url", header: "url" },
    { key: "name", header: "nom" },
    { key: "productCategory.name", header: "catégorie" },
    { key: "price", header: "prix" },
    { key: "currency.name", header: "devise" },
    { key: "litrage", header: "litrage" },
    { key: "description", header: "description" },
    { key: "createdAt", header: "ajouté le" },
  ],
  form: [
    { label: "url", proprety: "url", type: "text", placeholder: "url" },
    { label: "nom", proprety: "name", type: "text", placeholder: "nom" },
    { label: "prix", proprety: "price", type: "number", placeholder: "prix" },
    {
      label: "devise",
      proprety: "currencyId",
      type: "select",
      endpoint: "/api/core/currency",
      placeholder: "devise",
    },
    {
      label: "litrage",
      proprety: "litrage",
      type: "text",
      placeholder: "litrage",
    },
    {
      label: "description",
      proprety: "description",
      type: "text",
      placeholder: "description",
    },
    {
      label: "catégorie",
      proprety: "productCategoryId",
      type: "select",
      placeholder: "catégorie",
      endpoint: "/api/core/productCategory",
    },
  ],
  include: {
    currency: true,
    productCategory: true,
  },
};

export const productCategory: ModelFormat = {
  verboseName: {
    single: "categorie des produis",
    plural: "categories des produis",
  },
  displayColumns: [
    { key: "name", header: "nom" },
    { key: "createdAt", header: "ajouté le" },
  ],
  searchKeys: ["name"],
  form: [
    {
      label: "nom",
      proprety: "name",
      type: "text",
      placeholder: "nom de la categorie",
    },
  ],
  include: {},
};

export const currency: ModelFormat = {
  verboseName: {
    single: "devise monaitaire",
    plural: "devises monaitaires",
  },
  displayColumns: [
    { key: "name", header: "nom" },
    { key: "exchangeRate", header: "taux de change" },
  ],
  searchKeys: ["name"],
  form: [
    {
      label: "nom",
      proprety: "name",
      type: "text",
      placeholder: "nom de la categorie",
    },
    {
      label: "tax de change",
      proprety: "exchangeRate",
      type: "number",
      placeholder: "taux de change",
    },
  ],
  include: {},
};

export const user: ModelFormat = {
  verboseName: {
    single: "produit",
    plural: "produits",
  },
  searchKeys: ["name", "price", "litrage"],
  displayColumns: [
    { key: "name", header: "nom" },
    { key: "mail", header: "adresse mail" },
    { key: "createdAt", header: "ajouté le" },
  ],
  form: [
    { label: "nom", proprety: "name", type: "text", placeholder: "nom" },
    {
      label: "adresse mail",
      proprety: "mail",
      type: "text",
      placeholder: "adresse mail",
    },
    {
      label: "ajouté le",
      proprety: "password",
      type: "text",
      placeholder: "ajouté le",
    },
  ],
  include: {},
};
