const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const serverGet = async (path) => {
  try {
    const res = await fetch(`${API_URL}${path}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

//  generic server mutation function for creating and updating data
export const serverMutation = async (path, newData, method = "POST") => {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};
