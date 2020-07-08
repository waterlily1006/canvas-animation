export default function px2rem() {
  let preFontSize;
  /*竖屏*/
  //if (window.orientation == 180 || window.orientation == 0) {
  let rootHtml = document.documentElement,
    deviceWidth = rootHtml.clientWidth;
  rootHtml.style.fontSize = deviceWidth / (750 / 100) + "px";
  preFontSize = deviceWidth / (750 / 100) + "px";
  sessionStorage.setItem("preFontSize", preFontSize);
  //}
  /*横屏*/
  // if (window.orientation == 90 || window.orientation == -90) {
  //     document.documentElement.style.fontSize = sessionStorage.getItem(
  //         "preFontSize"
  //     );
  //     return true;
  // }
}
