import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/../lib/prisma";

type SignupBodyType = {
  name?: string;
  password?: string;
  mail?: string;
};

const missedField = (field: string) => {
  return NextResponse.json({
    code: 400,
    message: `le champs ${field} est obligatoire`,
  });
};

export async function POST(request: Request) {
  try {
    const reqBody: SignupBodyType = await request.json();

    if (!reqBody.name) return missedField("name");
    if (!reqBody.password) return missedField("password");
    if (!reqBody.mail) return missedField("mail");

    const existedUser = await prisma.user.findFirst({
      where: {
        OR: [{ mail: reqBody.mail }, { name: reqBody.name }],
      },
    });

    if (existedUser) {
      return NextResponse.json(
        {
          code: 409,
          message: "Cet utilisateur existe déjà dans le système",
        },
        { status: 409 }
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(reqBody.password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        name: reqBody.name,
        password: hashedPassword,
        mail: reqBody.mail,
      },
    });

    return NextResponse.json(
      {
        code: 201,
        message: "Utilisateur créé avec succès !",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { code: 400, message: "Error saving user", error: error.message },
      { status: 500 }
    );
  }
}
