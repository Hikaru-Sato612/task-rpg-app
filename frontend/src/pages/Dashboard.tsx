import { useState } from "react";
import Header from "../components/Header";
import TaskBoard from "../components/TaskBoard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [exp, setExp] = useState(0);

  const getLevel = (exp: number) => {
    let level = 1;
    let requiredExp = 100;
    while (exp >= requiredExp) {
      exp -= requiredExp;
      level++;
      requiredExp += 100;
    }
    return level;
  };

  const getCurrentExp = (exp: number) => {
    let requiredExp = 100;
    while (exp >= requiredExp) {
      exp -= requiredExp;
      requiredExp += 100;
    }
    return exp;
  };

  const getNextLevelExp = (exp: number) => {
    let requiredExp = 100;
    while (exp >= requiredExp) {
      exp -= requiredExp;
      requiredExp += 100;
    }
    return requiredExp;
  };

  const level = getLevel(exp);
  const currentExp = getCurrentExp(exp);
  const nextExp = getNextLevelExp(exp);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/"); // ログイン画面へ
  };

  return (
    <div className="drawer">
      <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <Header
          exp={exp}
          level={level}
          currentExp={currentExp}
          nextExp={nextExp}
        />
        <TaskBoard setExp={setExp} />
      </div>

      <div className="drawer-side">
        <label htmlFor="drawer-toggle" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4">
          <li>
            <a>ホーム</a>
          </li>
          <li>
            <a>アーカイブ</a>
          </li>
          <li className="mt-4">
            <button className="text-red-500" onClick={handleLogout}>
              ログアウト
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
