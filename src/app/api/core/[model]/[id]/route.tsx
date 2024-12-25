import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";
import * as config from "../config-data";
import { PrismaFilter, QueriesUtils } from "@/utils/queries-to-prisma-obj";

type Params = {
  params: {
    model: string;
    id: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  try {
    const { id, model } = await params;
    const PrismaModel = prisma[model as keyof typeof prisma];
    if (!PrismaModel) {
      return NextResponse.json(
        { code: 404, message: `route non trouvé` },
        { status: 404 }
      );
    }
    const verboseName = config[model as keyof typeof config].verboseName;

    const prismaModel = prisma[model as keyof typeof prisma] as unknown as {
      findUnique: (args?: {
        where: { id: string };
        include: any;
      }) => Promise<any>;
    };

    const url = new URL(request.url);
    let searchParams: { [k: string]: string } | PrismaFilter =
      Object.fromEntries(url.searchParams.entries());
    const _queriesUtils = new QueriesUtils();
    searchParams = _queriesUtils.toPrismaFilterMap(searchParams);

    const data = await prismaModel.findUnique({
      ...searchParams,
      where: { id: id, ...searchParams.where },
      include: {
        ...config[model as keyof typeof config].include,
        ...searchParams.include,
      },
    });

    return NextResponse.json({
      code: 200,
      message: "donnees trouvées pour les " + verboseName.plural,
      data,
      meta: {
        verboseName: verboseName,
        displayColumns: config[model as keyof typeof config].displayColumns,
        searchKeys: config[model as keyof typeof config].searchKeys,
        form: config[model as keyof typeof config].form,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { code: 500, message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id, model } = params;
    const PrismaModel = prisma[model as keyof typeof prisma];
    if (!PrismaModel) {
      return NextResponse.json(
        { code: 404, message: `Route non trouvée` },
        { status: 404 }
      );
    }

    const body = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { code: 400, message: "Données de mise à jour invalides" },
        { status: 400 }
      );
    }

    const prismaModel = prisma[model as keyof typeof prisma] as unknown as {
      update: (args: { where: { id: string }; data: any }) => Promise<any>;
    };

    const updatedData = await prismaModel.update({
      where: { id: id },
      data: body,
    });

    const verboseName = config[model as keyof typeof config].verboseName;

    return NextResponse.json({
      code: 200,
      message: `Mise à jour réussie pour le ${verboseName.single}`,
      data: updatedData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { code: 500, message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id, model } = await params;
    const PrismaModel = prisma[model as keyof typeof prisma];
    if (!PrismaModel) {
      return NextResponse.json(
        { code: 404, message: `route non trouvé` },
        { status: 404 }
      );
    }
    const verboseName = config[model as keyof typeof config].verboseName;

    const prismaModel = prisma[model as keyof typeof prisma] as unknown as {
      delete: (args?: { where: { id: string }; include: any }) => Promise<any>;
    };

    const data = await prismaModel.delete({
      where: { id: id },
      include: config[model as keyof typeof config].include || {},
    });

    return NextResponse.json({
      code: 200,
      message: `Suppression réussie pour le ${verboseName.single}`,
      data,
    });
  } catch (error: any) {
    return NextResponse.json(
      { code: 500, message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
    );
  }
}
