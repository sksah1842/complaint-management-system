import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";

// User
import UserLogin from "./user/pages/UserLogin";
import Home from "./user/pages/Home";

// Admin
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Complaints from "./admin/pages/Complaints";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* USER */}
          <Route path="/user/login" element={<UserLogin />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRole="ROLE_USER">
                  <Home />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          {/* ADMIN */}
          <Route path="/admin/login" element={<AdminLogin />} />
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


