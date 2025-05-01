// This is a script you can run locally to verify your deployment
// Run with: node scripts/verify-deployment.js YOUR_SITE_URL

const https = require("https")

const siteUrl = process.argv[2] || "https://your-site.vercel.app"

console.log(`Verifying deployment for: ${siteUrl}`)

// Function to make a GET request
async function makeRequest(path) {
  return new Promise((resolve, reject) => {
    https
      .get(`${siteUrl}${path}`, (res) => {
        const { statusCode } = res

        let data = ""
        res.on("data", (chunk) => {
          data += chunk
        })

        res.on("end", () => {
          resolve({
            statusCode,
            data,
            headers: res.headers,
          })
        })
      })
      .on("error", (err) => {
        reject(err)
      })
  })
}

// Main verification function
async function verifyDeployment() {
  try {
    console.log("1. Checking homepage...")
    const homeResult = await makeRequest("/")
    console.log(`   Status: ${homeResult.statusCode === 200 ? "✅" : "❌"} (${homeResult.statusCode})`)

    console.log("2. Checking API endpoint...")
    const apiResult = await makeRequest("/api/debug")
    console.log(`   Status: ${apiResult.statusCode === 200 ? "✅" : "❌"} (${apiResult.statusCode})`)

    console.log("3. Checking test page...")
    const testResult = await makeRequest("/test")
    console.log(`   Status: ${testResult.statusCode === 200 ? "✅" : "❌"} (${testResult.statusCode})`)

    console.log("4. Checking publication policies page...")
    const policiesResult = await makeRequest("/publication-policies")
    console.log(`   Status: ${policiesResult.statusCode === 200 ? "✅" : "❌"} (${policiesResult.statusCode})`)

    console.log("\nVerification complete!")
  } catch (error) {
    console.error("Error during verification:", error)
  }
}

verifyDeployment()
