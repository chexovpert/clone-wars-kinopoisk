import "./popup.css";
import React from "react";

// export default (props) => (
//   <div className="popup-wrap">
//     <p id="popup-rating">{props.rating}</p>
//     <img className="popup-poster" src={props.posterUrl}></img>
//     <div className="popup-info">
//       <h1>{props.nameRu}</h1>
//       <p id="popup-extra">
//         {props.year} {props.nameEn}
//       </p>
//       <p id="popup-status">{props.status}</p>
//       <div className="staff">
//         <p>{props.staff}</p>
//         <p>{props.films}</p>
//       </div>
//     </div>
//   </div>
// );

class Popup extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  // showPopup(event) {
  //   console.log(event.pageX, event.pageY);
  //   const popup = document.querySelector(".popup-wrap");
  //   popup.style.display = "block";
  // }

  render() {
    console.log(this.props);
    return (
      <div className="popup-wrap">
        {/* <p id="popup-rating">{props.rating}</p>
        <img className="popup-poster" src={props.posterUrl}></img>
        <div className="popup-info">
          <h1>{props.nameRu}</h1>
          <p id="popup-extra">
            {props.year} {props.nameEn}
          </p>
          <p id="popup-status">{props.status}</p>
          <div className="staff">
            <p>{props.staff}</p>
            <p>{props.films}</p>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Popup;
