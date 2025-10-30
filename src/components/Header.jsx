
// const Header = () => {
//   const handleLogout = () => {
//     console.log("User logged out");
//   };

//   return (
//     <header className="flex justify-between items-center bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 shadow-md">
//       {/* Company Name */}
//       <h1 className="text-xl font-semibold">MyCompany</h1>

//       {/* Right Section */}
//       <div className="flex items-center gap-4">
//         <span className="text-sm md:text-base">Welcome, Eniola</span>
//         <button
//           onClick={handleLogout}
//           className="bg-white text-gray-900 hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-md text-sm font-medium"
//         >
//           Log Out
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;


import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Optionally show feedback
    console.log("User logged out");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 shadow-md">
      {/* Company Name */}
      <h1 className="text-xl font-semibold">MyCompany</h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <span className="text-sm md:text-base">Welcome, Eniola</span>
        <button
          onClick={handleLogout}
          className="bg-white text-gray-900 hover:bg-gray-100 transition-colors px-4 py-1.5 rounded-md text-sm font-medium"
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;

