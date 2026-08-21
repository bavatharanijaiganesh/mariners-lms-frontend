import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paymentSuccess } from "../services/paymentService";

export default function PaymentForm({ clientSecret, enrollment }) {

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);

        const result = await stripe.confirmCardPayment(clientSecret, {

            payment_method: {

                card: elements.getElement(CardElement),

            },

        });

        if (result.error) {

            alert(result.error.message);

        } else {

            if (result.paymentIntent.status === "succeeded") {
                console.log("Stripe Payment Success");
                console.log("Enrollment ID:", enrollment.id);

                await paymentSuccess(enrollment.id);
                console.log("Payment Success");
                alert("Payment Successful");
                navigate("/my-courses");
            }

        }

        setLoading(false);

    };
    return (

        <form onSubmit={handleSubmit}>

            <div className="border rounded p-4">

                <CardElement />

            </div>

            <button
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded"
                disabled={!stripe || loading}
            >

                {loading ? "Processing..." : "Pay Now"}

            </button>

        </form>

    );

}