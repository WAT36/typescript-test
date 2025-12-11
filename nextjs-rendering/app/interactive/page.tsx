// app/interactive/page.tsx
"use client"; // クライアントコンポーネントとして明示

import { useState, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function InteractivePage() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchTime, setFetchTime] = useState("");

  useEffect(() => {
    // クライアントサイドでデータ取得
    const startTime = new Date();

    fetch("https://jsonplaceholder.typicode.com/users?_limit=3")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
        setFetchTime(startTime.toLocaleString("ja-JP"));
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        color: "black",
      }}
    >
      <h1>インタラクティブページ (CSR)</h1>

      <div
        style={{
          background: "#e3f2fd",
          padding: "20px",
          margin: "20px 0",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>カウンター</h2>
        <p
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            margin: "20px 0",
            color: "#1976d2",
          }}
        >
          カウント: {count}
        </p>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
            background: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginRight: "10px",
            fontWeight: "bold",
          }}
        >
          増やす
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            cursor: "pointer",
            background: "#757575",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          リセット
        </button>
      </div>

      <div
        style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>👥 ユーザー一覧 (API取得)</h2>
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p style={{ fontSize: "18px" }}>読み込み中...</p>
          </div>
        ) : (
          <>
            <p
              style={{
                fontSize: "13px",
                color: "#666",
                marginBottom: "15px",
              }}
            >
              データ取得時刻: {fetchTime}
            </p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {users.map((user) => (
                <li
                  key={user.id}
                  style={{
                    margin: "12px 0",
                    padding: "12px",
                    background: "white",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                >
                  <strong style={{ color: "#333" }}>{user.name}</strong>
                  <br />
                  <span style={{ fontSize: "14px", color: "#666" }}>
                    {user.email}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
        <p
          style={{
            color: "#666",
            fontSize: "14px",
            marginTop: "15px",
            padding: "10px",
            background: "#fff3cd",
            borderRadius: "5px",
          }}
        >
          このデータはブラウザ(クライアント)で取得されました
        </p>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#fff3e0",
          borderRadius: "5px",
          border: "1px solid #ffb74d",
        }}
      >
        <h3>CSRの動作確認</h3>
        <ol>
          <li>カウンターボタンをクリックして動作を確認</li>
          <li>ページのソースを表示(Ctrl+U)してください</li>
          <li>HTMLにユーザーデータが含まれていないことを確認</li>
          <li>これがCSR(ブラウザでデータ取得)の証拠です</li>
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
        <h3>CSRのポイント</h3>
        <ul>
          <li>JavaScriptが実行されて初めてコンテンツが表示</li>
          <li>ユーザー操作に即座に反応できる</li>
          <li>SEOには不利(初期HTMLが空)</li>
          <li>インタラクティブなUIに最適</li>
        </ul>
      </div>
    </div>
  );
}
