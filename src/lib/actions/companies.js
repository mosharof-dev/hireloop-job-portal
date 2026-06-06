"use server";

import { serverMutation } from "../core/server";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

//  Fetch create company function
export const createCompany = async (newCompanyData) => {
 
    return await serverMutation('/api/companies', newCompanyData);

};
