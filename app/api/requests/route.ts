import { NextResponse } from "next/server";

type BookingRequest = {
  origin: string;
  arrival: string;
  travel: string;
  carrier: string;
  passengers: number;
  bags: number;
  whatsapp: string;
  apartment: string;
  keyDelivery: boolean;
  total: number;
};

const textFields: Array<keyof Pick<BookingRequest, "origin" | "arrival" | "travel" | "carrier" | "whatsapp" | "apartment">> = [
  "origin",
  "arrival",
  "travel",
  "carrier",
  "whatsapp",
  "apartment",
];

function isBookingRequest(value: unknown): value is BookingRequest {
  if (!value || typeof value !== "object") return false;
  const booking = value as Record<string, unknown>;
  return (
    textFields.every((field) => typeof booking[field] === "string" && booking[field].length <= 300) &&
    Number.isInteger(booking.passengers) && Number(booking.passengers) >= 1 && Number(booking.passengers) <= 30 &&
    Number.isInteger(booking.bags) && Number(booking.bags) >= 0 && Number(booking.bags) <= 50 &&
    typeof booking.keyDelivery === "boolean" &&
    typeof booking.total === "number" && booking.total >= 0 && booking.total <= 1000
  );
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const webhookSecret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!webhookUrl || !webhookSecret) return NextResponse.json({ ok: false }, { status: 503 });

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!isBookingRequest(payload)) return NextResponse.json({ ok: false }, { status: 400 });

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, status: "Nueva", secret: webhookSecret }),
      cache: "no-store",
    });
    const result = await response.json() as { ok?: boolean };
    if (!response.ok || !result.ok) throw new Error("Sheets update failed");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}

