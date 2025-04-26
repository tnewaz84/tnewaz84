import type { Metadata } from "next"
import PrivacyPolicyContent from "./privacy-policy-content"

export const metadata: Metadata = {
  title: "Privacy Policy | Tanvir Newaz",
  description: "Our privacy policy outlines how we collect, use, and protect your personal information",
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}

