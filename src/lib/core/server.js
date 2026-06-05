const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

//  
export const serverMutation = async (path, newData) => {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: "POST",
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
