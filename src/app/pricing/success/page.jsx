import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import SuccessClient from './success-client'
import { submitSubscription } from '@/lib/actions/subscription'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const { status, customer_details, amount_total, currency, metadata } = session;
  const customerEmail = customer_details?.email;

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    // Update user's subscription status in the database here if needed, using customerEmail or session.customer as reference
    const subscriptionData = {
      email: customerEmail,
      planId: metadata.planId, // Assuming you passed the planId in metadata when creating the session
    }

    const res = await submitSubscription(subscriptionData);
   console.log("Subscription update response:", res);

    return (
      <SuccessClient 
        customerEmail={customerEmail} 
        amountTotal={amount_total} 
        currency={currency} 
      />
    )
  }
}