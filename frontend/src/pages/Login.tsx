import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const GOOGLE_CLIENT_ID =
  "661648786120-q3tunbi37v0b27ui0ii0rgam6c2rk9am.apps.googleusercontent.com";

const API_BASE = "http://localhost:9005";

declare global {
  interface Window {
    google: any;
  }
}

export default function Login() {
  const navigate = useNavigate();
  const btnRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    // Wait until the Google script is available
    if (!window.google?.accounts?.id) {
      const t = setTimeout(
        () => setError("Google script not loaded yet. Refresh the page."),
        1200
      );
      return () => clearTimeout(t);
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response: any) => {
        try {
          const res = await fetch(`${API_BASE}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: response.credential }),
          });

          if (!res.ok) {
            const txt = await res.text();
            throw new Error(txt || `Login failed (${res.status})`);
          }

          // ✅ Read backend response and save user so you stay logged in
          const data = await res.json(); // expects { ok: true, user: {...} }
          localStorage.setItem("user", JSON.stringify(data));

          // ✅ Go to account page after login
          navigate("/");
        } catch (e: any) {
          setError(e?.message || "Login failed");
        }
      },
    });

    // Render the button
    if (btnRef.current) {
      btnRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(btnRef.current, {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
      });
    }
  }, [navigate]);

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: 28, marginBottom: 6 }}>Login</h1>
        <p style={{ opacity: 0.8, marginBottom: 16 }}>
          Sign in with Google to continue
        </p>

        <div ref={btnRef} />

        {error && (
          <p style={{ marginTop: 14, color: "tomato", maxWidth: 420 }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
