// import { useEffect, useState } from "react";
// import PaySkulDashboard from "./pages/third";
// import Login from "./components/Login";
// import { BrowserRouter } from "react-router-dom";

// function App() {
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("accessToken");
//     if (storedToken) {
//       // verify token validity before using it
//       validateToken(storedToken);
//     } else {
//       setLoading(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const validateToken = async (accessToken) => {
//     try {
//       const response = await fetch(
//         "https://payskul-api.up.railway.app/core/creditworthy-applicants/",
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       if (response.status === 401) {
//         // Clear invalid token
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         setToken(null);
//       } else {
//         setToken(accessToken);
//       }
//     } catch (error) {
//       console.error("Token validation failed:", error);
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = (accessToken) => {
//     setToken(accessToken);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     setToken(null);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <p className="text-gray-600 font-medium">Checking authentication...</p>
//       </div>
//     );
//   }

//   return (
//     <BrowserRouter>
//       {token ? (
//         <PaySkulDashboard onLogout={handleLogout} />
//       ) : (
//         <Login onLogin={handleLogin} />
//       )}
//     </BrowserRouter>
//   );
// }

// export default App;




import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PaySkulDashboard from "./pages/third";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
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

  return (
    <BrowserRouter>
      <Routes>
        {/* If not logged in, redirect to /login */}
        <Route
          path="/"
          element={
            token ? (
              <PaySkulDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        {/* Catch-all: redirect unknown routes to / */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
