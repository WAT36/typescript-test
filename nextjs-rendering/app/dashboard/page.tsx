// app/dashboard/page.tsx
import { headers } from "next/headers";

// SSRを強制的に有効化
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "Unknown";
  const currentTime = new Date().toLocaleString("ja-JP", {
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
      <h1 style={{ color: "white" }}>ダッシュボード (SSR)</h1>

      <div
        style={{
          background: "#f0f0f0",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <p style={{ fontSize: "18px", margin: "10px 0" }}>
          <strong>現在時刻:</strong> {currentTime}
        </p>
        <p style={{ fontSize: "14px", margin: "10px 0", color: "#555" }}>
          <strong>あなたのブラウザ:</strong>
          <br />
          {userAgent}
        </p>
      </div>

      <div
        style={{
          padding: "15px 20px",
          background: "#d4edda",
          borderRadius: "5px",
          border: "1px solid #c3e6cb",
        }}
      >
        <h3>SSRの動作確認</h3>
        <ol>
          <li>このページを更新(F5)してください</li>
          <li>現在時刻が更新されることを確認</li>
          <li>これがSSR(リクエストごとにHTML生成)の証拠です</li>
        </ol>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px 20px",
          background: "#e7f3ff",
          borderRadius: "5px",
        }}
      >
        <h3>SSRのポイント</h3>
        <ul>
          <li>ページを更新するたびに時刻が変わります</li>
          <li>リクエストごとにサーバーでHTMLが生成されます</li>
          <li>常に最新のデータを表示できます</li>
        </ul>
      </div>
    </div>
  );
}
