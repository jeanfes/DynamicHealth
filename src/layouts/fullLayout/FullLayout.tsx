import { Header } from "./components/header/Header";
import { Outlet } from "react-router-dom";
import "./fullLayout.scss";

const FullLayout = () => {

  return (
    <div className="fullLayout">
      <Header />
      <div className="fullLayoutChildren">
        <Outlet />
      </div>
    </div>
  );
};

export default FullLayout;
