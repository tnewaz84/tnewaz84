import type { Metadata } from "next"
import BlogPage from "./blog-page"

export const metadata: Metadata = {
  title: "Digital Marketing Blog | Tanvir Newaz",
  description:
    "Read Tanvir Newaz's expert insights on SEO, digital marketing, and business growth strategies on Medium",
}

export default function Page() {
  return <BlogPage />
}
