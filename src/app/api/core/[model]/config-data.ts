import { prisma } from "@/../lib/prisma";

export type DisplayColumn = { key: string; header: string };

export type InputType = {
  label: string;
  proprety: string;
  type?:
    | "text"
    | "number"
    | "select"
    | "date"
    | "file"
    | "float"
    | "boolean"
    | "childrens";
  placeholder: string;
  options?: Array<{ label: string; value: string | number }>;
  endpoint?: string;
  formatData?: (data: any) => Array<{ label: string; value: string | number }>;
  childrens?: InputType[];
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
  postToPath?: string;
  postSave?: (data: { [key: string]: any }) => Promise<{ [key: string]: any }>;
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
    { key: "symbol", header: "symbole" },
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
      label: "symbole",
      proprety: "symbol",
      type: "text",
      placeholder: "ex : fc, $",
    },
    {
      label: "tax de change par rapport au franc",
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
    {
      label: "nom",
      proprety: "name",
      type: "text",
      placeholder: "Ex : john doe",
    },
    {
      label: "adresse mail",
      proprety: "mail",
      type: "text",
      placeholder: "Ex : john.doe@mail.com",
    },
    {
      label: "mot de passe",
      proprety: "password",
      type: "text",
      placeholder: "Ex: user@304djkei#kjdoe",
    },
  ],
  include: {},
};

export const client: ModelFormat = {
  verboseName: {
    single: "client",
    plural: "clients",
  },
  searchKeys: ["fullName", "phone"],
  displayColumns: [
    { key: "fullName", header: "nom complet" },
    { key: "phone", header: "téléphone" },
    { key: "address", header: "adresse" },
    { key: "isWhatsappOpen", header: "whatsapp" },
    { key: "createdAt", header: "ajouté le" },
  ],
  form: [
    {
      label: "nom complet",
      proprety: "fullName",
      type: "text",
      placeholder: "Ex : john doe",
    },
    {
      label: "numero de téléphone",
      proprety: "phone",
      type: "text",
      placeholder: "Ex : +243 995 384 899",
    },
    {
      label: "adresse physique",
      proprety: "address",
      type: "text",
      placeholder: "Ex: kinshasa/mbobo",
    },
    {
      label: "Mon Whatsapp est ouvert",
      proprety: "isWhatsappOpen",
      type: "boolean",
      placeholder: "",
    },
  ],
  include: {},
};

export const order: ModelFormat = {
  verboseName: {
    single: "commande",
    plural: "commandes",
  },
  searchKeys: ["referenceNumber"],
  displayColumns: [
    { key: "referenceNumber", header: "numéro de référence" },
    { key: "client.fullName", header: "client" },
    { key: "total", header: "total" },
    { key: "currency.name", header: "devise" },
    { key: "status", header: "statut" },
    { key: "isClosed", header: "clôturée" },
    { key: "createdAt", header: "ajouté le" },
  ],
  form: [
    {
      label: "total",
      proprety: "total",
      type: "number",
      placeholder: "Ex : 3",
    },
    {
      label: "client",
      proprety: "clientId",
      type: "select",
      placeholder: "",
      endpoint: "/api/core/client",
      formatData: (data) => {
        return data.map((value: { fullName: string; id: string }) => ({
          label: value.fullName,
          value: value.id,
        }));
      },
    },
    {
      label: "devise",
      proprety: "currencyId",
      type: "select",
      endpoint: "/api/core/currency",
      placeholder: "devise",
    },
    {
      label: "lignes de commandes",
      proprety: "lines",
      type: "childrens",
      placeholder: "",
      childrens: [
        {
          label: "produit",
          proprety: "productId",
          type: "select",
          endpoint: "/api/core/product",
          placeholder: "devise",
        },
        {
          label: "quantité",
          proprety: "quantity",
          type: "text",
          placeholder: "devise",
        },
      ],
    },
  ],
  include: {
    client: true,
    currency: true,
    lines: true,
  },
  postSave: async (data) => {
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );
    const todayEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );

    const orderNumber = await prisma.order.count({
      where: {
        createdAt: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
    });

    return {
      ...data,
      status: "pending",
      referenceNumber: `${now
        .getFullYear()
        .toString()
        .slice(2)}${now.getMonth()}${now.getDay()}-${orderNumber + 1}`,
    };
  },
};

export const orderLine: ModelFormat = {
  verboseName: {
    single: "ligne de commandes",
    plural: "lignes de commandes",
  },
  searchKeys: ["fullName", "phone"],
  displayColumns: [
    { key: "order.referenceNumber.", header: "commande" },
    { key: "Product.name", header: "produit" },
    { key: "quantity", header: "quantité" },
  ],
  form: [
    {
      label: "nom complet",
      proprety: "fullName",
      type: "text",
      placeholder: "Ex : john doe",
    },
    {
      label: "numero de téléphone",
      proprety: "phone",
      type: "text",
      placeholder: "Ex : +243 995 384 899",
    },
    {
      label: "adresse physique",
      proprety: "address",
      type: "text",
      placeholder: "Ex: kinshasa/mbobo",
    },
    {
      label: "Mon Whatsapp est ouvert",
      proprety: "isWhatsappOpen",
      type: "boolean",
      placeholder: "",
    },
  ],
  include: {},
};

export const booking: ModelFormat = {
  verboseName: {
    single: "client",
    plural: "clients",
  },
  searchKeys: ["client.fullName", "date", "serviceType", "place"],
  displayColumns: [
    { key: "client.fullName", header: "client" },
    { key: "client.isWhatsappOpen", header: "whastapp ?" },
    { key: "date", header: "date" },
    { key: "serviceType", header: "type de service" },
    { key: "place", header: "lieux" },
  ],
  form: [
    {
      label: "client",
      proprety: "clientId",
      type: "select",
      placeholder: "",
      endpoint: "/api/core/client",
      formatData: (data) => {
        return data.map((value: { fullName: string; id: string }) => ({
          label: value.fullName,
          value: value.id,
        }));
      },
    },
    {
      label: "numero de téléphone",
      proprety: "date",
      type: "date",
      placeholder: "votre date ici",
    },
    {
      label: "type de service",
      proprety: "serviceType",
      type: "select",
      placeholder: "",
      options: [
        { label: "professionnel", value: "professionnel" },
        { label: "privé", value: "privé" },
      ],
    },
    {
      label: "Lieux",
      proprety: "place",
      type: "select",
      placeholder: "",
      options: [
        { label: "restaurant", value: "restaurant" },
        { label: "hotel", value: "hotel" },
        { label: "evenement", value: "evenement" },
        { label: "à la maison", value: "à la maison" },
        { label: "au bureau", value: "au bureau" },
      ],
    },
  ],
  include: {},
};
