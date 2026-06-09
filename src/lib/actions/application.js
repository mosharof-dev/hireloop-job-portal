"use server";
import { serverMutation } from "../core/server";

export const submitApplication = async (applicationData) => {
  try {
    return await serverMutation("/api/application", applicationData);
  } catch (error) {
    console.error("Error submitting application:", error);
    return { error: true, message: error.message };
  }
};
