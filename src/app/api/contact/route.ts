import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Workshop IA <onboarding@resend.dev>',
      to: ['ginialtech@gmail.com'],
      subject: `Nueva consulta de ${name} (Workshop IA)`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #00B4A6; margin-bottom: 20px;">Nueva consulta del Workshop</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin-top: 20px;">
            <p style="margin-top: 0; font-weight: bold; color: #475569;">Mensaje:</p>
            <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
          </div>
          <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
            <p>© 2026 Ginialtech · Advanced Agentic Coding</p>
          </footer>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
