import React from "react";
import styles from "./navbar.module.css";
import logo from "../../assets/images/image.png";
import logoutIcon from "../../assets/images/logoutIcon.svg";

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navbar}>
        <img src={logo} alt="" style={{ width: "70px", height: "70px" }} />
        <button className={styles.logoutButton} onClick={onLogout}>
          <img
            src={logoutIcon}
            alt="logoutIcon"
            style={{ marginRight: "10px", marginLeft: "30px" }}
          />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
