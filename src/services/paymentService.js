import api from "./api";

export const createPaymentIntent = (amount, enrollmentId) => {

    console.log("CREATE PAYMENT INTENT");
    console.log("Amount:", amount);
    console.log("Enrollment ID:", enrollmentId);

    return api.post(
        "payments/create-payment-intent/",
        {
            amount: amount,
            enrollment_id: enrollmentId,
        }
    );
};

export const paymentSuccess = (
    enrollmentId,
    paymentIntentId
) => {

    return api.post(
        `payments/payment-success/${enrollmentId}/`,
        {
            payment_intent_id: paymentIntentId,
        }
    );
};