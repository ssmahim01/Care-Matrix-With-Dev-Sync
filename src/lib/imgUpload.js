import axios from "axios";

export const imgUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_URL}`,
    formData
  );

  return data.data.display_url;
};
