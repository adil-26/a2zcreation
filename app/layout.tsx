import { Fraunces, Outfit } from "next/font/google"; // Using Fraunces and Outfit
import "./globals.css";
import { cn } from "@/lib/utils"; // Ensure you have this utility or remove/replace
import Script from "next/script";

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
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="antialiased bg-background text-foreground font-sans selection:bg-brand/20 selection:text-brand-dark">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G6LRL7E98X"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G6LRL7E98X');
          `}
        </Script>
        {children}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2374609629677957');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2374609629677957&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  );
}
