export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event)

    if (!body || typeof body !== "object")
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
        })

    // If id is not in the body, return a 400
    if (!body.id)
        throw createError({
            statusCode: 400,
            statusMessage: "id is required",
        })

    return await $fetch(`${config.apiHost}/v1/urls/${body.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": config.apiSecretKey,
        },
    });
})