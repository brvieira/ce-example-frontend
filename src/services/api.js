import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND;

if (!backendUrl) {
  console.log("Missing backend url");
  throw new Error("Missing backend url");
}

const serviceInstance = axios.create({ baseURL: backendUrl });

export const postToApi = async (data) => {
  try {
    await serviceInstance.post("/guest/create", data);

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const getGuests = async () => {
  try {
    const { data } = await serviceInstance.get("/guest/all");

    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
