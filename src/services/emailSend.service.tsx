import axios from "axios";

const SEND_CREATED_EMAIL =
  "http://157.230.50.75:8000/v1/admin/create-email-message/";

export const sendCreatedEmail = async (email: string) => {
  try {
    const data = {
      message: email,
    };
    const response = await axios.post(`${SEND_CREATED_EMAIL}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
