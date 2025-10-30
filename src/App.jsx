import { useEffect, useState } from "react";
import PaySkulDashboard from "./pages/third";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      // verify token validity before using it
      validateToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (accessToken) => {
    try {
      const response = await fetch(
        "https://payskul-api.up.railway.app/core/creditworthy-applicants/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      // If unauthorized, clear invalid token
      if (response.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setToken(null);
      } else {
        setToken(accessToken);
      }
    } catch (error) {
      console.error("Token validation failed:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (accessToken) => {
    setToken(accessToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 font-medium">Checking authentication...</p>
      </div>
    );
  }

  return token ? (
    <PaySkulDashboard onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}

export default App;
