"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { File, Lock, Unlock } from "lucide-react"
import { courseContent } from "@/data/course-content"

export default function CourseContent() {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible>
        {courseContent.map((group, groupIndex) => (
          <AccordionItem
            key={groupIndex}
            className={`!border ${courseContent.length-1 !== groupIndex && "mb-10"}`}
            value={`item-${groupIndex + 1}`}
          >
            <AccordionTrigger className="p-6">
              Week {group.duration}
            </AccordionTrigger>

            <AccordionContent className="text-sm p-3 lg:p-6 lg:pt-0 pt-0 text-[#666]">
              <p>
                Advanced story telling techniques for writers: personas,
                characters & plots
              </p>

              <div className="border-t border-b mt-5">
                {group.content.map((item , idx) => (
                  <button
                    key={item.id}
                    className={`flex w-full justify-between items-center py-4 ${idx !== group.content.length-1 && "border-b" } text-black cursor-pointer`}
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
    </div>
  )
}
