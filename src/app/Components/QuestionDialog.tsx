"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"
import { useUser } from "@/Contexts/UserContext"
import getInitials from "@/helpers/avatar-fallback"
import { toast } from "sonner"
import BtnLoad from "./ButtonLoad"

interface QuestionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function QuestionDialog({
  open,
  onOpenChange,
}: QuestionDialogProps) {
  const [question, setQuestion] = useState("")
  const { user } = useUser()
  const [load, setLoad] = useState(false)

  const handleSubmit = () => {
    setLoad(true)
    setTimeout(() => {
      setLoad(false)
      toast.success("Question Sent Successfully");
      console.log("Question submitted:", question);
      setQuestion("");
      onOpenChange(false)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
          <DialogDescription>
            Submit your question about this course and get answers from
            instructors.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user?.avatarURL} alt={user?.name} />
                <AvatarFallback className="bg-[var(--main-color)] text-white">
                  {user ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-2">
              <div className="text-sm font-medium text-gray-700">
                {user?.name}
              </div>
              <Textarea
                placeholder="Type your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[var(--main-color)] hover:bg-[var(--main-hover-color)]"
              onClick={handleSubmit}
              disabled={!question.trim() || load}
            >
              {load ? <BtnLoad /> : "Submit Question"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
