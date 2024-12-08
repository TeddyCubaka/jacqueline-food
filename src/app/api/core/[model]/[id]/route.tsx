import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";

type Params = {
  params: {
    model: "user";
    id: string;
  };
};

export async function GET(request: Request, { params }: Params) {
  const { id, model } = await params;

  try {
    if (!(model in prisma)) {
      return NextResponse.json(
        { code: 404, message: `route non trouvé` },
        { status: 400 }
      );
    }
    const user = await prisma[model].findUnique({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json(
        { code: 404, message: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({ params });
  } catch (error: any) {
    return NextResponse.json(
      { code: 500, message: "Erreur interne du serveur", error: error.message },
      { status: 500 }
    );
  }
}
