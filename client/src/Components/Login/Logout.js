function Logout() {
  localStorage.clear();
  localStorage.removeItem("Role");
  localStorage.removeItem("authId");
}
export default Logout;
