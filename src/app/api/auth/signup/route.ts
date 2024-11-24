import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";

// Obtenir le chemin absolu du fichier db.json
const dbPath = path.join(process.cwd(), "src", "db.json");

export async function POST(request: Request) {
  try {
    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf8"));

    const reqBody = await request.json();

    const saltRounds = 10; // Niveau de sécurité
    const hashedPassword = await bcrypt.hash(reqBody.password, saltRounds);

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
      { message: "Error saving user", error: error.message },
      { status: 500 }
    );
  }
}
