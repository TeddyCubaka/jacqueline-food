import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/../lib/prisma";

const SECRET_KEY =
  process.env.JWT_SECRET_KEY ||
  "jhfyfufyguyfyufutt ff yu yuyuyfguygyugiuhgoiuoinijho";

type LoginBody = {
  login: string;
  password: string;
};

const missedField = (field: string) => {
  return NextResponse.json({
    code: 400,
    message: `Le champ ${field} est obligatoire`,
  });
};

export async function POST(request: Request) {
  try {
    const reqBody: LoginBody = await request.json();

    if (!reqBody.password) return missedField("password");
    if (!reqBody.login) return missedField("login");

    const dbUser = await prisma.user.findFirst({
      where: {
        OR: [{ mail: reqBody.login }, { name: reqBody.login }],
      },
    });

    if (!dbUser) {
      return NextResponse.json({
        code: 404,
        message: "Mot de passe, mail ou nom d'utilisateur incorrect",
      });
    }
    const passwordMatch = await bcrypt.compare(
      reqBody.password,
      dbUser.password
    );
    if (!passwordMatch) {
      return NextResponse.json({
        code: 404,
        message: "Mot de passe, mail ou nom d'utilisateur incorrect",
      });
    }
    const token = jwt.sign(
      {
        id: dbUser.id,
        name: dbUser.name,
        mail: dbUser.mail,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    const user = {
      id: dbUser.id,
      name: dbUser.name,
      mail: dbUser.mail,
    };

    return NextResponse.json({
      message: `Bienvenue ${dbUser.name}`,
      data: user,
      token,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erreur lors de la connexion", error: error.message },
      { status: 500 }
    );
  }
}
