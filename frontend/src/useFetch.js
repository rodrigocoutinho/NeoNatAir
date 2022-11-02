import { useState } from "react";

const DEFAULT_FETCH_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        "content-type": "application/json"
    }
}

export default function useFetch(fetchURL, fetchOptions = {}) {
    const [request, setRequest] = useState(null);
    
    async function initiateFetch() {
        setRequest({error:null, data:null})
        try {
            const finalFetchOptions = {
                ...DEFAULT_FETCH_OPTIONS,
                ...fetchOptions,
                headers : {
                    ...DEFAULT_FETCH_OPTIONS.headers,
                    ...fetchOptions.headers
                },
            }

            const response = await fetch(fetchURL, finalFetchOptions)
            const responseBody = await response.json()

            if (response.ok)
                setRequest({error:null, data:responseBody})
            else
            {
                const error = new Error(`Request failed with code ${response.status}`)
                error.response = response
                error.responseBody = responseBody
                throw error
            }
        } catch (error) {
            setRequest({error, data:null})
        }
    }
    
    const willFetch = request === null
    const isFetching = request !== null && request.error === null && request.data === null
    const didFetch = request !== null && (request.error !== null || request.data !== null)
    const didFail = request !== null && request.error !== null
    const didSucceed = request !== null && request.data !== null
    const error = didFetch ? request.error : null
    const data = didFetch ? request.data : null

    return [
        {
            willFetch,
            isFetching,
            didFetch,
            didFail,
            didSucceed,
            error,
            data
        },
        initiateFetch
    ]
}