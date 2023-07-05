import "./globals.css";
import Providers from "@/lib/providers";
import Nav from "@/components/Nav";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "MemoGraph",
  description: "Free your mind!",
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
            <div className="mt-16"> {children}</div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
