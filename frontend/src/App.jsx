import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainPage from "./pages/Main";
import NotFoundPage from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />

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
