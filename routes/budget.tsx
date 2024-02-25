import { Handlers, PageProps } from "$fresh/server.ts";
import Budget from "../islands/Budget.tsx";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();

    console.log("post form data", form);
    const headers = new Headers();
    headers.set("location", "/");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function BudgetDashboard(props: PageProps) {
  return (
    <>
      <form method="post">
        <Budget />
      </form>
      <table></table>
    </>
  );
}
