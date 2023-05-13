import "./globals.css";
import Providers from "@/lib/providers";
import Nav from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Notes",
  description: "Free your mind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="">
          <Providers>
            <Nav />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
