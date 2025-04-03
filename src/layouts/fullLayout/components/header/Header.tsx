import LogoDynamicHealth from "@/assets/images/logoDynamicHealth.png";
import { useClickOutside } from "@/hooks/useClickOutside";
import { IconSignOut } from "@/assets/icons/IconSignOut";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./header.scss";

export const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [openMenu, setOpenMenu] = useState(false);
  const { ref, triggerRef } = useClickOutside(() => setOpenMenu(false));

  const handleMenuToggle = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <div className="headerFullLayout">
      <div className="headerLeft" onClick={() => navigate("/home")}>
        <img src={LogoDynamicHealth} alt="IconHealth" className="headerLogo" />
        <div className="menuHeader" onClick={() => navigate("/home")}>
          <p className="menuHeaderItem">Inicio</p>
        </div>
      </div>
      <div className="headerRight">
        <button ref={triggerRef} className="buttonMenuProfile" onClick={handleMenuToggle}>
          <p className="headerUserName">
            {user?.profile.name[0]} {user?.profile.last_name[0]}
          </p>
        </button>
        {openMenu && (
          <div ref={ref} className="menuProfile">
            <div className="menuProfileItem">
              <button onClick={logout}>
                <IconSignOut />
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
