import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { mode, ...authData } = body;

    const BACKEND_URL = "https://www.belajar-net-backend.web.id";
    const endpoint = mode === "login" ? "/login" : "/register";

    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: authData.full_name,
        email: authData.email,
        username: authData.username,
        password: authData.password,
      }),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}