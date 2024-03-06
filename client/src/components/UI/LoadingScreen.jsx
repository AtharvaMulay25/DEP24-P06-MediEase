import { GridLoader, HashLoader } from "react-spinners"

import "../../styles/UI/LoadingScreen.css";

//export two loading screens `GridLoadingScreen` and `HashLoadingScreen`

const GridLoadingScreen = ({ message, loaderColor, messageColor }) => {
    return (
    <>
        <div className="gridLoadingContainer">
            <GridLoader
                color={loaderColor || "#000"}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="loader"
                size={20}
            />
            <p className="gridLoadingText" style={{ color: messageColor }}>{message || "Loading..."}</p> 
        </div>
    </>
  )
}

const HashLoadingScreen = ({ message, loaderColor, messageColor }) => {
  return (
  <>
      <div className="gridLoadingContainer">
            <HashLoader
                color={loaderColor || "#000"}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="loader"
                size={60}
            />
          <p className="hashLoadingText" style={{ color: messageColor }}>{message || "Loading..."}</p> 
      </div>
  </>
)
}

export { GridLoadingScreen, HashLoadingScreen };