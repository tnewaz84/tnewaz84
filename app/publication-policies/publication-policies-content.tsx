export default function PublicationPoliciesContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Publication Policies</h1>

      <div className="prose max-w-none">
        <p>
          At Tanvir Newaz Wiki, we are committed to maintaining the highest standards of accuracy, transparency, and
          fairness in all published content.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Content Standards</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>All articles are reviewed for factual accuracy</li>
          <li>Sources are cited where necessary</li>
          <li>Content is regularly updated</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-3">Authorship</h2>
        <p>
          Articles are authored by experienced professionals and subject matter experts. Guest contributions undergo
          thorough editorial review before publication.
        </p>
      </div>
    </div>
  )
}
