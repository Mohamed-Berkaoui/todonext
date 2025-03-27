"use client";

import { useAuth } from "../(context)/UserContext"; 
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Navbar() {
  const { logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout(); 
    router.push("/login"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => router.push("/")}>
        TodoApp
      </div>

      <div
        className="navbar-avatar-container"
        onMouseEnter={() => setDropdownOpen(true)}
        onMouseLeave={() => setDropdownOpen(false)}
      >
        <img
          src="/avatar.png"
          alt="User Avatar"
          className="navbar-avatar"
        />
        {dropdownOpen && (
          <div className="navbar-dropdown">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
