import { GridLoader, HashLoader , SyncLoader} from "react-spinners"
import Toaster from "../../components/UI/Toaster";
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
          <p className="syncLoadingText" style={{ color: messageColor }}>{message || "Loading..."}</p> 
      </div>
  </>
)
}

const SyncLoadingScreen = ({ message, loaderColor, messageColor }) => {
  return (
  <>
      <div className="syncLoadingContainer">
            <SyncLoader
                color={loaderColor || "#000"}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="loader py-20"
                size={25}
            />
            <p className="syncLoadingText" style={{ color: messageColor }}>{message || "Loading..."}</p> 
      </div>
  </>
)
}

export { GridLoadingScreen, HashLoadingScreen , SyncLoadingScreen};