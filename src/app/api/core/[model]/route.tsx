import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

type Params = {
  params: {
    model: "user" | "currency" | "product";
  };
};

export async function GET(request: Request, { params }: Params) {
  try {
    const { model } = await params;
    const PrismaModel = prisma[model];
    if (!PrismaModel) {
      return NextResponse.json(
        { code: 404, message: `route non trouvé`, model: model },
        { status: 400 }
      );
    }
    const prismaModel = prisma[model as keyof typeof prisma] as {
      findMany: (args?: any) => Promise<any[]>;
    };

    const data = await prismaModel.findMany({});

    return NextResponse.json({
      code: 200,
      message: "donnees trouvées pour : " + model,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { code: 500, message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
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

    return NextResponse.json({
      code: 201,
      message: `Enregistrement créé avec succès dans ${model}.`,
      data: createdRecord,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          code: 409,
          message: "Un élément avec une valeur unique existe déjà.",
          details: {
            fields: error.meta?.target,
          },
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { code: 400, message: "une erreur s'est produite", error: error.message },
      { status: 500 }
    );
  }
}
