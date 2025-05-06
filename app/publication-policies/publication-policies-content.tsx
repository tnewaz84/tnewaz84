import Link from "next/link"

export default function PublicationPoliciesContent() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Publication Policies</h1>
      <p className="text-sm text-gray-500 mb-8">Effective Date: April 28, 2025</p>

      <div className="prose max-w-none">
        <p className="mb-6">
          At Tanvir Newaz Wiki, we are committed to maintaining the highest standards of accuracy, transparency, and
          fairness in all published content. Our publication policies are designed to ensure that every piece of
          information aligns with our core values of integrity, expertise, and user empowerment.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Content Standards</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>All articles, resources, and guides are reviewed for factual accuracy, clarity, and relevance.</li>
          <li>Sources are cited where necessary, and we prioritize credible, verifiable information.</li>
          <li>
            Content is regularly updated to reflect the latest industry developments, especially in areas such as SEO,
            web development, blockchain technologies, and digital marketing.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Authorship and Attribution</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Articles and guides are authored by experienced professionals and subject matter experts.</li>
          <li>
            Guest contributions are allowed, but every submission undergoes a thorough editorial review before
            publication.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Transparency</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Sponsored content, affiliate links, or partnerships are clearly disclosed within the content.</li>
          <li>Opinions expressed in articles reflect the views of the author and are labeled accordingly.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Corrections and Updates</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>If inaccuracies are identified, corrections will be made promptly.</li>
          <li>Major updates will be timestamped and noted at the top or bottom of the relevant page.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. User-Generated Content</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Comments, feedback, and community contributions must adhere to our community guidelines.</li>
          <li>Spam, abusive language, or misinformation will be removed without notice.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Ethical Responsibility</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>We do not publish content that promotes hate, discrimination, violence, or unethical practices.</li>
          <li>We strive to support a diverse, inclusive, and respectful digital environment.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Content Removal Requests</h2>
        <p className="mb-6">
          If you believe any content infringes on your rights or is otherwise inappropriate, please contact us at{" "}
          <Link href="mailto:tnewaz84@gmail.com" className="text-blue-600 hover:underline">
            tnewaz84@gmail.com
          </Link>
          . We will review and respond to all requests promptly.
        </p>
      </div>
    </main>
  )
}
