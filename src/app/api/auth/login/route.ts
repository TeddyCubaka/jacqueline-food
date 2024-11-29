import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import JWT

const dbPath = path.join(process.cwd(), "src", "db.json");

const SECRET_KEY = "votre_clé_secrète"; // Utilisez une clé secrète sécurisée ou mettez-la dans les variables d'environnement

type LoginBody = {
  login: string;
  password: string;
};

type User = {
  id: number;
  name: string;
  password: string;
  mail: string;
};

const missedField = (field: string) => {
  return NextResponse.json({
    code: 400,
    message: `le champ ${field} est obligatoire`,
  });
};

export async function POST(request: Request) {
  try {
    const dbData = JSON.parse(fs.readFileSync(dbPath, "utf8"));

    const reqBody: LoginBody = await request.json();

    if (!("password" in reqBody)) return missedField("password");
    if (!("login" in reqBody)) return missedField("login");

    const dbUser: User | null = dbData.users.find(
      (user: any) => user.mail === reqBody.login || user.name === reqBody.login
    );

    if (dbUser == null)
      return NextResponse.json({
        code: 404,
        message: "mot de passe, mail ou nom d'utilisateur incorrect",
      });

    const passwordMatch = await bcrypt.compare(
      reqBody.password,
      dbUser.password
    );
    if (!passwordMatch)
      return NextResponse.json({
        code: 404,
        message: "mot de passe, mail ou nom d'utilisateur incorrect",
      });

    // Génération du token
    const token = jwt.sign(
      {
        id: dbUser.id,
        name: dbUser.name,
        mail: dbUser.mail,
      },
      SECRET_KEY,
      { expiresIn: "1h" } // Le token expirera dans 1 heure
    );

    const user = {
      id: dbUser.id,
      name: dbUser.name,
      mail: dbUser.mail,
    };

    return NextResponse.json({
      message: `bienvenue ${dbUser.name}`,
      data: user,
      token, // Retourne le token dans la réponse
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Erreur lors de la connexion", error: error.message },
      { status: 500 }
    );
  }
}
