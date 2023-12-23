import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { Nanum_Gothic } from "next/font/google";

export const NanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css"
        />
      </head>
      <body className={NanumGothic.className}>{children}</body>
    </html>
  );
}
