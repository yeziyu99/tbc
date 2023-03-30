import axios from "axios";

export const getDataList = (oParam) => axios.get(`https://global.tigerwit-inc.com/api/v3/quote/history`,{params: oParam})