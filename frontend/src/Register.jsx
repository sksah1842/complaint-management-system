import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", {
        username,
        password,
      });
      setSuccess("Account created! You can now log in.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to register. Try a different username.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page app-gradient-bg">
      <div className="auth-shell fade-in-up">
        <div className="row g-0">
          <div className="col-md-6 p-4 p-md-5 auth-shell__left d-flex flex-column justify-content-between">
            <div>
              <div className="auth-shell__badge mb-3">
                <span className="auth-shell__badge-dot" />
                <span>Create your account</span>
              </div>

              <h1 className="auth-shell__title mb-3">
                Join the complaint
                <br />
                management portal.
              </h1>

              <p className="auth-shell__subtitle mb-4">
                Register once to securely submit and track your complaints from
                any device.
              </p>
            </div>
          </div>

          <div className="col-md-6 p-4 p-md-5 auth-shell__form">
            <h2 className="text-white mb-3">Create an account</h2>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div className="auth-shell__field">
                <label className="form-label">Username</label>
                <input
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Choose a unique username"
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
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                />
              </div>

              <div className="auth-shell__field">
                <label className="form-label">Confirm password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                />
              </div>

              {error && (
                <p className="text-danger auth-shell__error mb-0">{error}</p>
              )}

              {success && (
                <p className="text-success auth-shell__error mb-0">
                  {success}
                </p>
              )}

              <button
                type="submit"
                className="btn-gradient-primary mt-2"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Register"}
                <span aria-hidden="true">✓</span>
              </button>

              <button
                type="button"
                className="btn btn-link text-secondary mt-1 p-0"
                onClick={() => navigate("/login")}
              >
                Already have an account? Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

