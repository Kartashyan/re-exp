import { LoaderFunction } from "@remix-run/node";
import { authenticator } from "~/auth/authenticator.server";

export const loader: LoaderFunction = async ({ request }) => {
    await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
}

export default function AppPage() {
    return (
        <div>
            <h1>App</h1>
        </div>
    );
}