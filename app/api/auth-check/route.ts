import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userEmail, isHardwareMatch, localId } = body;

  // Variabel ini aman di server, tidak bocor ke browser
  const REAL_ADMIN = process.env.ADMIN_SECRET_KEY_ADMIN_EMAIL;
  const REAL_DEVICE = process.env.ADMIN_SECRET_KEY_DEVICE_ID;

  // Pengecekan Server-Side
  const isEmailValid = userEmail === REAL_ADMIN;
  const isDeviceValid = localId === REAL_DEVICE;

  if (isEmailValid && isHardwareMatch) {
    return NextResponse.json({ 
      success: true, 
      needsRegistration: !localId,
      key: REAL_DEVICE // Kirim key hanya jika hardware & email valid
    });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}