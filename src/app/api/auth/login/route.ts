import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const dbPath = path.join(process.cwd(), "src", "db.json");

type LoginBody = {
  login: String;
  password: string;
};

type User = {
  id: Number;
  name: string;
  password: string;
  mail: string;
};

const missedField = (field: string) => {
  return NextResponse.json({
    code: 400,
    message: `le champs ${field} est obligatoire`,
  });
};

export async function POST(request: Request) {
  try {
    let dbData = JSON.parse(fs.readFileSync(dbPath, "utf8"));

    const reqBody: LoginBody = await request.json();

    if ("password" in reqBody == false) return missedField("password");
    if ("login" in reqBody == false) return missedField("login");

    let dbUser: User | null = dbData.users.find(
      (user: any) => user.mail == reqBody.login || user.name == reqBody.login
    );

    if (dbUser == null)
      return NextResponse.json({
        code: 404,
        message: "mot de passe, mail ou nom d'utilisateur incorrect",
      });
    const hashedPassword = await bcrypt.compare(
      reqBody.password,
      dbUser.password
    );
    if (!hashedPassword)
      return NextResponse.json({
        code: 404,
        message: "mot de passe, mail ou nom d'utilisateur incorrect",
      });

    const user = {
      id: dbUser.id,
      name: dbUser.name,
      mail: dbUser.mail,
    };

    return NextResponse.json({
      message: `bienvenue ${dbUser.name}`,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error saving user", error: error.message },
      { status: 500 }
    );
  }
}
