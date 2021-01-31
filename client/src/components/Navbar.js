import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";

function Navbar(props) {
  return (
    <div className="navbar-container">
      <nav>
        <ul className="nav-ul">
          <li className="nav-link">
            <Link to="/" exact>
              Home
            </Link>
          </li>
          <li className="nav-link nav-add-button">
            <button>
              <Link to="/newLot" exact>
                Add new Lot
              </Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
