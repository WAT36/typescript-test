// app/news/page.tsx
type News = {
  id: number;
  title: string;
  timestamp: string;
};

async function getNews(): Promise<News[]> {
  // 実際にはAPIから取得
  const now = new Date().toLocaleString("ja-JP");

  return [
    {
      id: 1,
      title: "Next.js 15がリリースされました",
      timestamp: now,
    },
    {
      id: 2,
      title: "ISRで自動更新される記事の例",
      timestamp: now,
    },
    {
      id: 3,
      title: "パフォーマンス最適化のベストプラクティス",
      timestamp: now,
    },
  ];
}

// 10秒ごとに再生成
export const revalidate = 10;

export default async function NewsPage() {
  const news = await getNews();
  const generatedAt = new Date().toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        color: "black",
      }}
    >
      <h1>最新ニュース (ISR)</h1>

      <div
        style={{
          background: "#fff3cd",
          padding: "15px",
          borderRadius: "5px",
          marginBottom: "20px",
          border: "1px solid #ffc107",
        }}
      >
        <p style={{ margin: "5px 0" }}>
          <strong>生成時刻:</strong> {generatedAt}
        </p>
        <p
          style={{
            margin: "5px 0",
            fontSize: "14px",
            color: "#856404",
          }}
        >
          このページは10秒ごとに自動再生成されます
        </p>
      </div>

      <div>
        {news.map((item) => (
          <article
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              margin: "15px 0",
              background: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ margin: "0 0 10px 0", color: "#333" }}>
              {item.title}
            </h2>
            <p
              style={{
                color: "#888",
                fontSize: "13px",
                margin: 0,
              }}
            >
              更新日時: {item.timestamp}
            </p>
          </article>
        ))}
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#d1ecf1",
          borderRadius: "5px",
          border: "1px solid #bee5eb",
        }}
      >
        <h3>ISRの動作確認方法</h3>
        <ol>
          <li>このページにアクセスして生成時刻を確認</li>
          <li>10秒以上待ってからページを更新(F5)</li>
          <li>生成時刻が変わっていることを確認</li>
          <li>連続で更新しても、10秒経過するまで時刻は変わりません</li>
        </ol>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#e7f3ff",
          borderRadius: "5px",
        }}
      >
        <h3>ISRのポイント</h3>
        <ul>
          <li>初回アクセス時は静的HTMLを返すので超高速</li>
          <li>指定時間(10秒)後に誰かがアクセスすると再生成</li>
          <li>再生成中も古いページを表示(ダウンタイムなし)</li>
          <li>SSGの速度とSSRの鮮度の良いとこ取り</li>
        </ul>
      </div>
    </div>
  );
}
