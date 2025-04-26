"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, Copy, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generateAdCopy, type AdCopyFormData } from "./actions"

// Form schema for validation
const formSchema = z.object({
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  companyUrl: z.string().url({ message: "Please enter a valid URL" }),
  phoneNumber: z.string().min(7, { message: "Please enter a valid phone number" }),
  serviceKeywords: z.string().min(3, { message: "Please enter at least one service keyword" }),
})

export default function AdCopyGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [adCopy, setAdCopy] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyUrl: "",
      phoneNumber: "",
      serviceKeywords: "",
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true)
    setError(null)

    try {
      const result = await generateAdCopy(values as AdCopyFormData)

      if (result.success) {
        setAdCopy(result.adCopy)
      } else {
        setError(result.error || "Failed to generate ad copy. Please try again.")
      }
    } catch (err) {
      console.error("Error generating ad copy:", err)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  // Copy text to clipboard
  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedSection(section)
        setTimeout(() => setCopiedSection(null), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
      })
  }

  // Copy full ad copy to clipboard
  const copyFullAdCopy = () => {
    if (!adCopy) return

    const fullText = `
${adCopy.hook}

${adCopy.pain}

${adCopy.stun}

${adCopy.hammer}

${adCopy.solution}

${adCopy.cta}
    `.trim()

    copyToClipboard(fullText, "full")
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>AI Ad Copy Generator</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your business details to generate compelling ad copy using our proven sales formula
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Acme Marketing"
                          {...field}
                          className="bg-zinc-800 border-zinc-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Website</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., https://www.example.com"
                          {...field}
                          className="bg-zinc-800 border-zinc-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., (123) 456-7890"
                          {...field}
                          className="bg-zinc-800 border-zinc-700 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serviceKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service Keywords</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Facebook Ads, Google Ads, Social Media Marketing (comma separated)"
                          {...field}
                          className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && <div className="text-red-400 text-sm p-3 bg-red-400/10 rounded-md">{error}</div>}

                <Button type="submit" className="w-full bg-white text-black hover:bg-white/90" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Ad Copy"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div>
        {isGenerating ? (
          <Card className="bg-zinc-900 border-zinc-800 h-full flex items-center justify-center">
            <CardContent className="text-center py-10">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-white/70" />
              <p className="text-gray-300">Crafting your perfect ad copy...</p>
              <p className="text-sm text-gray-400 mt-2">This may take a few moments</p>
            </CardContent>
          </Card>
        ) : adCopy ? (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Generated Ad Copy</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                onClick={copyFullAdCopy}
              >
                {copiedSection === "full" ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy All
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-blue-400">HOOK</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => copyToClipboard(adCopy.hook, "hook")}
                  >
                    {copiedSection === "hook" ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-lg font-bold">{adCopy.hook}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-yellow-400">PAIN</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => copyToClipboard(adCopy.pain, "pain")}
                  >
                    {copiedSection === "pain" ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-gray-300">{adCopy.pain}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-purple-400">STUN</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => copyToClipboard(adCopy.stun, "stun")}
                  >
                    {copiedSection === "stun" ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-gray-300">{adCopy.stun}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-red-400">HAMMER</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => copyToClipboard(adCopy.hammer, "hammer")}
                  >
                    {copiedSection === "hammer" ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-gray-300">{adCopy.hammer}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-green-400">SOLUTION</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => copyToClipboard(adCopy.solution, "solution")}
                  >
                    {copiedSection === "solution" ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-gray-300">{adCopy.solution}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-orange-400">CALL TO ACTION</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => copyToClipboard(adCopy.cta, "cta")}
                  >
                    {copiedSection === "cta" ? "Copied!" : "Copy"}
                  </Button>
                </div>
                <p className="text-gray-300">{adCopy.cta}</p>
              </div>

              <div className="pt-4 border-t border-zinc-800">
                <Button className="w-full" onClick={() => form.reset()}>
                  Generate New Ad Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-zinc-900 border-zinc-800 h-full">
            <CardContent className="flex flex-col items-center justify-center h-full py-10">
              <div className="text-center max-w-md mx-auto">
                <h3 className="text-xl font-bold mb-4">AI-Powered Ad Copy</h3>
                <p className="text-gray-400 mb-6">
                  Our AI will generate compelling ad copy using the proven sales formula:
                </p>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start">
                    <span className="bg-blue-400/20 text-blue-400 rounded-full px-2 py-1 text-xs font-bold mr-2">
                      HOOK
                    </span>
                    <span className="text-gray-300">Grab attention with a compelling headline</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-400/20 text-yellow-400 rounded-full px-2 py-1 text-xs font-bold mr-2">
                      PAIN
                    </span>
                    <span className="text-gray-300">Identify the problem your audience faces</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-400/20 text-purple-400 rounded-full px-2 py-1 text-xs font-bold mr-2">
                      STUN
                    </span>
                    <span className="text-gray-300">Provide a shocking statistic or statement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-red-400/20 text-red-400 rounded-full px-2 py-1 text-xs font-bold mr-2">
                      HAMMER
                    </span>
                    <span className="text-gray-300">Emphasize the pain points and consequences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-400/20 text-green-400 rounded-full px-2 py-1 text-xs font-bold mr-2">
                      SOLUTION
                    </span>
                    <span className="text-gray-300">Present your solution to their problems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-orange-400/20 text-orange-400 rounded-full px-2 py-1 text-xs font-bold mr-2">
                      CTA
                    </span>
                    <span className="text-gray-300">Clear call to action that drives conversion</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
