import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";

// Pages
import Login from "./Login";
import Register from "./Register";
import Home from "./user/pages/Home";

// Admin
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Complaints from "./admin/pages/Complaints";

const RoleRedirect = () => {
  const { role } = useAuth();

  if (role === "ROLE_ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  // Default to user complaint form
  return <Home />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* LOGIN / REGISTER */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ROOT - redirects based on role */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RoleRedirect />
              </ProtectedRoute>
            }
          />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRole="ROLE_ADMIN">
                  <AdminLayout />
                </RoleRoute>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="complaints" element={<Complaints />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


