import LotInfoComponent from "./LotInfoComponent";
import "../styles/LotInfoComponent.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent";
import AsorterComponent from "./AsorterComponent";
const axios = require("axios");

function LotList() {
  const [records, setRecords] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [CompanyNames, setCompanyNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/v2/api/records/", {
        mode: "cors",
      })
      .then((res) => {
        setRecords(res.data);
        console.log(res.data);
        {
          res.data.map((lot) => {
            setCompanyNames([...CompanyNames, lot.CompanyName]);
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setHasError(true);
        setLoading(false);
      });
  }, []);

  const receivedSearchTerm = (dataFromChild) => {
    setSearchTerm(dataFromChild);
    console.log(dataFromChild);
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <span>Set up router first</span>
          <span>
            Work on Asorter component and then setup API routes for asorter/id
          </span>
          <div>
            <h4 style={{ textAlign: "center" }}>Lot List</h4>
            <div>
              <SearchComponent PassSearchTerm={receivedSearchTerm} />
            </div>
            <div className="lot-outer-container">
              {records
                .filter((lot) => {
                  return (
                    lot.CompanyName.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    ) ||
                    lot.LotNumber.toLowerCase().includes(
                      searchTerm.toLowerCase()
                    )
                  );
                })
                .map((lot) => (
                  <div>
                    <LotInfoComponent lot={lot} />
                  </div>
                ))}
            </div>
          </div>
        </Route>
        <Route
          path="/asorter/:id"
          render={(props) => {
            return <AsorterComponent />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default LotList;
