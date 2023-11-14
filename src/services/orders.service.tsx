import axios from "axios";

const GET_ORDERS_BY_ID = "http://157.230.50.75:8000/v1/stripe/get-order-by-id/";
const SEARCH_ORDERS = "http://157.230.50.75:8000/v1/stripe/get-orders/?search=";
const SEARCH_ORDERS_WITH_SORTOPTION =
  "http://157.230.50.75:8000/v1/stripe/get-orders/?sort=";

export const getOrderById = async (id: string | number) => {
  const data = {
    order_id: id,
  };
  try {
    const response = await axios.post(`${GET_ORDERS_BY_ID}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrdersWithSort = async (sortOption: string) => {
  try {
    const response = await axios.get(
      `${SEARCH_ORDERS_WITH_SORTOPTION}${sortOption}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const searchOrders = async (searchParam: string) => {
  try {
    const response = await axios.get(`${SEARCH_ORDERS}${searchParam}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
