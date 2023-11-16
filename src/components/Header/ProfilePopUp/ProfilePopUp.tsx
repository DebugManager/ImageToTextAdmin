import { useState, useEffect } from "react";

import { getUser } from "../../../services/locastorage.service";

import styles from "./ProfilePopUp.module.css";
import { Link } from "react-router-dom";

const ProfilePopUp = ({ isOpen, handleProfilePopUp }: { isOpen: boolean, handleProfilePopUp: () => void; }) => {
    const [userId, setUserId] = useState<number | null>(null);

  const [style, setStyle] = useState(styles.profileWrapper);
  useEffect(() => {
    if (isOpen) {
      setStyle(`${styles.profileWrapper} ${styles.profileWrapperOpened}`);
    } else {
      setStyle(styles.profileWrapper);
    }
  }, [isOpen]);


  useEffect(() => {
    const userData = getUser();
    if (userData?.id) {
      setUserId(userData?.id);
    }
  }, []);

  const handleClose = () => {
    setStyle(styles.profileWrapper);
    handleProfilePopUp();
  };

  return (
    <div className={style}>
      <Link
        to={`/profile-setting/${userId}`}
        className={styles.optionStyles}
        onClick={handleClose}
      >
        Profile
      </Link>
      {/* <p className={styles.optionStyles}>Package</p>
      <p className={styles.optionStyles}>Buy Credits / Adds Ons</p>
      <p className={styles.optionStyles}>Feature Request</p>
      <p className={styles.optionStyles}>Affiliates</p>
      <p className={styles.optionStyles}>Guide</p>
      <p className={styles.optionStyles}>Support</p> */}
    </div>
  );
};

export default ProfilePopUp;
