import Stripe from 'stripe';

// Initialize Stripe with proper configuration
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16' // Use latest API version
});