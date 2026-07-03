import { redirect } from "next/navigation";

export default function LegacySalesPage() {
  redirect("/internal/leads");
}
