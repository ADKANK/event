import React from "react";
import RegistrationForm from "../components/RegistrationForm";

const Registration = () => {
    return (
        <RegistrationForm route="/api/user/register/" method="register" />
    );
}

export default Registration;