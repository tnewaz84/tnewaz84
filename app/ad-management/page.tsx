import type { Metadata } from "next"
import AdManagementClientPage from "./AdManagementClientPage"

export const metadata: Metadata = {
  title: "Ad Campaign Management | Tanvir Newaz",
  description:
    "Professional ad campaign management with guaranteed ROI. We charge just 25% of your ad spend for expert campaign setup and management.",
}

export default function AdManagementPage() {
  return <AdManagementClientPage />
}
