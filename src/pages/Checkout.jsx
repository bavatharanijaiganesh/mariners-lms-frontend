import { useEffect, useState } from "react";
import { getEnrollments } from "../services/enrollmentService";
import { createPaymentIntent } from "../services/paymentService";

import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../stripe";
import PaymentForm from "../components/PaymentForm";

export default function Checkout() {

    const [enrollment, setEnrollment] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {

        fetchEnrollment();
 
    }, []);

    // const fetchEnrollment = async () => {

    //     try {

    //         const response = await getEnrollments();

    //         console.log(response.data);

    //         // Latest pending enrollment
    //         const pending = response.data.find(
    //             (item) => item.status === "PENDING"
    //         );

    //         setEnrollment(pending);

    //     } catch (error) {

    //         console.log(error);

    //     }

    // };

    const fetchEnrollment = async () => {

    try {

        const response = await getEnrollments();

        console.log("GET ENROLLMENTS RESPONSE:", response);
        console.log("GET ENROLLMENTS DATA:", response.data);

        const enrollments = Array.isArray(response.data)
            ? response.data
            : response.data.results || [];

        console.log("ENROLLMENTS ARRAY:", enrollments);

        const pending = enrollments.find(
            (item) => item.status === "PENDING"
        );

        console.log("PENDING ENROLLMENT:", pending);

        setEnrollment(pending);

    } catch (error) {

        console.log("GET ENROLLMENTS ERROR:", error);

    }

};

    const handlePayment = async () => {
        console.log("handlePayment , pay now button called====== ");


        try {

            const response = await createPaymentIntent(
                enrollment.fee
            );

            setClientSecret(
                response.data.clientSecret
            );

        } catch (error) {

            console.log(error);

        }

    };

    if (!enrollment) {

        return (

            <div className="max-w-xl mx-auto mt-20 bg-white shadow rounded p-8 text-center">

                <h2 className="text-2xl font-bold mb-4">
                    No Pending Enrollment
                </h2>

                <p className="text-gray-600">
                    Please enroll in a course before proceeding to payment.
                </p>

            </div>

        );

    }

    return (

        <div className="max-w-3xl mx-auto mt-10 bg-white shadow rounded p-8">

            <h1 className="text-3xl font-bold mb-6">

                Checkout

            </h1>

            <div className="space-y-4">

                <div>

                    <strong>Course :</strong>

                    {enrollment.course_name}

                </div>

                <div>

                    <strong>Category :</strong>

                    {enrollment.category}

                </div>

                <div>

                    <strong>Duration :</strong>

                    {enrollment.duration}

                </div>

                <div>

                    <strong>Certificate :</strong>

                    {enrollment.certificate_type}

                </div>

                <div>

                    <strong>Amount :</strong>

                    ${enrollment.fee}

                </div>

            </div>

            {/* <button onClick={handlePayment} className="mt-8 bg-blue-600 text-white px-6 py-3 rounded">
                Pay Now </button> */}

            {clientSecret ? (

                <Elements
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >

                    <PaymentForm
                        clientSecret={clientSecret}
                        enrollment={enrollment}
                    />

                </Elements>

            ) : (

                <button
                    onClick={handlePayment}
                    className="mt-8 bg-blue-600 text-white px-6 py-3 rounded"
                >
                    Pay Now
                </button>

            )}

        </div>

    );

}