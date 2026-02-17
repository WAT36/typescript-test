import { createFileRoute } from "@tanstack/react-router";

// サンプルデータ
const postsData: Record<string, { title: string; content: string }> = {
  "1": {
    title: "TanStack Routerの基本",
    content: "TanStack Routerは型安全なルーティングを実現します...",
  },
  "2": {
    title: "動的ルートの使い方",
    content: "$接頭辞を使ってパラメータを受け取ることができます...",
  },
  "3": {
    title: "データローディングのベストプラクティス",
    content: "loaderオプションを使用してデータを事前に取得できます...",
  },
};

export const Route = createFileRoute("/posts/$postId")({
  component: PostDetailPage,
});

function PostDetailPage() {
  // paramsは型安全！ postIdが自動的に推論される
  const { postId } = Route.useParams();
  const post = postsData[postId];

  if (!post) {
    return <div>記事が見つかりませんでした</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p style={{ color: "#666", marginTop: "1rem" }}>記事ID: {postId}</p>
    </div>
  );
}
