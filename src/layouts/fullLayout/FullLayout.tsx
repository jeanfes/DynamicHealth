import { Outlet } from "react-router-dom";
import "./fullLayout.scss";

const FullLayout = () => {
  return (
    <div className="fullLayout">
      <div className="leftFullLayout"></div>
      <div className="rightAuthLayout">
        <Outlet />
      </div>
    </div>
  );
};

export default FullLayout;
