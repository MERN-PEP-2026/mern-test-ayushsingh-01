import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/register" element={!token ? <Register /> : <Navigate to="/dashboard" replace />} />
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" replace />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
}
