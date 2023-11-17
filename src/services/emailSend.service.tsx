import axios from "axios";

const SEND_CREATED_EMAIL =
  "http://157.230.50.75:8000/v1/admin/create-email-message/";

const SEND_CREATED_PAGE =
  "http://157.230.50.75:8000/v1/admin/support-posts/create/";

export const sendCreatedEmail = async (
  email: string,
  typeOfEmail: string,
  subject: string
) => {
  try {
    const data = {
      subject: subject,
      message: email,
      event: typeOfEmail,
    };
    const response = await axios.post(`${SEND_CREATED_EMAIL}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendCreatedPage = async (
  collum_title: string,
  title: string,
  description: string,
  img?: string
) => {
  try {
    const data = {
      collum_title: collum_title,
      title: title,
      description: description,
      picture: img,
    };
    const response = await axios.post(`${SEND_CREATED_PAGE}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
