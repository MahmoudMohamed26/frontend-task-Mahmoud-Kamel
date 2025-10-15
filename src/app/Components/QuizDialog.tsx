import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlarmClock } from "lucide-react"

type Question = {
  id: number
  question: string
  options: string[]
  answer: string
}

type Quiz = {
  id: number
  time: number
  questions: Question[]
}

type QuizDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  quizId: number | null
}

export const quizData = [
  {
    id: 2,
    time: 10,
    questions: [
      {
        id: 1,
        question: "What is a variable in programming?",
        options: [
          "A fixed number",
          "A container for storing data values",
          "A programming error",
          "A math formula",
        ],
        answer: "A container for storing data values",
      },
      {
        id: 2,
        question:
          "Which keyword is used to declare a block-scoped variable in JavaScript?",
        options: ["var", "let", "const", "function"],
        answer: "let",
      },
      {
        id: 3,
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Number", "Boolean", "Character"],
        answer: "Character",
      },
      {
        id: 4,
        question: "How do you define a function in JavaScript?",
        options: [
          "function myFunction() {}",
          "def myFunction() {}",
          "func myFunction() {}",
          "function:myFunction() {}",
        ],
        answer: "function myFunction() {}",
      }
    ],
  },
]

export default function QuizDialog({
  open,
  onOpenChange,
  quizId,
}: QuizDialogProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({})
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)

  const quiz = quizData.find((q) => q.id === quizId)

  useEffect(() => {
    if (open && quiz) {
      setTimeLeft(quiz.time * 60)
      setCurrentQuestion(0)
      setSelectedAnswers({})
      setQuizCompleted(false)
      setScore(0)
    }
  }, [open, quiz])

  const handleSubmitQuiz = (): void => {
    if (!quiz) return
    let correctAnswers = 0
    quiz.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        correctAnswers++
      }
    })
    setScore(correctAnswers)
    setQuizCompleted(true)
  }

  useEffect(() => {
    if (!open || quizCompleted || timeLeft <= 0 || !quiz) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [open, quizCompleted, timeLeft, quiz])

  if (!quiz) return null

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answer: string): void => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer,
    })
  }

  const handleNext = (): void => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = (): void => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const currentQ = quiz.questions[currentQuestion]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-none bg-gradient-to-br from-[#445DC4] to-[#2e3e84] h-full sm:h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl m-auto py-2 px-8 w-fit rounded-lg bg-[#FBD500] special-shadow-yellow">
            <div className="flex text-white items-center gap-2">
              <AlarmClock size={20} />
              <span className="font-semibold text-lg">
                {formatTime(timeLeft)}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        {!quizCompleted ? (
          <div className="space-y-6">
            <div className="w-full overflow-x-auto">
              <div className="flex justify-center gap-2 mb-6 px-4 pb-2 min-w-max">
                {quiz.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-lg font-semibold transition-all flex-shrink-0 ${
                      index === currentQuestion
                        ? "bg-white text-[#445DC4] border-white"
                        : selectedAnswers[index]
                        ? "bg-[#445DC4] text-white border-white"
                        : "bg-transparent text-white border-white"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8 bg-white px-6 py-10 rounded-2xl">
              <h3 className="text-lg font-semibold">{currentQ.question}</h3>

              <div className="space-y-8">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full p-4 special-shadow-blue text-left border-2 rounded-lg transition-all ${
                      selectedAnswers[currentQuestion] === option
                        ? "border-[#445DC4] bg-blue-100"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[currentQuestion] === option
                            ? "border-[#445DC4] bg-[#445DC4]"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedAnswers[currentQuestion] === option && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                variant="outline"
                className="bg-white text-[#445DC4] hover:text-[#445DC4] cursor-pointer hover:bg-[#e4e4e4]"
              >
                Previous
              </Button>

              {currentQuestion === quiz.questions.length - 1 ? (
                <Button
                  onClick={handleSubmitQuiz}
                  disabled={!selectedAnswers[currentQuestion]}
                  className="bg-white text-[#445DC4] hover:bg-[#e4e4e4]"
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!selectedAnswers[currentQuestion]}
                  className="bg-white text-[#445DC4] hover:bg-[#e4e4e4]"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6 text-white py-8">
            <CheckCircle2 className="mx-auto" size={64} />
            <div>
              <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
              <p className="">Your Results</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-2">
              <div className="text-5xl font-bold text-[#445DC4]">
                {score}/{quiz.questions.length}
              </div>
              <p className="text-gray-600">
                {Math.round((score / quiz.questions.length) * 100)}% Correct
              </p>
            </div>

            <Button
              onClick={() => onOpenChange(false)}
              className="bg-white text-[#445DC4] hover:bg-[#e4e4e4]"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
