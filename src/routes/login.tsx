import { Form, Link, useActionData } from "@remix-run/react";
import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { authenticator, EMAIL_PASSWORD_STRATEGY } from "~/auth/authenticator.server";
import { Input } from "~/components/input";
import { Button } from "~/components/button";


export const action: ActionFunction = async ({ request }) => {
    return await authenticator.authenticate(EMAIL_PASSWORD_STRATEGY, request, {
        successRedirect: "/app",
        failureRedirect: "/login",
    });
}

export const loader: LoaderFunction = async ({ request }) => {
    return await authenticator.isAuthenticated(request, {
        successRedirect: "/app",
    });
}


export default function Login() {
    const actionData = useActionData<typeof action>();
    return (
        <section className="flex h-screen flex-col justify-center items-center">
            <div className="h-72 flex flex-col gap-y-1 w-72">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Login</h3>
                {actionData?.errors ? (
                    <div className="bg-red-100 text-red-500 p-2 rounded-md">
                        {actionData.errors.text}
                    </div>) : null}
                <Form className="flex flex-col gap-2" method="POST">
                    <Input type="email" id="email" name="email" placeholder="Email" />
                    <Input type="password" id="password" name="password" placeholder="Password" />
                    <Button type="submit">Login</Button>
                </Form>
                <p>Don't have an account?</p>
                <p>Go to</p>
                <Button asChild>
                    <Link to="/signup">Signup</Link>
                </Button>
            </div>
        </section>
    );
}