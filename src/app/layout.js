import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BadviceAI | Funny AI That Gives Bad Advice",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
  description:
    "Badvice AI is a fun, humorous AI that gives bad advice for any problem you throw at it.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta property="og:title" content="BadviceAI | Funny AI That Gives Bad Advice" />
        <meta property="og:description" content="Badvice AI is a fun, humorous AI that gives bad advice for any problem you throw at it." />
        <meta property="og:image" content="/badvice-ai-og.png" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="096256ca-810e-4c92-8142-f2d16ce8de7d"
        ></script>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`min-h-screen antialiased`}>{children}</body>
    </html>
  );
}
