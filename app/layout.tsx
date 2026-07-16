import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const imageUrl = `${protocol}://${host}/og.webp`;

  return {
    title: "BT Concierge | Traslados privados en Buenos Aires",
    description: "Reserva tu traslado privado desde Ezeiza, Aeroparque, Buquebus o Colonia Express hasta tu apartamento.",
    openGraph: {
      title: "BT Concierge",
      description: "Tu llegada, resuelta.",
      images: [{ url: imageUrl, width: 1792, height: 928, alt: "BT Concierge, traslados privados en Buenos Aires" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "BT Concierge",
      description: "Tu llegada, resuelta.",
      images: [imageUrl],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
