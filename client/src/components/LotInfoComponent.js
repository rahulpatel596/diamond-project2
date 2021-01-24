import "../styles/LotInfoComponent.scss";

function LotInfoComponent(props) {
  return (
    <div>
      <div className="lot-info-container">
        <div className="lot-info-left">
          <span className="lot-info-lotNumber">{props.lot.LotNumber}</span>
          <span className="lot-info-companyName">{props.lot.CompanyName}</span>

          <span className="lot-info-additionalDetails">
            {props.lot.AdditionalDetails}
          </span>
        </div>
        <div className="lot-info-right">
          <span className="lot-info-totalCarat">{props.lot.TotalCarat}</span>
        </div>

        {/* <span>{props.lot.DateReceived}</span> */}
        {/* <span>{props.lot.DateGiven}</span> */}
      </div>
    </div>
  );
}

export default LotInfoComponent;
