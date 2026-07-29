import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";

export default function Profile() {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await getProfile();

                setUser(response.data.data);

            } catch (error) {

                console.log(error.response?.data);

            }

        };

        fetchProfile();

    }, []);

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>

            <h1>Student Profile</h1>

            <p><strong>Name:</strong> {user.full_name}</p>

            <p><strong>Email:</strong> {user.email}</p>

            <p><strong>Phone:</strong> {user.phone_number}</p>

            <p><strong>Role:</strong> {user.role}</p>

        </div>
    );
}