import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/infrastructure/auth/authenticator.server";
import { Logout } from "./logout";

export const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });

    return json(user);
}

export default function AppPage() {
    const data = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>App</h1>
            <Logout />
            <p>{JSON.stringify(data)}</p>
        </div>
    );
}