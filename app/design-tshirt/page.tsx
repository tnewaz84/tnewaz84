import type { Metadata } from "next"
import TShirtDesigner from "./tshirt-designer"
import { JsonLd } from "./schema"

export const metadata: Metadata = {
  title: "Design Your Own T-Shirt | Tanvir Newaz",
  description: "Upload your own image and create a custom t-shirt design",
  verification: {
    google: "Fo3ZBazHn97bIm2HUzlSwOfw7HLl5rDShjkdBPEOYnk",
  },
}

export default function DesignTShirtPage() {
  return (
    <>
      <JsonLd />
      <TShirtDesigner />
    </>
  )
}

