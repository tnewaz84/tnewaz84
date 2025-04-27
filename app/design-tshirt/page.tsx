import type { Metadata } from "next"
import TShirtDesigner from "./tshirt-designer"
import { JsonLd } from "./schema"

export const metadata: Metadata = {
  title: "Design Your Own T-Shirt | Tanvir Newaz",
  description:
    "Create your custom t-shirt design with our easy-to-use online designer. Upload your own images and see instant previews of your personalized apparel.",
  verification: {
    google: "Fo3ZBazHn97bIm2HUzlSwOfw7HLl5rDShjkdBPEOYnk",
  },
  openGraph: {
    title: "Design Your Own T-Shirt | Tanvir Newaz",
    description:
      "Create your custom t-shirt design with our easy-to-use online designer. Upload your own images and see instant previews of your personalized apparel.",
    type: "website",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tshirt-designer-social-Rl9Ik8KykAeFIutJcUZ0YckmCnxBiA.png",
        width: 1200,
        height: 630,
        alt: "T-Shirt Designer Tool by Tanvir Newaz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Your Own T-Shirt | Tanvir Newaz",
    description:
      "Create your custom t-shirt design with our easy-to-use online designer. Upload your own images and see instant previews of your personalized apparel.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tshirt-designer-social-Rl9Ik8KykAeFIutJcUZ0YckmCnxBiA.png",
    ],
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
