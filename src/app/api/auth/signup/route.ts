import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

const dbPath = path.join(process.cwd(), "src", "db.json");

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
    let dbData = JSON.parse(fs.readFileSync(dbPath, "utf8"));

    const reqBody: SignupBodyType = await request.json();

    if ("name" in reqBody == false) return missedField("name");
    if ("password" in reqBody == false) return missedField("password");
    if ("mail" in reqBody == false) return missedField("mail");

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      reqBody.password || "",
      saltRounds
    );

    if ("users" in dbData == false) dbData.users = [];

    const existedUser = dbData.users.filter(
      (user: any) => user.mail == reqBody.mail || user.name == reqBody.name
    );

    if (existedUser.length > 0)
      return NextResponse.json(
        {
          code: 409,
          message: "cet utilisateur existe deja dans le systeme",
        },
        { status: 409 }
      );

    const newUser = {
      id: dbData.users.length + 1,
      ...{ ...reqBody, password: hashedPassword },
    };
    dbData.users.push(newUser);

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), "utf8");

    return NextResponse.json({
      message: "User added successfully!",
      data: newUser,
    });
  } catch (error: any) {
    return NextResponse.json(
      { code: 400, message: "Error saving user", error: error.message },
      { status: 500 }
    );
  }
}
