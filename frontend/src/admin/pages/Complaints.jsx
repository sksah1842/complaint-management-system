import { useEffect, useState } from "react";
import api from "../../services/api";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all complaints (ADMIN API)
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/complaints");
      setComplaints(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  // Update complaint status
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/complaints/${id}/status`, {
        status,
      });
      fetchComplaints(); // refresh list
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  if (loading) {
    return <p>Loading complaints...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="fade-in-up">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h3 className="mb-0">Complaints</h3>
          <small className="text-muted">
            Review, prioritise, and update complaint statuses in real time.
          </small>
        </div>
      </div>

      {complaints.length === 0 ? (
        <div className="alert alert-info mt-3">
          No complaints found. You&apos;ll see new records here as users submit
          them.
        </div>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col" style={{ width: "35%" }}>
                  Description
                </th>
                <th scope="col">Status</th>
                <th scope="col">Update Status</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td className="text-muted">#{complaint.id}</td>
                  <td>{complaint.title}</td>
                  <td style={{ fontSize: "0.9rem" }}>{complaint.description}</td>
                  <td>
                    <span
                      className={`badge ${
                        complaint.status === "OPEN"
                          ? "bg-warning text-dark"
                          : complaint.status === "IN_PROGRESS"
                          ? "bg-info text-dark"
                          : "bg-success"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={complaint.status}
                      onChange={(e) =>
                        updateStatus(complaint.id, e.target.value)
                      }
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="RESOLVED">RESOLVED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Complaints;
