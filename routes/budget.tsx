import { PageProps } from "$fresh/server.ts";
import Budget from "../islands/Budget.tsx";

export default function BudgetDashboard(props: PageProps) {
  return (
    <>
      <Budget />
      <table></table>
    </>
  );
}
