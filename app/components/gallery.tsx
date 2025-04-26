"use client"

import { useScroll } from "./scroll-provider"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { ScrollAnimation } from "./scroll-animation"

export default function Gallery() {
  const { scrollY } = useScroll()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // YouTube videos data
  const videoServices = [
    {
      videoId: "htmTr3D9TK8",
      title: "Creating an Effective SEO Game Plan",
      description: "Learn tips and strategies to outmaneuver the competition with a winning SEO strategy.",
    },
    {
      videoId: "B7ljnFI2TAE",
      title: "K&D Spring Ads Campaign",
      description: "Case study of a successful digital advertising campaign for seasonal promotions.",
    },
    {
      videoId: "zTJargqG24U",
      title: "Digital Marketing Insights",
      description: "Expert insights on leveraging digital marketing to grow your business.",
    },
  ]

  return (
    <section className="relative py-20" id="videos">
      <div ref={ref} className="container mx-auto px-4">
        {/* YouTube Videos Section */}
        <ScrollAnimation animation="fadeUp" delay={0.2}>
          <h3 className="mb-8 text-center text-2xl font-bold tracking-tighter">Expert Video Insights</h3>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {videoServices.map((video, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-zinc-900">
                <div className="aspect-video relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-300">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

