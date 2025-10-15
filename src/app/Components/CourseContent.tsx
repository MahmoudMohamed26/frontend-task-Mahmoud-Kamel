"use client"

import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { File, Lock, Unlock } from "lucide-react"
import QuizDialog from "./QuizDialog"
import { courseContent } from "@/data/course-content"

type QuizContent = {
  id: number
  title: string
  access: boolean
  type: "quiz"
  questions: number
  time: number
}

type PdfContent = {
  id: number
  title: string
  access: boolean
  type: "pdf"
}

type CourseContentItem = QuizContent | PdfContent

export default function CourseContent() {
  const [quizDialogOpen, setQuizDialogOpen] = useState<boolean>(false)
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null)
  const [lockedDialogOpen, setLockedDialogOpen] = useState<boolean>(false)

  const handleItemClick = (item: CourseContentItem): void => {
    if (item.type === "quiz" && item.access) {
      setSelectedQuizId(item.id)
      setQuizDialogOpen(true)
    } else if (!item.access) {
      setLockedDialogOpen(true)
    }
  }

  return (
    <div className="w-full">
      <Accordion type="single" collapsible>
        {courseContent.map((group, groupIndex) => (
          <AccordionItem
            key={groupIndex}
            className={`!border ${
              courseContent.length - 1 !== groupIndex && "mb-10"
            }`}
            value={`item-${groupIndex + 1}`}
          >
            <AccordionTrigger className="p-6">
              {group.header}
            </AccordionTrigger>

            <AccordionContent className="text-sm p-3 lg:p-6 lg:pt-0 pt-0 text-[#666]">
              <p>
                Advanced story telling techniques for writers: personas,
                characters & plots
              </p>

              <div className="border-t border-b mt-5">
                {group.content.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className={`flex w-full justify-between items-center py-4 ${
                      idx !== group.content.length - 1 && "border-b"
                    } text-black cursor-pointer transition-colors`}
                  >
                    <div className="flex gap-2 items-center">
                      <File size={15} />
                      <p className="truncate">{item.title}</p>
                    </div>

                    <div className="flex gap-2 items-center flex-wrap-reverse justify-end">
                      {item.type === "quiz" && (
                        <>
                          <span className="bg-[#FDF2F4] text-[#E4487C] p-1 text-xs rounded">
                            {item.time} MINUTES
                          </span>
                          <span className="bg-[#F3FAF9] text-[#40B7B7] p-1 text-xs rounded">
                            {item.questions} QUESTIONS
                          </span>
                        </>
                      )}

                      {item.access ? (
                        <Unlock color="#40B7B7" size={15} />
                      ) : (
                        <Lock color="#E4487C" size={15} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <QuizDialog
        open={quizDialogOpen}
        onOpenChange={setQuizDialogOpen}
        quizId={selectedQuizId}
      />

      <Dialog open={lockedDialogOpen} onOpenChange={setLockedDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Content Locked</DialogTitle>
            <DialogDescription>
              You need to complete previous content first to unlock this.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setLockedDialogOpen(false)}
              className="bg-[#40B7B7] hover:bg-[#359999]"
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}