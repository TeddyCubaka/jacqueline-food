import { NextResponse } from "next/server";
import { prisma } from "@/../lib/prisma";
import * as configData from "./config-data";
import { ResponseData } from "@/types/reponse-data.type";
import { formatPrismaError } from "@/utils/format-prisma-error";
import { PrismaFilter, QueriesUtils } from "@/utils/queries-to-prisma-obj";
import path from "path";
import sharp from "sharp";
import { promises as fs } from "fs";

type Params = {
  params: {
    model: "user" | "currency" | "product";
  };
};

export async function GET(
  request: Request,
  { params }: Params
): Promise<NextResponse<ResponseData>> {
  try {
    const { model } = await params;
    const url = new URL(request.url);
    let searchParams: { [k: string]: string } | PrismaFilter =
      Object.fromEntries(url.searchParams.entries());
    const _queriesUtils = new QueriesUtils();
    searchParams = _queriesUtils.toPrismaFilterMap(searchParams);

    const PrismaModel = prisma[model];
    if (!PrismaModel) {
      return NextResponse.json(
        { code: 404, message: `route non trouvé` },
        { status: 404 }
      );
    }
    const verboseName =
      configData[model as keyof typeof configData].verboseName;

    const prismaModel = prisma[model as keyof typeof prisma] as {
      findMany: (args?: any) => Promise<any[]>;
    };

    // return NextResponse.json({
    //   code: 200,
    //   message: "donnees trouvées pour les " + verboseName.plural,
    //   data: searchParams,
    // });
    searchParams.include = {
      ...searchParams.include,
      ...configData[model as keyof typeof configData].include,
    };

    const data = await prismaModel.findMany({
      ...searchParams,
    });

    return NextResponse.json({
      code: 200,
      message: "donnees trouvées pour les " + verboseName.plural,
      data,
      meta: {
        verboseName: verboseName,
        displayColumns:
          configData[model as keyof typeof configData].displayColumns,
        searchKeys: configData[model as keyof typeof configData].searchKeys,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { code: 400, message: "Une erreur s'est produite", error: error.message },
      { status: 400 }
    );
  }
}

interface FileData {
  filename: string;
  mimeType: string;
  content: Buffer;
  keyName: string;
}

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

async function processImage(
  buffer: Buffer,
  mimeType: string,
  filename: string
): Promise<{ path: string; url: string }> {
  try {
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Créer le répertoire s'il n'existe pas
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // Générer un nom de fichier unique
    const uniqueFilename = `${Date.now()}-${filename}`;
    const fileExt = path.extname(filename);
    const baseName = path.basename(filename, fileExt);

    // Créer différentes versions de l'image
    const versions = {
      original: uniqueFilename,
      thumbnail: `${baseName}-thumb${fileExt}`,
      optimized: `${baseName}-opt${fileExt}`,
      webp: `${baseName}.webp`,
    };

    const sharpInstance = sharp(buffer);
    const metadata = await sharpInstance.metadata();

    // Vérifier les dimensions de l'image
    if (
      (metadata.width && metadata.width > 4096) ||
      (metadata.height && metadata.height > 4096)
    ) {
      throw new Error("Image dimensions are too large");
    }

    // Sauvegarder la version originale
    const originalPath = path.join(uploadDir, versions.original);
    await fs.writeFile(originalPath, buffer);

    // // Créer une miniature
    // await sharpInstance
    //   .clone()
    //   .resize(200, 200, {
    //     fit: "cover",
    //     position: "center",
    //   })
    //   .toFile(path.join(uploadDir, versions.thumbnail));

    // // Créer une version optimisée
    // await sharpInstance
    //   .clone()
    //   .resize(1200, 1200, {
    //     fit: "inside",
    //     withoutEnlargement: true,
    //   })
    //   .jpeg({
    //     quality: 80,
    //     progressive: true,
    //   })
    //   .toFile(path.join(uploadDir, versions.optimized));

    // // Créer une version WebP
    // await sharpInstance
    //   .clone()
    //   .webp({
    //     quality: 80,
    //     lossless: false,
    //   })
    //   .toFile(path.join(uploadDir, versions.webp));

    return {
      path: originalPath,
      url: `/uploads/${versions.original}`,
    };
  } catch (error: any) {
    console.log("Erreur lors du traitement de l'image:", error);
    throw new Error(`Image processing failed: ${error.message}`);
  }
}

async function parseFormData(request: Request) {
  const formData = await request.formData();
  const files: FileData[] = [];
  const fields: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      files.push({
        keyName: key,
        filename: value.name,
        mimeType: value.type,
        content: Buffer.from(await value.arrayBuffer()),
      });
    } else {
      fields[key] = value;
    }
  }

  return { files, fields };
}

export async function POST(request: Request, { params }: Params) {
  try {
    let { files, fields } = await parseFormData(request);

    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.includes(file.mimeType)) {
        throw new Error(`Type de fichier non autorisé: ${file.mimeType}`);
      }
      if (file.content.length > MAX_FILE_SIZE) {
        throw new Error("Fichier trop volumineux");
      }
      const processed = await processImage(
        file.content,
        file.mimeType,
        file.filename
      );
      fields[file.keyName] = processed.url;
    }

    const { model } = await params;

    if (!(model in prisma)) {
      return NextResponse.json(
        { code: 404, message: `Le modèle ${model} n'existe pas.` },
        { status: 400 }
      );
    }

    if (!fields || Object.keys(fields).length === 0) {
      return NextResponse.json(
        { code: 400, message: "Le corps de la requête est vide." },
        { status: 400 }
      );
    }
    const configModel = configData[model as keyof typeof configData];
    if (configModel.postSave) fields = await configModel.postSave(fields);
    const prismaModel: any = prisma[model as keyof typeof prisma];
    const createdRecord = await prismaModel.create({
      data: fields,
    });

    return new Response(
      JSON.stringify({
        code: 201,
        message: "Enreigistrement effectué avec succès",
        data: createdRecord,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify(formatPrismaError(error)), {
      status: error.message.includes("non autorisé") ? 400 : 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
