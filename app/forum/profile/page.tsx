import ProfileForm from "./profile-form"
import ForumNav from "../components/forum-nav"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile | Forum",
  description: "Manage your profile settings",
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ForumNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-white">Your Profile</h1>
        <ProfileForm />
      </div>
    </div>
  )
}

