import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/infrastructure/auth/authenticator.server";
import { Logout } from "./logout";
import { userService } from "~/domain-contexts/user/user.service";

export const loader: LoaderFunction = async ({ request }) => {
    const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
    const dbUser = await userService.findUserByEmail(user.email);
    console.log("-----dbUser--", dbUser)
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