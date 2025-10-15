interface LeaderboardEntry {
  rank: number
  name: string
  points: number
  avatar?: string
}
export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Ahmed Hassan", points: 2500 },
  { rank: 2, name: "Sara Mohamed", points: 2350 },
  { rank: 3, name: "Omar Ali", points: 2200 },
  { rank: 4, name: "Fatima Ahmed", points: 2100 },
  { rank: 5, name: "Khaled Ibrahim", points: 1950 },
  { rank: 6, name: "Mariam Mahmoud", points: 1840 },
]
