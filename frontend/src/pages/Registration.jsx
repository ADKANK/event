import React from "react";
import RegistrationForm from "../components/RegistrationForm";

const Registration = () => {
    return (
        <RegistrationForm route="http://localhost:8000/api/user/register/" method="register" />
    );
}

export default Registration;