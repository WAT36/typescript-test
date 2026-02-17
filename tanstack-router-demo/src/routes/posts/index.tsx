import { createFileRoute, Link } from "@tanstack/react-router";

// サンプルデータ
const posts = [
  { id: 1, title: "TanStack Routerの基本" },
  { id: 2, title: "動的ルートの使い方" },
  { id: 3, title: "データローディングのベストプラクティス" },
];

export const Route = createFileRoute("/posts/")({
  component: PostsPage,
});

function PostsPage() {
  return (
    <div>
      <h1>📝 記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: "0.5rem" }}>
            <Link
              to="/posts/$postId"
              params={{ postId: String(post.id) }}
              style={{ textDecoration: "none", color: "#0066cc" }}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
