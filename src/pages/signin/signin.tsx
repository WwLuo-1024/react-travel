import React from "react";
import { UserLayout } from "../../layouts/userLayout";
import { SigninForm } from "./signinForm";

export const SignInPage: React.FC = () => {
    return (
        <UserLayout>
            {/* <h1>登陆页面</h1> */}
            <SigninForm />
        </UserLayout>
    )
}