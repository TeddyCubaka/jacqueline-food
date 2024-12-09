import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";
import * as config from "../config-data";
import { ResponseData } from "@/types/reponse-data.type";

type Params = {
  params: {
    model: "user" | "currency" | "product";
  };
};

const customPath = { user: "/api/auth/signup" };

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
    const configData = config[model as keyof typeof config];

    const data = configData.form;

    return NextResponse.json({
      code: 200,
      message: "donnees trouvées pour les " + configData.verboseName,
      data,
      meta: {
        verboseName: configData.verboseName,
        displayColumns: configData.displayColumns,
        searchKeys: configData.searchKeys,
        postPath:
          model in customPath
            ? customPath[model as keyof typeof customPath]
            : `core/${model}`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { code: 400, message: "Une erreur s'est produite", error: error.message },
      { status: 400 }
    );
  }
}
