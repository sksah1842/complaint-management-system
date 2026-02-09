import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="d-flex admin-shell">
      {/* SIDEBAR */}
      <aside className="admin-shell__sidebar p-3 d-flex flex-column">
        <div className="mb-4">
          <div className="admin-shell__brand mb-1">Admin Console</div>
          <small className="text-secondary">Complaint Management System</small>
        </div>

        <nav className="flex-grow-1">
          <ul className="nav flex-column gap-2">
            <li className="nav-item">
              <Link
                className={`admin-shell__nav-link ${
                  location.pathname === "/admin" ? "admin-shell__nav-link--active" : ""
                }`}
                to="/admin"
              >
                <span className="icon" aria-hidden="true">
                  📊
                </span>
                <span>Dashboard</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`admin-shell__nav-link ${
                  location.pathname.startsWith("/admin/complaints")
                    ? "admin-shell__nav-link--active"
                    : ""
                }`}
                to="/admin/complaints"
              >
                <span className="icon" aria-hidden="true">
                  📂
                </span>
                <span>Complaints</span>
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className="btn btn-outline-light btn-sm mt-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* TOPBAR */}
        <nav className="navbar admin-shell__topbar px-4 d-flex justify-content-between align-items-center">
          <div>
            <span className="navbar-brand mb-0 h5 text-white">
              Complaint Management
            </span>
            <span className="badge bg-success-subtle text-success ms-2 badge-pill-soft">
              Live
            </span>
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="admin-shell__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
