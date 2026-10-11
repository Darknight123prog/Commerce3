import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // adjust the path to your project

const AuthSuccess = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    navigate(user ? "/" : "/login", { replace: true });
  }, [user, loading, navigate]);

  return <p>Signing you in...</p>;
};

export default AuthSuccess;