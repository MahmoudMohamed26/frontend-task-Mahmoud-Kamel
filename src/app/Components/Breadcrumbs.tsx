"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const format = (segment: string) => {
    if (!isNaN(Number(segment))) {
      return "Course Content";
    }
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  return (
    <nav className="text-sm text-gray-500 mb-7">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>

        {segments.map((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const isLast = idx === segments.length - 1;

          return (
            <li key={idx} className="flex items-center">
              <span className="mx-1">›</span>
              {isLast ? (
                <span className="font-semibold text-gray-800">
                  {format(segment)}
                </span>
              ) : (
                <Link href={href} className="hover:underline">
                  {format(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}