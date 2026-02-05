import { useMutation, useQueryClient } from '@tanstack/react-query'

interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

function CreateUserForm() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: async (newUser: Omit<User, 'id'>) => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return response.json()
    },
    onSuccess: (data) => {
      // JSONPlaceholderは実際にはデータを保存しないため、
      // キャッシュに直接追加して画面に反映させます
      queryClient.setQueryData(['users'], (oldData: User[] | undefined) => {
        if (!oldData) return [data]
        return [...oldData, data]
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      name: 'New User',
      email: 'newuser@example.com',
      phone: '123-456-7890',
      website: 'example.com',
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? '作成中...' : 'ユーザーを作成'}
      </button>
      {mutation.isError && <p>エラーが発生しました</p>}
      {mutation.isSuccess && <p>ユーザーを作成しました！</p>}
    </form>
  )
}

export default CreateUserForm