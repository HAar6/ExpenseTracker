// utils/auth.js
export const logout = (clearUser, navigate) => {
  const confirmed = window.confirm("Are you sure you want to logout?");
  if (confirmed) {
    localStorage.removeItem("token");  // Clear token
    clearUser();                       // Clear context
    navigate("/login");                // Redirect to login
  }
};
