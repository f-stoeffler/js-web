import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { updateProject } from "@/lib/projects";

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

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsBaseDir =
      process.env.UPLOADS_DIR || path.join(process.cwd(), "uploads");
    const projectDir = path.join(uploadsBaseDir, slug);

    if (!existsSync(projectDir)) {
      await mkdir(projectDir, { recursive: true });
    } else {
      try {
        const files = await readdir(projectDir);
        for (const file of files) {
          if (file.startsWith("main.")) {
            const existingFilePath = path.join(projectDir, file);
            await unlink(existingFilePath);
            console.log(`Removed existing file: ${existingFilePath}`);
          }
        }
      } catch (error) {
        // If readdir fails (e.g., directory doesn't exist), we can continue
        console.log("No existing files to remove or directory not accessible");
      }
    }

    const fileExtension = path.extname(image.name);
    const fileName = `main${fileExtension}`;
    const filePath = path.join(projectDir, fileName);

    await writeFile(filePath, buffer);

    const dbPath = `${slug}/${fileName}`;

    const mainImageVer = new Date();
    const updateResult = await updateProject(slug, {
      mainImage: dbPath,
      mainImageVer: mainImageVer,
    });
    console.log(mainImageVer)

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
