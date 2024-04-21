import { FcMenu } from "react-icons/fc";
import { navLinks } from "./utils/index.js";
import { useState } from "react";
import './style/NavBar.css'

const NavBar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <div className="navbar-container mb-5 md:mb-10 bg-primary">
      <div className="container px-5 md:px-10 mx-auto relative font-poppins flex items-center justify-between py-8">
        <div>
          <h2 className="text-2xl">NavigateUCSD</h2>
        </div>

        <div>
          <ul className={`nav-menu ${menu ? "flex" : "hidden"}`}>
            {navLinks.map((item) => (
              <li key={item.id} className="nav-item">
                <a href={`#${item.id}`} className="nav-link">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;