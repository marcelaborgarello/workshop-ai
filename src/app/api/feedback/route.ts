import { Resend } from "resend";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";

const FeedbackSchema = z.object({
  rating: z.number().min(1, "La valoración mínima es 1").max(5, "La valoración máxima es 5"),
  valuable: z.string().max(2000), // Previene payloads masivos
  improvements: z.string().max(2000),
  recommend: z.string().max(2000),
  pendingTopics: z.string().max(2000).optional(),
});

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT_EMAIL = "ginialtech@gmail.com"; 

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
    // Limite estricto: 5 feedbacks por minuto por IP
    const rateLimitResult = rateLimit(ip, 5, 60000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Demasiados envíos de feedback seguidos. Reintentá en un minuto." },
        { status: 429 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Servidor mal configurado, falta RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const unvalidatedBody = await req.json().catch(() => ({}));
    const parseResult = FeedbackSchema.safeParse(unvalidatedBody);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Datos de feedback inválidos", details: parseResult.error.format() },
        { status: 400 }
      );
    }

    const { rating, valuable, improvements, recommend, pendingTopics } = parseResult.data;

    const { data: emailData, error } = await resend.emails.send({
      from: "Workshop Ginialtech <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject: `Nuevo Feedback: ${rating} Estrellas - Workshop IA`,
      html: `
        <h1>Nuevo feedback recibido</h1>
        <p><strong>Valoración:</strong> ${rating} / 5</p>
        <p><strong>Lo más valioso:</strong><br/>${valuable || "N/A"}</p>
        <p><strong>Mejoras sugeridas:</strong><br/>${improvements || "N/A"}</p>
        <p><strong>Recomendaría:</strong><br/>${recommend || "N/A"}</p>
        <p><strong>Temas pendientes:</strong><br/>${pendingTopics || "N/A"}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: emailData?.id });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
