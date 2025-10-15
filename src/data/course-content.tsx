type QuizContent = {
  id: number;
  title: string;
  access: boolean;
  type: "quiz";
  questions: number;
  time: number;
};

type PdfContent = {
  id: number;
  title: string;
  access: boolean;
  type: "pdf";
};

type CourseContentItem = QuizContent | PdfContent;

type CourseGroup = {
  duration: string;
  content: CourseContentItem[];
};

export const courseContent: CourseGroup[] = [
  {
    duration: "1-4",
    content: [
      { id: 1, title: "Introduction to Programming", access: true, type: "pdf" },
      { id: 2, title: "Getting Started Quiz", access: true, type: "quiz", questions: 5, time: 10 },
      { id: 3, title: "Variables & Data Types", access: false, type: "pdf" },
      { id: 4, title: "Control Flow", access: false, type: "pdf" },
      { id: 5, title: "Functions Overview", access: false, type: "pdf" },
      { id: 6, title: "Functions Quiz", access: false, type: "quiz", questions: 8, time: 15 },
    ],
  },
  {
    duration: "5-8",
    content: [
      { id: 7, title: "Objects and Arrays", access: false, type: "pdf" },
      { id: 8, title: "Objects Quiz", access: false, type: "quiz", questions: 10, time: 20 },
      { id: 9, title: "ES6 Features", access: false, type: "pdf" },
      { id: 10, title: "Asynchronous JavaScript", access: false, type: "pdf" },
      { id: 11, title: "Async/Await Deep Dive", access: false, type: "pdf" },
      { id: 12, title: "Promises Quiz", access: false, type: "quiz", questions: 12, time: 25 },
    ],
  },
  {
    duration: "9-12",
    content: [
      { id: 13, title: "DOM Manipulation", access: false, type: "pdf" },
      { id: 14, title: "DOM Quiz", access: false, type: "quiz", questions: 10, time: 20 },
      { id: 15, title: "Event Handling", access: false, type: "pdf" },
      { id: 16, title: "Frontend Architecture", access: false, type: "pdf" },
      { id: 17, title: "Final Review", access: false, type: "pdf" },
      { id: 18, title: "Final Exam", access: false, type: "quiz", questions: 20, time: 40 },
    ],
  },
];