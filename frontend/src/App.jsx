import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainPage from "./pages/Main";
import NotFoundPage from "./pages/NotFound";
import Login from "./pages/Login.jsx";
import { Provider } from 'react-redux'
import { store } from './app/store'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
