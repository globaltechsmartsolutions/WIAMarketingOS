import { redirect } from "next/navigation";

export default function LegacyCampaignsPage() {
  redirect("/internal/campaigns");
}
