import React, { useCallback, useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { CreatePagesEnums } from "../../enums/CreatePagesEnums";

import EmailEditor from "../../components/EmailEditor/EmailEditor";

import styles from "./CreatePages.module.css";

import arrow from "../../assets/header/arrow.svg";

const CreatePages: React.FC = () => {
  const [sendMessage, setSendMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [subject, setSubject] = useState<string | null>(null);
  const [typeOfPage, setTypeOfPage] = useState<CreatePagesEnums>(
    CreatePagesEnums.Home
  );

  const handleStopLoading = () => {
    setIsLoading(false);
  };

  const handleSendMessage = () => {
    setSendMessage(true);
    setIsLoading(true);
  };

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const checkEmailName = (email: string): string => {
    switch (email) {
      case CreatePagesEnums.Home:
        return "Home";
      case CreatePagesEnums.Search:
        return "Search";
      case CreatePagesEnums.Engage:
        return "Engage";
      case CreatePagesEnums.FAQ:
        return "FAQ";
      case CreatePagesEnums.Enrich:
        return "Enrich";
      case CreatePagesEnums.Opportunities:
        return "Opportunities";
      case CreatePagesEnums.Settings:
        return "Settings";
      default:
        return email;
    }
  };

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [typeOfPage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnWrapper}>
        <div className={styles.filterWrapper}>
          <p className={styles.option}>View Pages Types</p>
          <div className={styles.filter} onClick={toggleDropdown}>
            <p>{checkEmailName(typeOfPage)}</p>
            <img alt="arrow" src={arrow} className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.optionWrapper}>
              <div
                onClick={() => setTypeOfPage(CreatePagesEnums.Home)}
                className={styles.optionFilter}
              >
                Home
              </div>
              <div
                onClick={() => setTypeOfPage(CreatePagesEnums.Search)}
                className={styles.optionFilter}
              >
                Search
              </div>
              <div
                onClick={() => setTypeOfPage(CreatePagesEnums.Engage)}
                className={styles.optionFilter}
              >
                Engage
              </div>
              <div
                onClick={() => setTypeOfPage(CreatePagesEnums.FAQ)}
                className={styles.optionFilter}
              >
                FAQ
              </div>
              <div
                onClick={() => setTypeOfPage(CreatePagesEnums.Enrich)}
                className={styles.optionFilter}
              >
                Enrich
              </div>
              <div
                onClick={() => setTypeOfPage(CreatePagesEnums.Opportunities)}
                className={styles.optionFilter}
              >
                Opportunities
              </div>
              <div
                onClick={() => setTypeOfPage(CreatePagesEnums.Settings)}
                className={styles.optionFilter}
              >
                Settings
              </div>
            </div>
          )}
        </div>

        <div className={styles.inputWrapper}>
          <label className={styles.label} htmlFor="subject">
            Subject
          </label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter Subject"
            required
          />
          {!subject?.length && subject !== null && (
            <span className={styles.error}>Subject can not be empty</span>
          )}
        </div>

        <button onClick={handleSendMessage} className={styles.button}>
          {isLoading ? (
            <CircleLoader loading={isLoading} color={"#FFF"} size={10} />
          ) : (
            "Send"
          )}
        </button>
      </div>
      <div className={styles.editorWrapper}>
        <EmailEditor
          isPages={true}
          subject={subject}
          typeOfPage={typeOfPage}
          sendMessage={sendMessage}
          handleStopLoading={handleStopLoading}
        />
      </div>
    </div>
  );
};

export default CreatePages;
