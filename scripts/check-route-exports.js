import fs from "fs/promises"
import path from "path"
import { glob } from "glob"   // use named export

const root = path.resolve(process.cwd(), "app")
const patterns = [
  "**/page.@(tsx|jsx|js)",
  "**/layout.@(tsx|jsx|js)",
  "**/route.@(ts|js)",
]

const checkFile = async (file) => {
  const src = await fs.readFile(file, "utf8")
  const hasDefault =
    /export\s+default/.test(src) ||
    /export\s*\{\s*.+\s*as\s*default\s*\}/.test(src)
  if (file.includes("route.")) {
    const hasHandler =
      /(export\s+(async\s+)?function\s+(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS))|(export\s+const\s+(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS))/i
    if (!hasHandler.test(src)) {
      return `${file}: route file has no HTTP handler export`
    }
    return null
  }
  if (!hasDefault) return `${file}: missing default export`
  return null
}

const main = async () => {
  const files = patterns.flatMap((p) =>
    glob.sync(p, { cwd: root, absolute: true })
  )
  const results = await Promise.all(files.map(checkFile))
  const issues = results.filter(Boolean)
  if (!issues.length) {
    console.log(
      "OK: all pages/layouts/route handlers have required export shape"
    )
    process.exit(0)
  }
  console.log("Issues found:")
  issues.forEach((i) => console.log(" -", i))
  process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(2)
})