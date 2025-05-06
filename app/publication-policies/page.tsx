import type { Metadata } from "next"
import PublicationPoliciesContent from "./publication-policies-content"

export const metadata: Metadata = {
  title: "Publication Policies | Tanvir Newaz",
  description: "Our publication policies ensure accuracy, transparency, and fairness in all content.",
}

export default function PublicationPoliciesPage() {
  return <PublicationPoliciesContent />
}
