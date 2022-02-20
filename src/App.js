import { Navigate, Route, Routes } from "react-router-dom";
import AllRobotsPage from "./pages/AllRobotsPage";
import MainPage from "./pages/MainPage";
import NewRobotPage from "./pages/NewRobotPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/home" element={<MainPage />} />
      <Route path="/all" element={<AllRobotsPage />} />
      <Route path="/robot/new" element={<NewRobotPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
