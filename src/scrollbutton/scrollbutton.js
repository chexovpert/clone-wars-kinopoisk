import React, {useState} from 'react';
import "./scrollbutton.css"

 const TopButton = (props) => {
    const [showScroll, setShowScroll] = useState(false);
    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400){
          setShowScroll(true)
        } else if (showScroll && window.pageYOffset <= 400){
          setShowScroll(false)
        }
      };
      const topFunction = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          
      };
      window.addEventListener('scroll', checkScrollTop)
    return(
    <button onClick={topFunction} id="scrollTop" title="Перейти к началу" style = {{display: showScroll ? "block" : "none" }}>Top</button>
    )}
//   window.onscroll = function() {scrollFunction()};

//   function scrollFunction() {
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//       mybutton.style.display = "block";
//     } else {
//       mybutton.style.display = "none";
//     }
//   }
export default TopButton