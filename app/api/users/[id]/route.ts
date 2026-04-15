import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Gunakan Promise untuk params
) {
  try {
    const { id } = await params; // Wajib di-await di Next.js versi terbaru
    const body = await request.json();

    console.log(`Proxying PUT request for ID: ${id}`);

    const BACKEND_URL = `https://www.belajar-net-backend.web.id/api/users/${id}`;

    const response = await fetch(BACKEND_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    if (!response.ok) {
        console.error("Backend responded with error:", data);
        return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Proxy Error Details:", error);
    return NextResponse.json({ error: "Proxy Update Error", details: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const BACKEND_URL = `https://www.belajar-net-backend.web.id/api/users/${id}`;

    const response = await fetch(BACKEND_URL, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Proxy Delete Error", details: error.message },
      { status: 500 }
    );
  }
}