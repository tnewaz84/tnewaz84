import type { Metadata } from "next"
import RefundPolicyContent from "./refund-policy-content"

export const metadata: Metadata = {
  title: "Refund Policy | Tanvir Newaz",
  description: "Our refund policy outlines the terms and conditions for refunds on our services",
}

export default function RefundPolicyPage() {
  return <RefundPolicyContent />
}
