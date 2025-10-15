import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { courseComments } from "@/data/course-comments"
import getInitials from "@/helpers/avatar-fallback"

export default function CourseComments() {
  const showData = courseComments.map((el , idx) => {
    return (
      <div className={`flex gap-8 ${idx !== courseComments.length-1 && "border-b"} py-5`} key={el.name}>
        <Avatar className="w-16 h-16">
          <AvatarImage src={el.avatar} alt={el.name} />
          <AvatarFallback className="bg-[var(--main-color)] text-white">
            {getInitials(el.name)}
          </AvatarFallback>
        </Avatar>
        <div className="text-[#666]">
          <h1 className="mb-1 font-semibold">{el.name}</h1>
          <span className="block mb-4 text-sm">{el.date}</span>
          <p className="text-sm">{el.comment}</p>
        </div>
      </div>
    )
  })

  return(
    <>
    {showData}
    </>
  )
}
