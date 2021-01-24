import { useState } from "react";
import "../styles/SearchContainer.scss";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

function SearchComponent(props) {
  const [searchTerm, updateSearchTerm] = useState("");

  const handleChange = (e) => {
    updateSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.PassSearchTerm(searchTerm);
  };
  return (
    <div className="lot-search-container">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="lot-search-input"
          placeholder="Search"
          onFocus="this.placeholder = ''"
        ></input>
        <button className="lot-search-button" type="submit">
          &#xF002;
        </button>
      </form>
    </div>
  );
}

export default SearchComponent;
