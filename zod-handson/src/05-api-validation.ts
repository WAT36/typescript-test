import { z } from "zod";

// API レスポンスのスキーマ定義
const ApiPostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

// 配列レスポンス用
const ApiPostListSchema = z.array(ApiPostSchema);

// 型を自動生成
type ApiPost = z.infer<typeof ApiPostSchema>;

// バリデーション付き fetch 関数
async function fetchPosts(): Promise<ApiPost[]> {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );
  const rawData: unknown = await response.json();

  // ここでランタイムバリデーション！
  const result = ApiPostListSchema.safeParse(rawData);

  if (!result.success) {
    console.error("API レスポンスが期待した形式と異なります:");
    console.error(result.error.issues);
    throw new Error("Invalid API response");
  }

  return result.data; // 型安全な ApiPost[] が返る
}

// 実行
(async () => {
  try {
    const posts = await fetchPosts();
    posts.forEach((post) => {
      console.log(`📝 [${post.id}] ${post.title}`);
    });
  } catch (err) {
    console.error("取得に失敗しました:", err);
  }
})();
