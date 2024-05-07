import React, { useState } from "react";
import Footer from "../components/Footer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { SyncLoadingScreen } from "../components/UI/LoadingScreen.jsx";
import { Outlet } from "react-router-dom";
import {
  LoadingStateProvider,
  useStateContext,
} from "../contexts/LoadingStateContext";
const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(
    window.matchMedia("(min-width: 890px)").matches
  );
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  // const { loading, setLoading } = useStateContext();

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar
        collapseSetter={{ isCollapsed, setIsCollapsed }}
        hoverSetter={{ isHovered, setIsHovered }}
        largeScreenSetter={{ isLargeScreen, setIsLargeScreen }}
      />
      {/* Content of page + Footer */}
      <div
        className="flex-auto flex flex-col justify-between p-4 shadow-lg bg-gray-50 h-screen overflow-y-auto transition-all duration-300 ease-in-out"
        style={{
          marginLeft: isLargeScreen
            ? isCollapsed && !isHovered
              ? "60px"
              : "250px"
            : "60px",
        }}
      >
        {loading ? (
          <SyncLoadingScreen />
        ) : (
          <>
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, { loading:true, setLoading });
            })}
            <Footer />
          </>
          // <>
          //   children({loading})  
          // </>
        )}
      </div>
    </div>
  );
};

export default Layout;
