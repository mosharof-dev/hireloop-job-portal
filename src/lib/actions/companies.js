"use server";

import { serverMutation } from "../core/server";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

//  Fetch create company function
export const createCompany = async (newCompanyData) => {
 
    return await serverMutation('/api/companies', newCompanyData);

//   try {
//     const res = await fetch(`${API_URL}/api/companies`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newCompanyData),
//     });
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error creating company:", error);
//     throw error;
//   }
};
