import fetch from "./api.js";
import API_URL from "./config.js";

export const getItems = async (inputVal: string) => {
  try {
    const items = await fetch.get(`${API_URL}?value=${inputVal}`);

    return items;
  } catch (error) {
    if (error instanceof Error) alert(error.message);
  }
};

export default {
  getItems,
};
