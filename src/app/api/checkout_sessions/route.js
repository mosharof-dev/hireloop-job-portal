import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { PLAN_PRICE_ID, stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/core/session';



export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    const formData = await request.formData()
    const planId = formData.get('planId')
    const priceId = PLAN_PRICE_ID[planId]
    // Create Checkout Sessions from body params.
    const user = await getUserSession() // Implement this function to get the current user session
    const session = await stripe.checkout.sessions.create({
       customer_email: user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: `subscription`,
      success_url: `${origin}/pricing/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: { planId } // Pass the planId in metadata for later use
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}