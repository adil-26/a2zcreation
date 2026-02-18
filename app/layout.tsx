import { Fraunces, Outfit } from "next/font/google"; // Using Fraunces and Outfit
import "./globals.css";
import { cn } from "@/lib/utils"; // Ensure you have this utility or remove/replace

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: {
    default: "A2Z Interiors | Full Home Design",
    template: "%s | A2Z Interiors"
  },
  description: "Bring home beautiful interiors that fit your budget. Free consultation, transparent pricing, and on-time delivery.",
  keywords: ["Interior Design", "Home Decor", "Modular Kitchen", "Office Interiors", "Delhi", "Noida", "Gurgaon"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="antialiased bg-background text-foreground font-sans selection:bg-brand/20 selection:text-brand-dark">
        {children}
      </body>
    </html>
  );
}
