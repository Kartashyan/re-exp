import { ActionFunction } from "@remix-run/node";
import { Form, Link, redirect, useActionData } from "@remix-run/react";
import { Button } from "~/infrastructure/components/button";
import { Input } from "~/infrastructure/components/input";
import { userService } from "~/domain-contexts/user/user.service";

export const action: ActionFunction = async ({ request }) => {
    const body = new URLSearchParams(await request.text());
    const email = body.get("email");
    const password = body.get("password");
    if (!email || !password) {
        return new Response(JSON.stringify({
            errors: {
                text: "Email and password are required",

            }
        }), {
            headers: {
                "Content-Type": "application/json; utf-8",
            },
        });
    }

    await userService.signup({ email, password });

    return redirect("/login");
}




export default function Signup() {
    const actionData = useActionData<typeof action>();

    return (
        <section className="flex h-screen flex-col justify-center items-center">
            <div className="h-72 flex flex-col gap-y-1 w-72">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Signup</h3>
                {actionData?.errors ? (
                    <div className="bg-red-100 text-red-500 p-2 rounded-md">
                        {actionData.errors.text}
                    </div>) : null}
                <Form method="post" className="flex flex-col gap-y-1">
                    <Input type="email" id="email" name="email" placeholder="Email" />
                    <Input type="password" id="password" name="password" placeholder="Password" />
                    <Button type="submit">Signup</Button>
                </Form>
                <p>Already have an account?</p>
                <p>Go to</p>
                <Button asChild>
                    <Link to="/login">Login</Link>
                </Button>

            </div>
        </section>
    );
}
