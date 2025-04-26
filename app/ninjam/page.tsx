import type { Metadata } from "next"
import NinjamClientPage from "./ninjam-client-page"

export const metadata: Metadata = {
  title: "Ninjam Music Collaboration | Tanvir Newaz",
  description: "Play music in sync with others using our Ninjam server for real-time music collaboration",
}

export default function NinjamPage() {
  return <NinjamClientPage />
}

