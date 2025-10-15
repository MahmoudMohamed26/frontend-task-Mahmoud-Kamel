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
import { useState } from "react"
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

  const sendComment = (comment: string) => {
    setLoad(true)
    setTimeout(() => {
      toast.success("Review submitted successfully")
      setLoad(false)
      setComment("")
      console.log("Comment sent: ", comment)
    }, 1000)
  }

  return (
    <>
      <nav className="bg-[var(--main-bg-color)] py-6">
        <div className="container px-3">
          <Breadcrumbs />
          <h1 className="text-4xl font-semibold">{course.title}</h1>
        </div>
      </nav>

      <main className="container !mt-5 grid gap-15 grid-cols-6">
        <div className="sticky col-span-6 lg:col-span-4 sm:static top-0 z-10 md:px-2">
          <Video src={course.url} poster={coursePoster} />
        </div>

        {/* right hand side  */}
        <section className="lg:col-span-2 col-span-6">
          <div className="px-2">
            <Header text="Topics for This Course" />
            <div>
              <ProgressBar progress={63} />
            </div>
          </div>
          <div className="pt-5 mt-15 px-2">
            <CourseContent />
          </div>
        </section>
        {/* left hand side  */}
        <section className="flex-1 min-h-screen col-span-6 lg:col-span-4">
          {/* video player section */}
          <ul className="flex gap-4 mt-8 px-2">
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

          {/* course Materials section  */}
          <div id="content" className="pt-10 mt-5 px-2">
            <Header text="Course Materials" />
            <CourseMaterials data={course} />
          </div>

          <div id="comments" className="pt-10 mt-5 px-2">
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
          </div>
        </section>
      </main>

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
