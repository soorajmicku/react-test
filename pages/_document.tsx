import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* CDN for No-JS support */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
      
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>Mortgage Calculator</Navbar.Brand>
          </Container>
        </Navbar>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
