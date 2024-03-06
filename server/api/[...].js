// export default defineEventHandler((event) => {
//     const id = [...event.path.split("/")].pop()
//     const config = useRuntimeConfig()

//     return $fetch(`${config.apiHost}/${id}/?token=${config.apiSecretKey}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     }).then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             return response.text().then((text) => {
//                 throw new Error(text)
//             })
//         }
//     })
// })