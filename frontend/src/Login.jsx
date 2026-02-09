import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import api from "./services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        username,
        password,
      });

      const { token, role } = res.data;
      login(token, role);

      if (role === "ROLE_ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Invalid username or password";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page app-gradient-bg">
      <div className="auth-shell fade-in-up">
        <div className="row g-0">
          {/* LEFT PANEL */}
          <div className="col-md-6 p-4 p-md-5 auth-shell__left d-flex flex-column justify-content-between">
            <div>
              <div className="auth-shell__badge mb-3">
                <span className="auth-shell__badge-dot" />
                <span>Realtime Complaint Tracking</span>
              </div>

              <h1 className="auth-shell__title mb-3">
                Complaint Management,
                <br />
                made simple.
              </h1>

              <p className="auth-shell__subtitle mb-4">
                Log in as a citizen to raise issues in seconds, or as an
                administrator to track, prioritise, and resolve what matters
                most.
              </p>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <span className="auth-shell__pill">
                <strong>Users</strong> – Submit & track complaints
              </span>
              <span className="auth-shell__pill">
                <strong>Admins</strong> – Monitor & resolve at scale
              </span>
            </div>
          </div>

          {/* RIGHT PANEL – FORM */}
          <div className="col-md-6 p-4 p-md-5 auth-shell__form">
            <h2 className="text-white mb-3">Welcome back</h2>
            <p className="text-secondary mb-4" style={{ fontSize: "0.9rem" }}>
              Use the same credentials for both the web and mobile interfaces.
            </p>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div className="auth-shell__field">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin or citizen01"
                  autoComplete="username"
                />
              </div>

              <div className="auth-shell__field">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <p className="text-danger auth-shell__error mb-0">{error}</p>
              )}

              <button
                type="submit"
                className="btn-gradient-primary mt-2"
                disabled={loading}
              >
                {loading ? "Signing you in..." : "Login to dashboard"}
                <span aria-hidden="true">→</span>
              </button>

              <div className="d-flex justify-content-between align-items-center mt-2">
                <p
                  className="text-secondary mb-0"
                  style={{ fontSize: "0.8rem" }}
                >
                  Tip: use your assigned role credentials to experience both
                  user and admin journeys.
                </p>

                <button
                  type="button"
                  className="btn btn-link text-decoration-none text-secondary p-0"
                  style={{ fontSize: "0.85rem" }}
                  onClick={() => navigate("/register")}
                >
                  New here? Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

