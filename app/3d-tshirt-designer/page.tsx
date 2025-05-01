import TShirtDesigner3D from "./tshirt-designer-3d"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "3D T-Shirt Designer | Tanvir Newaz",
  description:
    "Create custom t-shirts with our interactive 3D designer. Upload images, add text, and see your creation from all angles in real-time.",
}

export default function Page() {
  return <TShirtDesigner3D />
}
