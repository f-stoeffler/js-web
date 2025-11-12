import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { updateProject } from "@/lib/projects";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const slug = formData.get("slug") as string;

    if (!image || !slug) {
      return NextResponse.json(
        { error: "File and slug are required" },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];
    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid image type. Only JPEG, PNG, WebP, and AVIF are allowed.",
        },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const bufferMainImage = await sharp(buffer)
      .jpeg()
      .toBuffer();

    const thumbnailImage = await sharp(buffer)
      .resize({
        width: 600, // Max width for modern displays
        withoutEnlargement: true, // Don't enlarge small images
      })
      .jpeg({ 
        quality: 80, // Good balance of quality and size
      })
      .toBuffer();

    const uploadsBaseDir =
      process.env.UPLOADS_DIR || path.join(process.cwd(), "uploads");
    const projectDir = path.join(uploadsBaseDir, slug);

    const fileName = `main.jpeg`;
    const filePath = path.join(projectDir, fileName);
    const thumbnailPath = path.join(projectDir, `thumbnail.jpeg`);

    await writeFile(filePath, bufferMainImage);
    await writeFile(thumbnailPath, thumbnailImage);

    const dbPath = `${slug}/${fileName}`;

    const mainImageVer = new Date();
    const updateResult = await updateProject(slug, {
      mainImage: dbPath,
      mainImageVer: mainImageVer,
    });

    if (!updateResult.success) {
      throw new Error(updateResult.error || "Failed to update project");
    }

    return NextResponse.json({
      success: true,
      mainImage: dbPath,
      mainImageVer: mainImageVer,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
