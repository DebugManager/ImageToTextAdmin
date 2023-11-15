import { useState } from "react";

import NotificationPopUp from "./NotificationPopUp/NotificationPopUp";
import ProfilePopUp from "./ProfilePopUp/ProfilePopUp";

import styles from "./Header.module.css";

import moon from "../../assets/header/moon.svg";
import flag from "../../assets/header/flag.png";
import arrow from "../../assets/header/arrow.svg";
import bell from "../../assets/header/bell.svg";
import { NotificationModal } from "./NotificationModal/NotificationModal";

const Header = () => {
  const isNotification = true;
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [openPorfile, setOpenProfile] = useState<boolean>(false);
  const [openNotificationModal, setOpenNotificationModal] =
    useState<boolean>(false);

  const handleProfilePopUp = () => {
    setOpenProfile(!openPorfile);
  };

  const handleOpenNotification = () => {
    setOpenNotification(!openNotification);
  };

  const handleCloseModal = () => {
    setOpenNotificationModal(false);
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>SKOTE</p>
      <div className={styles.dataWrapper}>
        <div className={styles.moonWrapper}>
          <img src={moon} alt="moon" className={styles.moonImage} />
        </div>

        <div className={styles.flagWrapper}>
          <img src={flag} alt="moon" className={styles.flagImage} />

          <img src={arrow} alt="moon" className={styles.arrowImage} />
        </div>

        {/* <div className={styles.bellWrapper}>
          <img
            src={bell}
            alt="moon"
            className={styles.bellImage}
            onClick={handleOpenNotification}
          />
          {isNotification && <div className={styles.notification} />}
          <NotificationPopUp isOpen={openNotification} />
        </div> */}

        <>
          <div className={styles.userData} onClick={handleProfilePopUp}>
            <p className={styles.userName}>henry</p>
            <img src={arrow} alt="moon" className={styles.arrowImage} />
          </div>
          <ProfilePopUp isOpen={openPorfile} />
        </>

        <button
          className={styles.notificationBtn}
          onClick={() => setOpenNotificationModal(true)}
        >
          Create notification
        </button>
      </div>

      <NotificationModal
        isOpen={openNotificationModal}
        handleClose={handleCloseModal}
      />
    </div>
  );
};

export default Header;
