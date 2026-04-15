import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const decodedPayload = JSON.parse(atob(body.p));
    const { mode, ...authData } = decodedPayload;

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const endpoint = mode === "login" ? "/login" : "/register";

    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "System Integrity Violation" }, { status: 400 });
  }
}