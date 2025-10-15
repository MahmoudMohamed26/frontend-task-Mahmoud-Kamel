"use client"

import Breadcrumbs from "@/app/Components/Breadcrumbs"
import Video from "next-video"
import coursePoster from "@/../images/coursePoster.webp"
import {
  BookOpenText,
  CircleQuestionMark,
  Medal,
  MessageCircle,
  MoveRight,
} from "lucide-react"
import CourseNavLink from "@/app/Components/CourseNavLink"
import QuestionDialog from "@/app/Components/QuestionDialog"
import LeaderboardDialog from "@/app/Components/LeaderboardDialog"
import { useState, useRef, useEffect } from "react"
import Header from "@/app/Components/Header"
import CourseMaterials from "@/app/Components/CourseMaterials"
import { course } from "@/data/course-data"
import CourseComments from "@/app/Components/CourseComments"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import BtnLoad from "@/app/Components/ButtonLoad"
import ProgressBar from "@/app/Components/ProgressBar"
import CourseContent from "@/app/Components/CourseContent"

export default function CoursePage() {
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false)
  const [leaderboardDialogOpen, setLeaderboardDialogOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [load, setLoad] = useState(false)
  const [videoHeight, setVideoHeight] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const videoRef = useRef<HTMLDivElement>(null)

  const sendComment = (comment: string) => {
    setLoad(true)
    setTimeout(() => {
      toast.success("Review submitted successfully")
      setLoad(false)
      setComment("")
      console.log("Comment sent: ", comment)
    }, 1000)
  }

  useEffect(() => {
    const updateVideoHeight = () => {
      const isMobileView = window.innerWidth < 640
      setIsMobile(isMobileView)
      
      if (videoRef.current && isMobileView) {
        const height = videoRef.current.offsetHeight
        setVideoHeight(height)
      } else {
        setVideoHeight(null)
      }
    }

    updateVideoHeight()
    window.addEventListener("resize", updateVideoHeight)

    const observer = new MutationObserver(updateVideoHeight)
    if (videoRef.current) {
      observer.observe(videoRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
      })
    }
    
    const timeout = setTimeout(updateVideoHeight, 100)
    const timeout2 = setTimeout(updateVideoHeight, 500)

    return () => {
      window.removeEventListener("resize", updateVideoHeight)
      observer.disconnect()
      clearTimeout(timeout)
      clearTimeout(timeout2)
    }
  }, [])

  return (
    <>
      <nav className="bg-[var(--main-bg-color)] py-6">
        <div className="container px-3">
          <Breadcrumbs />
          <h1 className="text-4xl font-semibold">{course.title}</h1>
        </div>
      </nav>

      <main
        className="
          container !mt-5 
          grid grid-cols-1 lg:grid-cols-[2fr_1fr] 
          auto-rows-max gap-6
        "
      >
        {/* Left side (Video + rest of sections) */}
        <div className="grid grid-rows-[auto_auto_auto_auto] gap-8">
          {/* --- Video Section --- */}
          <section 
            ref={videoRef}
            className="sticky sm:static top-0 z-10 md:px-3"
          >
            <Video src={course.url} poster={coursePoster} />
          </section>

          {/* --- Navigation --- */}
          <section>
            <ul className="flex flex-wrap gap-4 px-3">
              <CourseNavLink
                title="Course Content"
                href="#content"
                Icon={BookOpenText}
              />
              <CourseNavLink
                title="Course Comments"
                href="#comments"
                Icon={MessageCircle}
              />
              <CourseNavLink
                title="Ask a Question"
                Icon={CircleQuestionMark}
                onClick={() => setQuestionDialogOpen(true)}
              />
              <CourseNavLink
                title="View Leaderboard"
                Icon={Medal}
                onClick={() => setLeaderboardDialogOpen(true)}
              />
            </ul>
          </section>

          {/* --- Course Materials --- */}
          <section className="pt-5 px-3">
            <Header text="Course Materials" />
            <CourseMaterials data={course} />
          </section>

          {/* Right-hand side (Topics, progress) Mobile */}
          <aside 
            id="content" 
            className="px-3 pt-5 lg:pt-0 lg:top-0 block lg:hidden"
            style={{
              scrollMarginTop: isMobile && videoHeight ? `${videoHeight}px` : '0'
            }}
          >
            <Header text="Topics for This Course" />
            <ProgressBar progress={63} />
            <div className="pt-5">
              <CourseContent />
            </div>
          </aside>

          {/* --- Comments --- */}
          <section 
            id="comments" 
            className="pt-5 px-3"
            style={{
              scrollMarginTop: isMobile && videoHeight ? `${videoHeight}px` : '0'
            }}
          >
            <Header text="Comments" />
            <CourseComments />
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment"
              className="border-none special-shadow h-50 mt-10 mb-5 !p-5"
            />
            <Button
              onClick={() => sendComment(comment)}
              disabled={!comment.trim() || load}
              className="bg-[var(--main-color)] hover:bg-[var(--main-hover-color)] duration-300 !rounded-sm !p-6"
            >
              {load ? (
                <BtnLoad />
              ) : (
                <>
                  Submit Review <MoveRight />
                </>
              )}
            </Button>
          </section>
        </div>

        {/* Right-hand side (Topics, progress) wide */}
        <aside className="px-3 lg:top-0 hidden lg:block">
          <Header text="Topics for This Course" />
          <ProgressBar progress={63} />
          <div className="pt-5">
            <CourseContent />
          </div>
        </aside>
      </main>

      <footer className="text-center py-5 mt-15 text-sm text-[#666] bg-[var(--main-bg-color)]">
        Developed By Mahmoud Kamel ♥
      </footer>

      <QuestionDialog
        open={questionDialogOpen}
        onOpenChange={setQuestionDialogOpen}
      />
      <LeaderboardDialog
        open={leaderboardDialogOpen}
        title={course.title}
        onOpenChange={setLeaderboardDialogOpen}
      />
    </>
  )
}