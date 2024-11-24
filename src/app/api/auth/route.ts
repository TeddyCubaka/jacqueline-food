import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Obtenir le chemin absolu du fichier db.json
const dbPath = path.join(process.cwd(), "src", "db.json");

export async function GET(request: Request) {
  try {
    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf8"));

    return NextResponse.json({
      message: "User added successfully!",
      data: dbData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error saving user", error: error.message },
      { status: 500 }
    );
  }
}
