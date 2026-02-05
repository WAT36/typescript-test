export interface User {
    id: number
    name: string
    email: string
    phone: string
    website: string
  }
  
  export const fetchUsers = async (): Promise<User[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) {
      throw new Error('ユーザー一覧の取得に失敗しました')
    }
    return response.json()
  }
  
  export const fetchUser = async (userId: number): Promise<User> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    if (!response.ok) {
      throw new Error('ユーザーの取得に失敗しました')
    }
    return response.json()
  }