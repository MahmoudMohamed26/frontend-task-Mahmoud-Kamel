import Breadcrumbs from "../Components/Breadcrumbs"

export default function Courses() {
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
          <a
            className="hover:underline text-[var(--main-color)]"
            href="/courses/12"
          >
            Task
          </a>
        </p>
      </div>
    </>
  )
}
