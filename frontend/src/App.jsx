import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainPage from "./pages/Main";
import NotFoundPage from "./pages/NotFound";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/404" element={<NotFoundPage />} /> */}
        {/* <Route path="*" element={<Navigate to="/404" replace />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
