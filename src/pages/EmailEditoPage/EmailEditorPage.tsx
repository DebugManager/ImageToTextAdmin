import React, { useCallback, useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import { EmailsEnums } from "../../enums/EmailsEnums";

import EmailEditor from "../../components/EmailEditor/EmailEditor";

import styles from "./EmailEditorPage.module.css";

import arrow from "../../assets/header/arrow.svg";

const EmailEditPage: React.FC = () => {
  const [sendMessage, setSendMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [subject, setSubject] = useState<string | null>(null);
  const [typeOfEmail, setTypeOfEmail] = useState<EmailsEnums>(
    EmailsEnums.Welcome
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
      case EmailsEnums.Welcome:
        return "Welcome";
      case EmailsEnums.Affiliate_Accept:
        return "Affiliate Accept";
      case EmailsEnums.Affiliate_Decline:
        return "Affiliate Decline";
      case EmailsEnums.Order_Confirm:
        return "Order Confirm";
      case EmailsEnums.Reset_Pasword:
        return "Reset Password Accept";
      default:
        return email;
    }
  };

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [typeOfEmail]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnWrapper}>
        <div className={styles.filterWrapper}>
          <p className={styles.option}>View Emails Types</p>
          <div className={styles.filter} onClick={toggleDropdown}>
            <p>{checkEmailName(typeOfEmail)}</p>
            <img alt="arrow" src={arrow} className={styles.arrow} />
          </div>
          {isDropdownOpen && (
            <div className={styles.optionWrapper}>
              <div
                onClick={() => setTypeOfEmail(EmailsEnums.Welcome)}
                className={styles.optionFilter}
              >
                Welcome
              </div>
              <div
                onClick={() => setTypeOfEmail(EmailsEnums.Affiliate_Accept)}
                className={styles.optionFilter}
              >
                Affiliate Accept
              </div>
              <div
                onClick={() => setTypeOfEmail(EmailsEnums.Affiliate_Decline)}
                className={styles.optionFilter}
              >
                Affiliate Decline
              </div>
              <div
                onClick={() => setTypeOfEmail(EmailsEnums.Order_Confirm)}
                className={styles.optionFilter}
              >
                Order Confirm
              </div>
              <div
                onClick={() => setTypeOfEmail(EmailsEnums.Reset_Pasword)}
                className={styles.optionFilter}
              >
                Reset Password
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
          subject={subject}
          typeOfEmail={typeOfEmail}
          sendMessage={sendMessage}
          handleStopLoading={handleStopLoading}
        />
      </div>
    </div>
  );
};

export default EmailEditPage;
