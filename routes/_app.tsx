import { type PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import Navbar from "../islands/Navbar.tsx";

export default function App({ Component, url }: PageProps) {
  console.log("_app: url", url.pathname);
  return (
    <html class="text-gray-900 bg-gray-100">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>budgetfrontend</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body f-client-nav>
        <Navbar url={url} />

        <Partial name="body">
          <div class="container">
            <Component />
          </div>
        </Partial>
      </body>
    </html>
  );
}
