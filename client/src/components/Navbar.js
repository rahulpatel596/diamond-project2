import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div className="navbar-container">
      <nav>
        <ul
          className="nav-ul"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <li className="nav-link" style={{ fontWeight: "bold" }}>
            <Link to="/" exact>
              Home
            </Link>
          </li>
          <li className="nav-link">
            <Link to="/addLot" exact>
              Add new Lot
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
