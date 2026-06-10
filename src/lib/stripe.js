import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_ID = {
  
    "seeker_pro": 'price_1TgZ67AXvPYzAzbGSq6qbxH1',
    "seeker_premium": 'price_1TgeQCAXvPYzAzbGNx0Svwub',
    
    "recruiter_growth": "price_1TgeSHAXvPYzAzbG2w4jRblt",
    "recruiter_enterprise": "price_1TgeRdAXvPYzAzbGOYbchlXb"
}