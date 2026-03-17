import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";

// 検索パラメータのスキーマを定義
const postsSearchSchema = z.object({
  page: z.number().optional().default(1),
  filter: z.enum(["all", "published", "draft"]).optional().default("all"),
});

export const Route = createFileRoute("/posts/")({
  // 検索パラメータのバリデーション
  validateSearch: postsSearchSchema,
  component: PostsPage,
});

function PostsPage() {
  // 検索パラメータを型安全に取得
  const { page, filter } = Route.useSearch();

  return (
    <div>
      <h1>記事一覧</h1>
      <p>現在のページ: {page}</p>
      <p>フィルター: {filter}</p>

      {/* 検索パラメータ付きのリンク */}
      <Link to="/posts" search={{ page: 2, filter: "published" }}>
        2ページ目（公開済みのみ）
      </Link>
    </div>
  );
}
