import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";
import * as config from "./config-data";
import { ResponseData } from "@/types/reponse-data.type";
import { formatPrismaError } from "@/utils/format-prisma-error";

type Params = {
  params: {
    model: "user" | "currency" | "product";
  };
};

export async function GET(
  request: Request,
  { params }: Params
): Promise<NextResponse<ResponseData>> {
  try {
    const { model } = await params;
    const PrismaModel = prisma[model];
    if (!PrismaModel) {
      return NextResponse.json(
        { code: 404, message: `route non trouvé` },
        { status: 404 }
      );
    }
    const verboseName = config[model as keyof typeof config].verboseName;

    const prismaModel = prisma[model as keyof typeof prisma] as {
      findMany: (args?: any) => Promise<any[]>;
    };

    const data = await prismaModel.findMany({});

    return NextResponse.json({
      code: 200,
      message: "donnees trouvées pour les " + verboseName.plural,
      data,
      meta: {
        verboseName: verboseName,
        displayColumns: config[model as keyof typeof config].displayColumns,
        searchKeys: config[model as keyof typeof config].searchKeys,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { code: 400, message: "Une erreur s'est produite", error: error.message },
      { status: 400 }
    );
  }
}

export async function POST(request: Request, { params }: Params) {
  try {
    const { model } = await params;

    if (!(model in prisma)) {
      return NextResponse.json(
        { code: 404, message: `Le modèle ${model} n'existe pas.` },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { code: 400, message: "Le corps de la requête est vide." },
        { status: 400 }
      );
    }

    const prismaModel: any = prisma[model as keyof typeof prisma];
    const createdRecord = await prismaModel.create({
      data: body,
    });

    return NextResponse.json(
      {
        code: 201,
        message: `Enregistrement créé avec succès dans ${model}.`,
        data: createdRecord,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(formatPrismaError(error), { status: 500 });
  }
}
