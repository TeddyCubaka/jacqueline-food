import { DisplayColumn } from "@/app/api/core/[model]/config-data";

export interface ResponseData {
  code: number;
  message: string;
  data?: any;
  meta?: {
    verboseName: {
      single: string;
      plural: string;
    };
    displayColumns: DisplayColumn[];
    searchKeys: string[];
    postPath?: string;
  };
}
