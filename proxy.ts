import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  const { hardwareMatch, userEmail } = body;

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL; // Ambil dari server env
  const SECRET_KEY = process.env.ADMIN_SECRET_KEY;
  if (userEmail === ADMIN_EMAIL && hardwareMatch === true) {
    (await cookies()).set("cikawan_token", SECRET_KEY || "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}