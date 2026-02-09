import { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await api.post("/auth/login", { username, password });
    login(res.data.token, res.data.role);
    navigate("/");
  };

  return (
    <div className="container col-md-4 mt-5">
      <h3>User Login</h3>
      <input className="form-control mb-2" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default UserLogin;
