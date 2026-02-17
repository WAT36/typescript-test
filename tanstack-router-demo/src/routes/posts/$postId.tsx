import { createFileRoute } from "@tanstack/react-router";

// 非同期でデータを取得する関数（実際はAPIコール）
async function fetchPost(postId: string) {
  // シミュレートされたAPI呼び出し
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: postId,
    title: `記事 ${postId}`,
    content: "記事の内容...",
  };
}

export const Route = createFileRoute("/posts/$postId")({
  // ページ表示前にデータをロード
  loader: async ({ params }) => {
    const post = await fetchPost(params.postId);
    return { post };
  },
  component: PostDetailPage,
});

function PostDetailPage() {
  // loaderのデータを取得（型安全！）
  const { post } = Route.useLoaderData();

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
