import LotInfoComponent from "./LotInfoComponent";
import "../styles/LotInfoComponent.scss";
import Pagination from "react-bootstrap/Pagination";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import { useState, useEffect } from "react";

import SearchComponent from "./SearchComponent";
import AsorterComponent from "./AsorterComponent";
import NewLot from "./NewLot";
import Navbar from "./Navbar";
const axios = require("axios");

function LotList() {
  const [records, setRecords] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [CompanyNames, setCompanyNames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentLot, setCurrentLot] = useState({});
  const [ReceivedLotInfo, setReceivedLotInfo] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(3);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records ? records.slice(indexOfFirstRecord, indexOfLastRecord);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/v2/api/lot/", {
        mode: "cors",
      })
      .then((res) => {
        setRecords(res.data);
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

  let pages = [];
  for (
    let number = 1;
    number <= Math.ceil(records.length / recordsPerPage);
    number++
  ) {
    pages.push(
      <Pagination.Item key={number} onClick={() => setCurrentPage(number)}>
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar />

          <div>
            <h4 style={{ textAlign: "center" }}>Lot List</h4>
            <div>
              <SearchComponent PassSearchTerm={receivedSearchTerm} />
            </div>
            <div className="lot-outer-container">
              {currentRecords
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
                    <Link
                      onClick={() => {
                        setCurrentLot(lot);
                        setReceivedLotInfo(true);
                      }}
                      to={`/asorter/${lot._id}`}
                    >
                      <LotInfoComponent lot={lot} />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <Pagination style={{ justifyContent: "center" }}>{pages}</Pagination>
        </Route>
        <Route path="/asorter/:id">
          <Navbar />
          <AsorterComponent currentLot={currentLot} />
        </Route>
        <Route path="/newLot">
          <NewLot />
        </Route>
      </Switch>
    </Router>
  );
}

export default LotList;
