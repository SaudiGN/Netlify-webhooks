import kofi from "./webhooks/kofi";

/** @type {import("@netlify/functions").Handler} */
export async function handler(event) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 400,
            body: "Received non-POST HTTP method"
        };
    }

    const pathParts = event.path.split("/");
    const lastPart = pathParts[pathParts.length - 1];

    switch (lastPart) {
        case "kofi":
            const res = await kofi(event);
            if (res && res.statusCode >= 400) {
                console.error(res);
            }
            return res;

        default:
            return {
                statusCode: 204
            };
    }
}
