"use server";
import { serverMutation } from "../core/server";

export const submitSubscription = async (subscriptionData) => {
  try {
    return await serverMutation("/api/subscription", subscriptionData);
  } catch (error) {
    console.error("Error submitting subscription:", error);
    return { error: true, message: error.message };
  }
};
