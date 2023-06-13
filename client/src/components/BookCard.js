import StarIcon from "./svg/StarIcon";
import {genContent} from "../globals";
import "../css/bootstrap.min.css"

function BookCard() {
  return (
    <div className="col" style={{width: "400px", height: "500px", marginBottom: "100px"}} >
      <div className="card shadow-sm">
        <div className="img-wrapper">
          <img src="" style={{width: "380px", height:"500px"}} alt="Book cover" className="cover"></img>
        </div>

        <div className="card-body">
          <p className="card-text"></p>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              {genContent(5, <StarIcon />)}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
