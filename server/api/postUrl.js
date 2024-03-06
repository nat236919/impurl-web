// export default defineEventHandler((event) => {
//     const config = useRuntimeConfig()

//     return $fetch(`${config.apiHost}/?token=${config.apiSecretKey}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(event.body),
//     }).then((response) => {
//         if (response.status === 201) {
//             return response.json()
//         } else {
//             return response.text().then((text) => {
//                 throw new Error(text)
//             })
//         }
//     })
// })