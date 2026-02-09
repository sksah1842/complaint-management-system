import { useEffect, useState } from "react";
import api from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dashboard statistics
  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/complaints");

      const complaints = res.data;

      const total = complaints.length;
      const open = complaints.filter(c => c.status === "OPEN").length;
      const inProgress = complaints.filter(c => c.status === "IN_PROGRESS").length;
      const resolved = complaints.filter(c => c.status === "RESOLVED").length;

      setStats({ total, open, inProgress, resolved });
      setError("");
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  const resolutionRate =
    stats.total === 0
      ? "0%"
      : `${Math.round((stats.resolved / stats.total) * 100)}%`;

  const pending = stats.open + stats.inProgress;

  return (
    <div className="fade-in-up">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-0">Admin Dashboard</h3>
          <small className="text-muted">
            High-level overview of complaint volume and progress.
          </small>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6 className="text-muted text-uppercase mb-1">
              Total complaints
            </h6>
            <h2>{stats.total}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6 className="text-warning text-uppercase mb-1">Open</h6>
            <h2>{stats.open}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6 className="text-info text-uppercase mb-1">In Progress</h6>
            <h2>{stats.inProgress}</h2>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm p-3 text-center">
            <h6 className="text-success text-uppercase mb-1">Resolved</h6>
            <h2>{stats.resolved}</h2>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5 className="mb-2">Quick insights</h5>
            <ul className="mb-0" style={{ fontSize: "0.9rem" }}>
              <li>
                Resolution rate:{" "}
                <strong>
                  {resolutionRate}
                </strong>
              </li>
              <li>
                Pending complaints:{" "}
                <strong>
                  {pending}
                </strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
