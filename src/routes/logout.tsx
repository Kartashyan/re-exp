import { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/infrastructure/auth/authenticator.server";

export const action: ActionFunction = async ({ request }) => {
    await authenticator.logout(request, {
        redirectTo: "/login",
    });
}

export const Logout = () => {
    return (
        <Form method="post" action="/logout">
            <button type="submit">Logout</button>
        </Form>
    );
}