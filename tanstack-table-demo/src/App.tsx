import "./App.css";
import FullFeaturedTable from "./components/FullFeaturedTable";
import { users, type User } from "./data/users";

function App() {
  const handleEdit = (user: User) => {
    alert(`編集: ${user.lastName} ${user.firstName} (ID: ${user.id})`);
  };

  const handleDelete = (user: User) => {
    if (window.confirm(`${user.lastName} ${user.firstName} を削除しますか？`)) {
      alert(`削除: ID ${user.id}`);
    }
  };

  return (
    <div className="App">
      <h1>ユーザー管理テーブル</h1>
      <FullFeaturedTable
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
