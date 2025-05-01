import type { Metadata } from "next"
import PublicationPoliciesContent from "./publication-policies-content"

export const metadata: Metadata = {
  title: "Publication Policies | Tanvir Newaz",
  description: "Our publication policies and guidelines for content creation, submission, and editorial standards.",
}

export default function PublicationPoliciesPage() {
  return <PublicationPoliciesContent />
}
