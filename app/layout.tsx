import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

const montserrat = Montserrat({
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "Romy - Frontend Developer & Creative Designer",
    description: "Portfolio website showcasing creative projects and development skills with a futuristic gaming aesthetic",
    keywords: ["portfolio", "frontend developer", "creative designer", "web development"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${poppins.variable} ${montserrat.variable} font-sans antialiased`}
                suppressHydrationWarning
            >
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
