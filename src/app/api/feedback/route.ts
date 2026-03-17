import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT_EMAIL = "impre@ginialtech.com"; // TODO: Cambiar por la dirección real si difiere

interface FeedbackData {
  rating: number;
  valuable: string;
  improvements: string;
  recommend: string;
  pendingTopics: string;
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "RESEND_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const data: FeedbackData = await req.json();

    // Basic validation
    if (!data.rating) {
      return NextResponse.json(
        { error: "Rating is required" },
        { status: 400 }
      );
    }

    const { rating, valuable, improvements, recommend, pendingTopics } = data;

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
