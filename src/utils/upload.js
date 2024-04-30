import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "worknest");
  // console.log(file);
  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dqc0px7bg/image/upload`,
      data
    );

    const { url } = res.data;
    return url;
  } catch (err) {
    console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrr",err);
  }
};

export default upload;
