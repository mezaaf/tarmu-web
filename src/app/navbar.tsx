import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex bg-gray-500 gap-5 py-5">
      <h1 className="text-white">Navbar</h1>
      <ul className="flex gap-3">
        <Link href={"/"}>
          <li className="cursor-pointer">Home</li>
        </Link>
        <Link href={"/about"}>
          <li className="cursor-pointer">About</li>
        </Link>
        <Link href={"/about/profile  "}>
          <li className="cursor-pointer">Profile</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
