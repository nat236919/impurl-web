export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const body = await readBody(event)

    if (!body || typeof body !== "object")
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request",
        })

    // If original_url is not in the body, return a 400
    if (!body.original_url)
        throw createError({
            statusCode: 400,
            statusMessage: "original_url is required",
        })

    // If original_url is not a valid URL, return a 400, wrtie a regex to validate URL
    if (!body.original_url.match(/^(http|https):\/\/[^ "]+$/))
        throw createError({
            statusCode: 400,
            statusMessage: "original_url is not a valid URL",
        })

    return await $fetch(`${config.apiHost}/v1/urls/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Api-Key": config.apiSecretKey,
        },
        body: body,
    })
})