import axios from "axios";

// upload image to imgbb
export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_apiKey}`,
    formData
  );

  return data;
};
