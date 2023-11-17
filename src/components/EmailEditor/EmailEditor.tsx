import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import cheerio from "cheerio";

import { Editor } from "@tinymce/tinymce-react";

import {
  sendCreatedEmail,
  sendCreatedPage,
} from "../../services/emailSend.service";

const myCustomStyles = {
  background: "rgba(0, 0, 0, 0.8)",
  color: "#fff",
};

const progressBarStyles = {
  background: "#556EE6",
};

const CustomCheckmark = () => <div style={{ color: "#556EE6" }}>✔</div>;

const CustomErrorIcon = () => <div style={{ color: "red" }}>✘</div>;

interface EmailEditorProps {
  sendMessage: boolean;
  handleStopLoading: () => void;
  typeOfEmail?: string;
  typeOfPage?: string;
  subject: string | null;
  isEmail?: boolean;
  isPages?: boolean;
}

const EmailEditor: React.FC<EmailEditorProps> = ({
  sendMessage,
  handleStopLoading,
  typeOfEmail,
  typeOfPage,
  subject,
  isEmail,
  isPages,
}) => {
  const [editorContent, setEditorContent] = useState<string | null>(null);
  const [img, setImg] = useState<string | null>(null);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    extractImagesFromContent(content);

    const contentWithoutImages = removeImagesFromEditorContent(content);
    setEditorContent(contentWithoutImages);
  };

  const removeImagesFromEditorContent = (content: string) => {
    const imgRegex = /<img\b[^>]*>/g;
    const contentWithoutImages = content.replace(imgRegex, "");
    return contentWithoutImages;
  };

  const extractImagesFromContent = (content: string) => {
    const $ = cheerio.load(content);
    const images: string[] = [];

    $("img").each((index, element) => {
      const src = $(element).attr("src");
      if (src) {
        setImg(src);
      }
    });

    return images;
  };

  const sendNewPage = async () => {
    if (editorContent && sendMessage && typeOfPage && subject?.length) {
      if (img) {
        const res = await sendCreatedPage(
          typeOfPage,
          subject,
          editorContent,
          img
        );
        if (res) {
          toast.success("Page was successfully created", {
            position: "top-right",
            autoClose: 3000,
            className: "my-custom-toast",
            style: myCustomStyles,
            progressClassName: "my-custom-progress-bar",
            progressStyle: progressBarStyles,
            icon: <CustomCheckmark />,
          });
          handleStopLoading();
        } else {
          toast.error("Something goes wrong", {
            position: "top-right",
            autoClose: 3000,
            className: "my-custom-toast-error",
            style: myCustomStyles,
            progressClassName: "my-custom-progress-bar",
            progressStyle: progressBarStyles,
            icon: <CustomErrorIcon />,
          });
          handleStopLoading();
        }
      } else {
        const res = await sendCreatedPage(typeOfPage, subject, editorContent);
        if (res) {
          toast.success("Page was successfully created", {
            position: "top-right",
            autoClose: 3000,
            className: "my-custom-toast",
            style: myCustomStyles,
            progressClassName: "my-custom-progress-bar",
            progressStyle: progressBarStyles,
            icon: <CustomCheckmark />,
          });
          handleStopLoading();
        } else {
          toast.error("Something goes wrong", {
            position: "top-right",
            autoClose: 3000,
            className: "my-custom-toast-error",
            style: myCustomStyles,
            progressClassName: "my-custom-progress-bar",
            progressStyle: progressBarStyles,
            icon: <CustomErrorIcon />,
          });
          handleStopLoading();
        }
      }
    }
  };

  const sendNewEmail = async () => {
    if (editorContent && sendMessage && typeOfEmail && subject?.length) {
      const res = await sendCreatedEmail(editorContent, typeOfEmail, subject);
      if (res) {
        toast.success("Email edited successfully", {
          position: "top-right",
          autoClose: 3000,
          className: "my-custom-toast",
          style: myCustomStyles,
          progressClassName: "my-custom-progress-bar",
          progressStyle: progressBarStyles,
          icon: <CustomCheckmark />,
        });
        handleStopLoading();
      } else {
        toast.error("Something goes wrong", {
          position: "top-right",
          autoClose: 3000,
          className: "my-custom-toast-error",
          style: myCustomStyles,
          progressClassName: "my-custom-progress-bar",
          progressStyle: progressBarStyles,
          icon: <CustomErrorIcon />,
        });
        handleStopLoading();
      }
    }
  };

  useEffect(() => {
    if (isEmail && sendMessage) {
      sendNewEmail();
    } else if (isPages && sendMessage) {
      sendNewPage();
    }
  }, [isEmail, isPages, sendMessage]);

  return (
    <Editor
      onEditorChange={handleEditorChange}
      apiKey="2a99igkpjgu904rjwgivkjzd8aln7fzctk6n2rkfz4j4afbf"
      init={{
        plugins:
          "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        ai_request: (respondWith: any) =>
          respondWith.string(() =>
            Promise.reject("See docs to implement AI Assistant")
          ),
      }}
    />
  );
};

export default EmailEditor;
