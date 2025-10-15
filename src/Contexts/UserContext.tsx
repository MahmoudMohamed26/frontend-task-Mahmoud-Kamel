'use client'

import { createContext, useContext, ReactNode } from 'react'

interface User {
  name: string
  avatarURL: string
  email?: string
}

interface UserContextType {
  user: User | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const user: User = {
    name: "Mahmoud Kamel",
    avatarURL: "https://api.dicebear.com/9.x/miniavs/svg?flip=false",
    email: "mahmoudkamel26300@gmail.com"
  }

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}