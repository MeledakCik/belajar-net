// app/api/auth-check/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userEmail, isHardwareMatch, localId } = body;

    // Server bisa baca ini, Browser GAK BISA
    const REAL_ADMIN = process.env.ADMIN_SECRET_KEY_ADMIN_EMAIL;
    const REAL_DEVICE = process.env.ADMIN_SECRET_KEY_DEVICE_ID;
    console.log("LOGIN ATTEMPT:", { 
        sentEmail: userEmail, 
        expectedEmail: REAL_ADMIN,
        hardware: isHardwareMatch,
        match: userEmail === REAL_ADMIN 
    });

    if (userEmail === REAL_ADMIN && isHardwareMatch) {
      // Jika butuh registrasi (UUID belum ada di LocalStorage)
      if (!localId) {
        return NextResponse.json({ success: true, register: true, key: REAL_DEVICE });
      }
      
      // Jika UUID ada, cek apakah cocok
      if (localId === REAL_DEVICE) {
        return NextResponse.json({ success: true, register: false });
      }
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}