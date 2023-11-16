import React, { useState } from "react";
import { CircleLoader } from "react-spinners";

import EmailEditor from "../../components/EmailEditor/EmailEditor";

import styles from "./EmailEditorPage.module.css";

const EmailEditPage: React.FC = () => {
  const [sendMessage, setSendMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStopLoading = () => {
    setIsLoading(false);
  };

  const handleSendMessage = () => {
    setSendMessage(true);
    setIsLoading(true);
  };
  return (
    <div className={styles.wrapper}>
      <EmailEditor
        sendMessage={sendMessage}
        handleStopLoading={handleStopLoading}
      />
      <div className={styles.btnWrapper}>
        <button onClick={handleSendMessage} className={styles.button}>
          {isLoading ? (
            <CircleLoader loading={isLoading} color={"#FFF"} size={10} />
          ) : (
            "Send"
          )}
        </button>
      </div>
    </div>
  );
};

export default EmailEditPage;
