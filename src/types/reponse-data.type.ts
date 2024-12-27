import { DisplayColumn, InputType } from "@/app/api/core/[model]/config-data";

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
    form?: InputType[];
  };
  devMeta?: {
    [key: string]: any;
  };
  "dev-meta"?: {
    [key: string]: any;
  };
}
