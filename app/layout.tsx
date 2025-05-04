import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: " recruter by AI",
  description: "recruter by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${barlow.className}  antialiased bg-GREY_10`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        
      </body>
    </html>
  );
}
