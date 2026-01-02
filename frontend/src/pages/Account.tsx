import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("user");

    if (!raw) {
      navigate("/login");
      return;
    }

    // User exists → send to main page
    navigate("/");
  }, [navigate]);

  return null; // no UI needed
}
