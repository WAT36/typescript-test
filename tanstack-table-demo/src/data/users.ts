// ユーザーの型定義
export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    age: number
    status: 'active' | 'inactive' | 'pending'
    role: 'admin' | 'user' | 'guest'
    createdAt: string
  }
  
  // サンプルデータ
  export const users: User[] = [
    {
      id: 1,
      firstName: '太郎',
      lastName: '山田',
      email: 'taro.yamada@example.com',
      age: 28,
      status: 'active',
      role: 'admin',
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      firstName: '花子',
      lastName: '鈴木',
      email: 'hanako.suzuki@example.com',
      age: 34,
      status: 'active',
      role: 'user',
      createdAt: '2024-02-20',
    },
    {
      id: 3,
      firstName: '一郎',
      lastName: '佐藤',
      email: 'ichiro.sato@example.com',
      age: 45,
      status: 'inactive',
      role: 'user',
      createdAt: '2023-11-10',
    },
    {
      id: 4,
      firstName: '美咲',
      lastName: '田中',
      email: 'misaki.tanaka@example.com',
      age: 23,
      status: 'pending',
      role: 'guest',
      createdAt: '2024-03-05',
    },
    {
      id: 5,
      firstName: '健太',
      lastName: '高橋',
      email: 'kenta.takahashi@example.com',
      age: 31,
      status: 'active',
      role: 'user',
      createdAt: '2024-01-28',
    },
    {
      id: 6,
      firstName: '由美',
      lastName: '伊藤',
      email: 'yumi.ito@example.com',
      age: 29,
      status: 'active',
      role: 'admin',
      createdAt: '2023-12-15',
    },
    {
      id: 7,
      firstName: '大輔',
      lastName: '渡辺',
      email: 'daisuke.watanabe@example.com',
      age: 38,
      status: 'inactive',
      role: 'user',
      createdAt: '2023-10-20',
    },
    {
      id: 8,
      firstName: '愛',
      lastName: '小林',
      email: 'ai.kobayashi@example.com',
      age: 26,
      status: 'active',
      role: 'user',
      createdAt: '2024-02-10',
    },
    {
      id: 9,
      firstName: '翔太',
      lastName: '加藤',
      email: 'shota.kato@example.com',
      age: 33,
      status: 'pending',
      role: 'guest',
      createdAt: '2024-03-01',
    },
    {
      id: 10,
      firstName: '真由',
      lastName: '吉田',
      email: 'mayu.yoshida@example.com',
      age: 27,
      status: 'active',
      role: 'user',
      createdAt: '2024-01-05',
    },
    {
      id: 11,
      firstName: '隆',
      lastName: '山本',
      email: 'takashi.yamamoto@example.com',
      age: 42,
      status: 'active',
      role: 'admin',
      createdAt: '2023-09-15',
    },
    {
      id: 12,
      firstName: '恵',
      lastName: '中村',
      email: 'megumi.nakamura@example.com',
      age: 35,
      status: 'inactive',
      role: 'user',
      createdAt: '2023-08-20',
    },
  ]