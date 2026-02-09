import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../auth/AuthContext";

const Home = () => {
  const { logout } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const [myComplaints, setMyComplaints] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState("");

  const loadMyComplaints = async () => {
    try {
      setListLoading(true);
      const res = await api.get("/user/complaints");
      setMyComplaints(res.data);
      setListError("");
    } catch (err) {
      const message =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to load your complaints";
      setListError(message);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    loadMyComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitComplaint = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccessMsg("");

      const res = await api.post("/user/complaints", {
        title,
        description,
      });

      setSuccessMsg(
        `Complaint submitted successfully! Your Complaint ID is ${res.data.id}`
      );

      setTitle("");
      setDescription("");

      // Refresh list after creating a new complaint
      loadMyComplaints();
    } catch (err) {
      setError("Failed to submit complaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-page" style={{ alignItems: "flex-start" }}>
      <div className="container-fluid">
        {/* TOP BAR */}
        <div className="user-home__header mb-4">
          <div>
            <div className="user-home__badge mb-1">Citizen workspace</div>
            <h1 className="user-home__title">Submit a new complaint</h1>
            <p className="user-home__subtitle mb-0">
              Share your issue with the administration in just a few lines. You
              will receive a unique tracking ID instantly.
            </p>
          </div>

          <button
            onClick={logout}
            className="btn btn-outline-danger btn-sm"
          >
            Logout
          </button>
        </div>

        <div className="row g-4">
          {/* FORM CARD */}
          <div className="col-lg-7">
            <form
              onSubmit={submitComplaint}
              className="card user-home__card p-4 fade-in-up"
            >
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  placeholder="Short summary of the issue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Describe what happened, where, and when."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {error && <p className="text-danger mb-2">{error}</p>}
              {successMsg && (
                <div className="alert alert-success py-2 mb-3">
                  {successMsg}
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  Please avoid sharing sensitive personal data unless required.
                </small>

                <button
                  type="submit"
                  className="btn-gradient-primary"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit complaint"}
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </form>
          </div>

          {/* SIDE INFO / HINTS */}
          <div className="col-lg-5">
            <div className="user-home__info p-3 p-md-4 fade-in-up">
              <h5 className="mb-2">How it works</h5>
              <ol className="mb-3 ps-3" style={{ fontSize: "0.9rem" }}>
                <li>Describe your complaint and submit the form.</li>
                <li>
                  Note the <strong>Complaint ID</strong> shown in the success
                  message.
                </li>
                <li>
                  Administrators review, update status, and take action on your
                  request.
                </li>
              </ol>

              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary-subtle text-primary border badge-pill-soft">
                  Realtime status updates
                </span>
                <span className="badge bg-success-subtle text-success border badge-pill-soft">
                  Secure & authenticated
                </span>
              </div>
            </div>

            <div className="card user-home__card mt-4 p-3 p-md-4 fade-in-up">
              <h5 className="mb-2">Your complaints</h5>
              {listLoading ? (
                <p className="text-muted mb-0">Loading your complaints...</p>
              ) : listError ? (
                <p className="text-danger mb-0">{listError}</p>
              ) : myComplaints.length === 0 ? (
                <p className="text-muted mb-0">
                  You haven&apos;t submitted any complaints yet.
                </p>
              ) : (
                <div className="table-responsive mt-2">
                  <table className="table table-sm align-middle mb-0">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myComplaints.map((c) => (
                        <tr key={c.id}>
                          <td className="text-muted">#{c.id}</td>
                          <td style={{ fontSize: "0.9rem" }}>{c.title}</td>
                          <td>
                            <span
                              className={`badge ${
                                c.status === "OPEN"
                                  ? "bg-warning text-dark"
                                  : c.status === "IN_PROGRESS"
                                  ? "bg-info text-dark"
                                  : "bg-success"
                              }`}
                            >
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
