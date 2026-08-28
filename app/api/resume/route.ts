import { NextResponse } from "next/server";
import { defaultResumeVariantId, isValidResumeVariantId } from "@/data/resumeVariants";
import {
  composeResume,
  resumeDownloadFilename,
} from "@/lib/resume/composeResume";
import { generateResumePdf } from "@/lib/resume/generatePdf";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role") ?? defaultResumeVariantId;

  if (!isValidResumeVariantId(role)) {
    return NextResponse.json(
      { error: "Invalid role. Use a supported resume variant id." },
      { status: 400 }
    );
  }

  const document = composeResume(role);
  if (!document) {
    return NextResponse.json({ error: "Resume variant not found." }, { status: 404 });
  }

  try {
    const pdf = await generateResumePdf(document);
    const filename = resumeDownloadFilename(role);

    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Resume PDF generation failed:", error);
    return NextResponse.json(
      { error: "Failed to generate resume PDF." },
      { status: 500 }
    );
  }
}
