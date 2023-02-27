import React from "react";
import { UserLayout } from "../../layouts/userLayout";
import { RegisterForm } from "./registerForm";

export const RegisterPage:React.FC = () =>{
    return(
        <UserLayout>
            {/* <h1>注册页面</h1> */}
            <RegisterForm />
        </UserLayout>  
    );
}