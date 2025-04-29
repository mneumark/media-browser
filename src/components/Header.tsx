import Link from "next/link"

export function Header() {
  return (
  <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
    <Link href="/"><h1 className="text-2xl font-bold">Media Browser</h1></Link>
  </div>
  )
}