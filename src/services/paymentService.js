import api from "./api";

export const createPaymentIntent = (amount) => {
  return api.post("payments/create-payment-intent/", {
    amount,
  });
};

export const paymentSuccess = (enrollmentId) => {
  return api.post(
    `payments/payment-success/${enrollmentId}/`
  );
};