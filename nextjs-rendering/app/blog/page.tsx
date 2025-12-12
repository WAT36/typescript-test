// app/blog/page.tsx
type Post = {
  id: number;
  title: string;
  content: string;
};

async function getPosts(): Promise<Post[]> {
  // ビルド時に実行される// 実際にはAPIやデータベースから取得
  return [
    { id: 1, title: "最初の記事", content: "これはSSGで生成された記事です" },
    { id: 2, title: "2つ目の記事", content: "ビルド時に生成されます" },
    { id: 3, title: "Next.js入門", content: "Next.jsの基本を学びましょう" },
  ];
}

export default async function BlogPage() {
  const posts = await getPosts();
  const buildTime = new Date().toISOString();

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        color: "black",
      }}
    >
      <h1 style={{ color: "white" }}>ブログ記事一覧 (SSG)</h1>
      <p
        style={{
          background: "#fff3cd",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ffc107",
        }}
      >
        ビルド時刻: {buildTime}
      </p>

      <div>
        {posts.map((post) => (
          <article
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "15px 0",
              borderRadius: "5px",
              background: "#f9f9f9",
            }}
          >
            <h2 style={{ margin: "0 0 10px 0" }}>{post.title}</h2>
            <p style={{ margin: 0, color: "#555" }}>{post.content}</p>
          </article>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "15px 20px",
          background: "#e7f3ff",
          borderRadius: "5px",
        }}
      >
        <h3>SSGのポイント</h3>
        <ul>
          <li>ページを何度更新してもビルド時刻は変わりません</li>
          <li>ビルド時に一度だけHTMLが生成されます</li>
          <li>超高速で表示されます</li>
        </ul>
      </div>
    </div>
  );
}
