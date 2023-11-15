import axios from "axios";

const CREATE_NOTIFICATION = "http://157.230.50.75:8000/v1/notification/";

export const getNotification = async () => {
  try {
    const response = await axios.get(`${CREATE_NOTIFICATION}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createNotification = async (message: string) => {
  const data = {
    text: message,
  };
  try {
    const response = await axios.post(`${CREATE_NOTIFICATION}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
