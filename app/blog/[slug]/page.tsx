import type { Metadata } from "next"
import BlogPostPage from "./blog-post-page"

export const metadata: Metadata = {
  title: "Blog Articles | Tanvir Newaz",
  description: "Read Tanvir Newaz's expert insights on SEO, digital marketing, and business growth on Medium",
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPostPage slug={params.slug} />
}
