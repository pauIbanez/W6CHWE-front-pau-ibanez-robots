import { Navigate, Route, Routes } from "react-router-dom";
import AllRobotsPage from "./pages/AllRobotsPage";
import EditRobotPage from "./pages/EditRobotPage";
import MainPage from "./pages/MainPage";
import NewRobotPage from "./pages/NewRobotPage";
import NotFoundPage from "./pages/NotFoundPage";
import RobotDetailsPage from "./pages/RobotDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />

      <Route path="/home" element={<MainPage />} />
      <Route path="/all" element={<AllRobotsPage />} />

      <Route path="/robot">
        <Route path="new" element={<NewRobotPage />} />
        <Route path="edit/:id" element={<EditRobotPage />} />
        <Route path=":id" element={<RobotDetailsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
