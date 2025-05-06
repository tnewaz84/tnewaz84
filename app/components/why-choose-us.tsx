import { Search, Shield, Clock } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Experience Matters</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Elevate Your Digital Presence with Strategic Solutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Security Card */}
          <div className="bg-[#0a1a2a] rounded-lg p-8 text-center flex flex-col items-center">
            <div className="bg-[#1e90ff] bg-opacity-20 p-4 rounded-full mb-4">
              <Search className="h-8 w-8 text-[#1e90ff]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Build</h3>
            <p className="text-gray-400 text-sm">
              We create robust digital foundations for your business, developing websites and applications that drive
              growth and engagement.
            </p>
          </div>

          {/* Scalability Card */}
          <div className="bg-[#0a1a2a] rounded-lg p-8 text-center flex flex-col items-center">
            <div className="bg-[#1e90ff] bg-opacity-20 p-4 rounded-full mb-4">
              <Shield className="h-8 w-8 text-[#1e90ff]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Brand</h3>
            <p className="text-gray-400 text-sm">
              Our strategic marketing solutions ensure your brand stands out, connecting with your target audience and
              building lasting relationships.
            </p>
          </div>

          {/* 24/7 Support Card */}
          <div className="bg-[#0a1a2a] rounded-lg p-8 text-center flex flex-col items-center">
            <div className="bg-[#1e90ff] bg-opacity-20 p-4 rounded-full mb-4">
              <Clock className="h-8 w-8 text-[#1e90ff]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Protect</h3>
            <p className="text-gray-400 text-sm">
              Our dedicated security measures safeguard your digital assets, ensuring your online presence remains
              secure and your data protected.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
