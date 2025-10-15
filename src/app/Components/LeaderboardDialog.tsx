"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Medal, Trophy, Award, BicepsFlexed } from "lucide-react"
import { leaderboard } from "@/data/leaderboard-data"

interface LeaderboardDialogProps {
  open: boolean
  title?: string
  onOpenChange: (open: boolean) => void
}

export default function LeaderboardDialog({
  open,
  onOpenChange,
  title,
}: LeaderboardDialogProps) {
  

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" size={24} />
      case 2:
        return <Medal className="text-gray-400" size={24} />
      case 3:
        return <Award className="text-orange-600" size={24} />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="text-[#080365] px-6 pt-6 pb-4 shrink-0">
          <DialogTitle className="text-center font-light">{title}</DialogTitle>
          <span className="m-auto font-bold">Leaderboard</span>
          <DialogDescription className="flex gap-3 sm:gap-5 items-center flex-row-reverse text-right bg-[var(--main-bg-color)] p-4 sm:p-6 text-base sm:text-xl text-[#080365]">
            <span className="shrink-0">
              <BicepsFlexed size={60} className="sm:w-20 sm:h-20" color="#FFCE44" />
            </span>
            <span>
              عظيم يا صديقي.. أداءك في الكورس ده أفضل من 60% من باقي الطلبة..
              كمّل عايز أشوف اسمك في الليدر بورد هنا
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto px-6 pb-6">
          <div className="space-y-3 bg-[var(--main-bg-color)] p-4">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center gap-4 p-3 sm:p-4 rounded-lg border transition-colors ${
                  entry.rank <= 3
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center justify-center w-10 sm:w-12 shrink-0">
                  {getRankIcon(entry.rank)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">{entry.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{entry.points} points</p>
                </div>
                {entry.rank <= 3 && (
                  <div className="text-xs font-medium text-gray-500 bg-white px-2 sm:px-3 py-1 rounded-full border shrink-0">
                    Top {entry.rank}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}