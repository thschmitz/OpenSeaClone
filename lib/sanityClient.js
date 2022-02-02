import sanityClient from "@sanity/client"

export const client = sanityClient({
    projectId: "5m3ilr12",
    dataset: "production",
    apiVersion: "2021-03-25",
    token: "skBvbhcVX2hMF2LsU0PiS89rKsLPCS1mH59wuloHC3YZqgIjbDAJgvYoC9zbgWZls6qwvwUo9uZyjQGlVlQc7RkHKOcW0MblIO8ivFZPmHny4B0YtV4c9ZCNVC0eMQI6W4pB0fr7T55Y8YB2RdqH9oTaYMvPgfknGQLvxAso0isKq3ZUDaHP",
    useCdn: false,
})