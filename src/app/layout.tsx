import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/admin/auth-provider";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexis — Structural Engineering, Earthquake Engineering and Computational Tools",
  description:
    "Civil engineer focused on matrix structural analysis, finite element modeling, nonlinear structural analysis, structural dynamics, seismic design of concrete and steel structures, performance-based earthquake engineering, and seismic risk assessment.",
  keywords: [
    "structural engineering",
    "earthquake engineering",
    "structural dynamics",
    "nonlinear analysis",
    "performance-based design",
    "seismic risk",
    "finite element method",
    "OpenSees",
    "MATLAB",
    "Python",
    "ETABS",
    "computational tools",
  ],
  authors: [{ name: "Alexis" }],
  openGraph: {
    title: "Alexis — Structural Engineering & Computational Tools",
    description:
      "Academic portfolio: structural analysis, nonlinear modeling, structural dynamics, earthquake engineering, performance-based design, seismic risk and computational tools.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexis — Structural Engineering & Computational Tools",
    description:
      "Academic portfolio of a civil engineer focused on structural dynamics, earthquake engineering and computational tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased font-sans bg-background text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Toaster />
            <SonnerToaster position="bottom-right" richColors closeButton />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
