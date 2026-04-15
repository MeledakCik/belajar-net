import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const decodedString = atob(body.p); 
    const originalData = JSON.parse(decodedString);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(originalData),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 400 });
  }
}