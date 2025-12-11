import Link from "next/link"
import Breadcrumbs from "./Components/Breadcrumbs"

export default function Home() {
  const data = [
    {
      title: "Stating SEO as your Home",
    },
  ]
  return (
    <>
      <nav className="bg-[var(--main-bg-color)] py-6">
        <div className="container px-3">
          <Breadcrumbs />
        </div>
      </nav>
      <div className="container space-y-2 !mt-2">
        <p>No Content here :)</p>
        <p>
          Navigate to{" "}
          <Link
            className="hover:underline text-[var(--main-color)]"
            href="/courses/12"
          >
            Task
          </Link>
        </p>
      </div>
    </>
  )
}
