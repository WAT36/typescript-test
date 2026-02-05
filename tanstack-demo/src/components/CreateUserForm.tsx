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
      if (!response.ok) {
        throw new Error('ユーザーの作成に失敗しました')
      }
      return response.json()
    },
    onMutate: async (newUser) => {
      // 進行中のクエリをキャンセル
      await queryClient.cancelQueries({ queryKey: ['users'] })
      
      // 以前のデータを保存（ロールバック用）
      const previousUsers = queryClient.getQueryData(['users'])
      
      // 楽観的に更新 - サーバーのレスポンスを待たずにUIを更新
      queryClient.setQueryData(['users'], (old: User[] | undefined) => {
        const optimisticUser: User = {
          id: Date.now(), // 仮のID
          ...newUser,
        }
        return old ? [...old, optimisticUser] : [optimisticUser]
      })
      
      return { previousUsers }
    },
    onError: (err, newUser, context) => {
      // エラー時にロールバック
      if (context?.previousUsers) {
        queryClient.setQueryData(['users'], context.previousUsers)
      }
    },
    onSettled: () => {
      // 成功・失敗に関わらず再取得（本来はここで最新データを取得）
      // JSONPlaceholderは実際にデータを保存しないため、この例では省略可能
      // queryClient.invalidateQueries({ queryKey: ['users'] })
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
      {mutation.isError && <p>エラーが発生しました（元に戻りました）</p>}
      {mutation.isSuccess && <p>ユーザーを作成しました！</p>}
    </form>
  )
}

export default CreateUserForm