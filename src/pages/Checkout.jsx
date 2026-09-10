import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

import { getEnrollments } from "../services/enrollmentService";
import {
    createPaymentIntent,
    paymentSuccess
} from "../services/paymentService";

import { useNavigate } from "react-router-dom";


const stripePromise = loadStripe(
     process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);


function PaymentForm({ enrollment }) {

    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);


    const handlePayment = async (e) => {

        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        setError("");


        try {

            // 1. Create Payment Intent
           console.log("PAYMENT ENROLLMENT:", enrollment);
console.log("PAYMENT ENROLLMENT ID:", enrollment.id);
console.log("PAYMENT FEE:", enrollment.fee);

const response =
    await createPaymentIntent(
        enrollment.fee,
        enrollment.id
    );

            console.log(
                "PAYMENT INTENT RESPONSE:",
                response.data
            );


            const clientSecret =
                response.data.clientSecret;


            // 2. Get Card Element
            const cardElement =
                elements.getElement(CardElement);


            // 3. Confirm payment with Stripe
            const result =
                await stripe.confirmCardPayment(
                    clientSecret,
                    {
                        payment_method: {
                            card: cardElement
                        }
                    }
                );


            if (result.error) {

                console.log(
                    "STRIPE ERROR:",
                    result.error
                );

                setError(
                    result.error.message
                );

                setLoading(false);

                return;
            }


            // 4. Payment successful
            if (
                result.paymentIntent &&
                result.paymentIntent.status === "succeeded"
            ) {

                console.log(
                    "PAYMENT SUCCESS:",
                    result.paymentIntent
                );


                // 5. Tell Django payment succeeded
                const successResponse =
                    await paymentSuccess(
                        enrollment.id,
                        result.paymentIntent.id
                    );


                console.log(
                    "PAYMENT SUCCESS API:",
                    successResponse.data
                );


                setSuccess(true);

                setLoading(false);

            }

        } catch (error) {

            console.log(
                "PAYMENT ERROR:",
                error
            );

            setError(
                error.response?.data?.error ||
                "Payment failed. Please try again."
            );

            setLoading(false);
        }
    };


    if (success) {

        return (

            <div className="mt-8">

                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">

                    <div className="text-5xl mb-4">
                        🎉
                    </div>

                    <h2 className="text-2xl font-bold text-green-700 mb-3">
                        Payment Successful!
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Your enrollment is now active.
                        You can start learning this course.
                    </p>


                    <button
    onClick={() => {

        const pendingCourse =
            JSON.parse(
                sessionStorage.getItem("pendingCourse")
            );

        console.log(
            "COURSE AFTER PAYMENT:",
            pendingCourse
        );

        if (pendingCourse?.id) {
    navigate(`/my-courses/${pendingCourse.id}`);


        } else {

            console.error(
                "Course information not found in sessionStorage"
            );

            navigate("/courses");

        }

    }}
    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg"
>
    Start Learning
</button>

                </div>

            </div>

        );
    }


    return (

        <form
            onSubmit={handlePayment}
            className="mt-8"
        >

            <h2 className="text-xl font-semibold mb-4">
                Card Details
            </h2>


            <div className="border rounded-lg p-4 bg-gray-50">

                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#32325d",
                                "::placeholder": {
                                    color: "#a0aec0"
                                }
                            }
                        }
                    }}
                />

            </div>


            {error && (

                <div className="mt-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg">

                    {error}

                </div>

            )}


            <button
                type="submit"
                disabled={!stripe || loading}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg"
            >

                {loading
                    ? "Processing Payment..."
                    : `Pay $${enrollment.fee}`
                }

            </button>

        </form>

    );
}


export default function Checkout() {

    const [enrollment, setEnrollment] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        fetchEnrollment();

    }, []);


    const fetchEnrollment = async () => {

        try {

            const response =
                await getEnrollments();


            console.log(
                "GET ENROLLMENTS RESPONSE:",
                response
            );

            console.log(
                "GET ENROLLMENTS DATA:",
                response.data
            );


            const enrollments =
                Array.isArray(response.data)
                    ? response.data
                    : response.data.results || [];


            console.log(
                "ENROLLMENTS ARRAY:",
                enrollments
            );


            const pending =
                enrollments.find(
                    (item) =>
                        item.status === "PENDING"
                );


            console.log(
                "PENDING ENROLLMENT:",
                pending
            );


            setEnrollment(pending);

        } catch (error) {

            console.log(
                "GET ENROLLMENTS ERROR:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="max-w-xl mx-auto mt-20 text-center">

                <p className="text-gray-600">
                    Loading checkout...
                </p>

            </div>

        );

    }


    if (!enrollment) {

        return (

            <div className="max-w-xl mx-auto mt-20 bg-white shadow rounded p-8 text-center">

                <h2 className="text-2xl font-bold mb-4">
                    No Pending Enrollment
                </h2>

                <p className="text-gray-600">
                    Please enroll in a course before
                    proceeding to payment.
                </p>

            </div>

        );

    }


    return (

        <Elements stripe={stripePromise}>

            <div className="max-w-3xl mx-auto mt-10 bg-white shadow rounded-xl p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Checkout
                </h1>


                <div className="space-y-4">

                    <div>
                        <strong>Course : </strong>
                        {enrollment.course_name}
                    </div>


                    <div>
                        <strong>Category : </strong>
                        {enrollment.category}
                    </div>


                    <div>
                        <strong>Duration : </strong>
                        {enrollment.duration}
                    </div>


                    <div>
                        <strong>Certificate : </strong>
                        {enrollment.certificate_type}
                    </div>


                    <div className="text-xl">

                        <strong>Amount : </strong>

                        ${enrollment.fee}

                    </div>

                </div>


                <PaymentForm
                    enrollment={enrollment}
                />

            </div>

        </Elements>

    );

}
