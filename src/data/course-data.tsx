import myVideoData from "@/../videos/courseVideo.mp4.json"
const myVideo = myVideoData as any
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
export const course: course = {
  title: "Starting SEO as your Home",
  url: myVideo,
  duration: 3,
  lessons: 8,
  enrolled: 65,
  language: "English",
  level: "Advanced",
  instructor: "Ali Shaheen",
  category: "Web Development",
  lastupdate: "October 2025",
}
