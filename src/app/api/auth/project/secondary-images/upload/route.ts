import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, readdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { updateProject } from "@/lib/projects";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const formImageIDs = formData.get("imageIDs") as string;
    const slug = formData.get("slug") as string;
    const formDbUpdate = formData.get("dbUpdate") as string;
    const mode = formData.get("mode") as string;

    const dbUpdate: Prisma.ProjectUpdateInput = JSON.parse(formDbUpdate);
    const imageIDs: Array<number> = JSON.parse(formImageIDs);

    const uploadsBaseDir =
      process.env.UPLOADS_DIR || path.join(process.cwd(), "uploads");
    const projectDir = path.join(uploadsBaseDir, slug);

    if (!existsSync(projectDir)) {
      await mkdir(projectDir, { recursive: true });
    } else {
      if (mode === "update" || mode === "delete") {
        console.log(`going into delete`);
        imageIDs.forEach(async function (imageID) {
          try {
            const files = await readdir(projectDir);
            for (const file of files) {
              if (file.startsWith(`${imageID}.`)) {
                const existingFilePath = path.join(projectDir, file);
                await unlink(existingFilePath);
                console.log(`Removed existing file: ${existingFilePath}`);
              }
            }
          } catch (error) {
            // If readdir fails (e.g., directory doesn't exist), we can continue
            console.log(
              "No existing files to remove or directory not accessible"
            );
          }
        });
      }
    }

    if (mode === "update" || mode === "create") {
      imageIDs.forEach(async function (imageID) {
        const image = formData.get(String(imageID)) as File;

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        let fileExtension = path.extname(image.name);
        if (fileExtension === ".jpg") {
          fileExtension = ".jpeg";
        }
        const fileName = `${imageID}${fileExtension}`;
        const filePath = path.join(projectDir, fileName);

        await writeFile(filePath, buffer);
      });
    }

    const updateResult = await updateProject(slug, dbUpdate);

    if (!updateResult.success) {
      throw new Error(updateResult.error || "Failed to update project");
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
