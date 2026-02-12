import "./App.css";
import BasicTable from "./components/BasicTable";
import { users } from "./data/users";

function App() {
  return (
    <div className="App">
      <h1>ユーザー管理テーブル</h1>
      <BasicTable data={users} />
    </div>
  );
}

export default App;
