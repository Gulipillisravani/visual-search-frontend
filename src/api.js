import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post(
    `${API_URL}/search/`,
    formData
  );

  return res.data;
};