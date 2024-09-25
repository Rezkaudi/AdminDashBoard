import Api from "./Api";
import { useToken } from "./useToken";
import { toast } from "react-toastify";


const { token } = useToken();

const getData = async (endpoint) => {
  try {
    const response = await fetch(`${Api}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
    });

    const status = response.ok;
    const data = await response.json();

    return { status, data };
  } catch (error) {
    console.error("Fetch Error:", error);
    toast.error("catch" + error);
    throw error;
  }
};

const postData = async (endpoint, sendData) => {
  try {
    const response = await fetch(`${Api}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      body: JSON.stringify(sendData),
    });

    const status = response.ok;
    const data = await response.json();

    return { status, data };

  } catch (error) {
    console.error("Fetch Error:", error);
    toast.error("catch" + error);
    throw error;
  }
};

const putData = async (endpoint, sendData) => {
  try {
    const response = await fetch(`${Api}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
      body: JSON.stringify(sendData),
    });

    const status = response.ok;
    const data = await response.json();

    return { status, data };

  } catch (error) {
    console.error("Fetch Error:", error);
    toast.error("catch" + error);
    throw error;
  }
};

const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${Api}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Auth: token,
      },
    });

    const status = response.ok;
    const data = await response.json();

    return { status, data };

  } catch (error) {
    console.error("Fetch Error:", error);
    toast.error("catch" + error);
    throw error;
  }
};

export { getData, postData, putData, deleteData };
