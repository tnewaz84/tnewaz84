// Base URL for the website - change this to your production URL
export const BASE_URL = process.env.NEXT_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://tanvirnewaz.com"

// Vercel Blob Storage base URL - automatically set by Vercel
export const BLOB_STORE_URL = process.env.BLOB_READ_WRITE_TOKEN ? "https://blob.vercel-storage.com" : null
