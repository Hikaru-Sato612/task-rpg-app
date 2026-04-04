import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
















// import { useState } from "react";
// import Header from "./components/Header";
// import TaskBoard from "./components/TaskBoard";

// function App() {
//   const [exp, setExp] = useState(0);
//   // レベル計算
//   const getLevel = (exp: number) => {
//     let level = 1;
//     let requiredExp = 100;

//     while (exp >= requiredExp) {
//       exp -= requiredExp;
//       level++;
//       requiredExp += 100;
//     }

//     return level;
//   };
//   // 現在のEXP
//   const getCurrentExp = (exp: number) => {
//     let requiredExp = 100;

//     while (exp >= requiredExp) {
//       exp -= requiredExp;
//       requiredExp += 100;
//     }

//     return exp;
//   };

//   // 次のレベルまでに必要なEXP
//   const getNextLevelExp = (exp: number) => {
//     let requiredExp = 100;

//     while (exp >= requiredExp) {
//       exp -= requiredExp;
//       requiredExp += 100;
//     }

//     return requiredExp;
//   };

//   const level = getLevel(exp);
//   const currentExp = getCurrentExp(exp);
//   const nextExp = getNextLevelExp(exp);

//   return (
//     <div className="drawer">
//       <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
//       {/* メイン */}
//       <div className="drawer-content">
//         <Header
//           exp={exp}
//           level={level}
//           currentExp={currentExp}
//           nextExp={nextExp}
//         />
//         <TaskBoard setExp={setExp} />
//       </div>

//       {/* サイドメニュー */}
//       <div className="drawer-side">
//         <label htmlFor="drawer-toggle" className="drawer-overlay"></label>

//         <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4">
//           <li>
//             <a>ホーム</a>
//           </li>
//           <li>
//             <a>アーカイブ</a>
//           </li>
//           <li>
//             <a>設定</a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;
