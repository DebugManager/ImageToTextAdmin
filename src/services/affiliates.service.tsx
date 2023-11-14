import axios from "axios";

const GET_AFFILIATE_BY_ID =
  "http://157.230.50.75:8000/v1/admin/get-affiliate-by-id/";
const SEARCH_AFFILIATES =
  "http://157.230.50.75:8000/v1/stripe/get-orders/?search=";
const GET_ORDERS_WITH_SORTOPTION =
  "http://157.230.50.75:8000/v1/admin/affiliates/?sort=";
const EDIT_AFFILIATE =
  "http://157.230.50.75:8000/v1/admin/edit-approve-affiliate/";

interface IAffiliate {
  affiliate_id: string | number;
  first_name?: string;
  last_name?: string;
  email?: string;
  country?: string;
  approved?: boolean;
}

export const getAffiliateById = async (id: string | number) => {
  const data = {
    affiliate_id: id,
  };
  try {
    const response = await axios.post(`${GET_AFFILIATE_BY_ID}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllAffiliatesWithSort = async (sortOption: string) => {
  try {
    const response = await axios.get(
      `${GET_ORDERS_WITH_SORTOPTION}${sortOption}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const searchAffiliates = async (searchParam: string) => {
  try {
    const response = await axios.get(`${SEARCH_AFFILIATES}${searchParam}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editAffiliate = async (data: IAffiliate) => {
  try {
    const response = await axios.post(`${EDIT_AFFILIATE}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
