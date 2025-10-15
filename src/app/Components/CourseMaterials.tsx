import { Clock3, Gauge, Globe, GraduationCap, LibraryBig, Pencil, SlidersHorizontal, Users } from "lucide-react"

type course = {
  title: string
  url: any
  duration: number
  lessons: number
  enrolled: number
  language: string
  level: string
  instructor: string
  category: string
  lastupdate: string
}


export default function CourseMaterials({data}: {data: course}) {
  return (
    <div className="bg-white special-shadow p-8 flex flex-col xl:flex-row xl:gap-20 text-[#666] justify-between">
      <ul className="flex-1/2">
        <li className="border-b py-4 flex justify-between">
          <div className="flex gap-4 items-center">
            <Clock3 /> <span>Duration:</span>
          </div>
          <span>{data.duration} weeks</span>
        </li>
        <li className="border-b py-4 flex justify-between">
          <div className="flex gap-4 items-center">
            <LibraryBig /> <span>Lessons:</span>
          </div>
          <span>{data.lessons}</span>
        </li>
        <li className="border-b py-4 flex justify-between">
          <div className="flex gap-4 items-center">
            <Users /> <span>Enrolled:</span>
          </div>
          <span>{data.enrolled} students</span>
        </li>
        <li className="py-4 border-b xl:border-none flex justify-between">
          <div className="flex gap-4 items-center">
            <Globe /> <span>Language:</span>
          </div>
          <span>{data.language}</span>
        </li>
      </ul>
      <ul className="flex-1/2">
        <li className="border-b py-4 flex justify-between">
          <div className="flex gap-4 items-center">
            <Gauge /> <span>Level:</span>
          </div>
          <span>{data.level}</span>
        </li>
        <li className="border-b py-4 flex justify-between">
          <div className="flex gap-4 items-center">
            <GraduationCap /> <span>Instructor:</span>
          </div>
          <span>{data.instructor}</span>
        </li>
        <li className="border-b py-4 flex justify-between">
          <div className="flex gap-4 items-center">
            <SlidersHorizontal /> <span>Category:</span>
          </div>
          <span>{data.category}</span>
        </li>
        <li className="py-4 flex justify-between">
          <div className="flex gap-4 items-center">
            <Pencil /> <span>Last Update:</span>
          </div>
          <span>{data.lastupdate}</span>
        </li>
      </ul>
    </div>
  )
}
