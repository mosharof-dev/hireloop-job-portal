import { serverGet } from "../core/server"


export const getPlanById = async (plan_Id)=>{
    return serverGet(`/api/plans?planId=${plan_Id}`)
}