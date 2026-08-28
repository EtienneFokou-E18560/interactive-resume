import { renderToBuffer } from "@react-pdf/renderer";
import { ResumePdfDocument } from "@/lib/resume/ResumePdfDocument";
import { formatResumeDocument } from "@/lib/resume/formatForPdf";
import type { ResumeDocument } from "@/lib/resume/types";

export async function generateResumePdf(data: ResumeDocument): Promise<Buffer> {
  const formatted = formatResumeDocument(data);
  const buffer = await renderToBuffer(<ResumePdfDocument data={formatted} />);
  return Buffer.from(buffer);
}
