export function JsonLd() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "T-Shirt Designer Tool",
    description:
      "Create and customize your own t-shirt design with our interactive design tool. Upload images, adjust colors, and download your custom design.",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Image upload",
      "T-shirt color customization",
      "Design positioning",
      "Design scaling",
      "Design rotation",
      "Design download",
    ],
    screenshot: "/t-shirt-mockup-white.png",
    softwareVersion: "1.0",
    author: {
      "@type": "Person",
      name: "Tanvir Newaz",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
}
