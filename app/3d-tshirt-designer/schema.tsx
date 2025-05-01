export function JsonLd() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "3D T-Shirt Designer",
    description:
      "Create and customize your own t-shirt design with our interactive 3D design tool. Upload images, add text, and see your creation from all angles in real-time.",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "3D t-shirt preview",
      "Image upload",
      "Text customization",
      "T-shirt color customization",
      "Design positioning",
      "Design scaling",
      "Design rotation",
      "Auto-rotate view",
      "Design download",
    ],
    screenshot: "/3d-tshirt-designer-preview.png",
    softwareVersion: "1.0",
    author: {
      "@type": "Person",
      name: "Tanvir Newaz",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
