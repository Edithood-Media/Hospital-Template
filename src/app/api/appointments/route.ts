import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = appointmentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please check the appointment details and try again." },
        { status: 400 },
      );
    }

    const data = result.data;

    await prisma.appointment.create({
      data: {
        patientName: data.patientName,
        phone: data.phone,
        email: data.email || null,
        department: data.department,
        preferredDate: new Date(data.preferredDate),
        preferredTime: data.preferredTime || null,
        message: data.message || null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Appointment submission failed", error);
    return NextResponse.json(
      { error: "Unable to submit appointment right now." },
      { status: 500 },
    );
  }
}
