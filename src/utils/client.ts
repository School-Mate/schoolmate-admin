import axios, { AxiosError } from "axios"

export const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})


export const swrFetcher = async <JSON = unknown>(
    endpoints: string
): Promise<JSON> =>
    client
        .get(endpoints, {
            withCredentials: true,
        })
        .then((data) => data.data.data)
        .catch((e: AxiosError) => {
            const response = e.response as unknown as { data: { message: string } };

            throw new Error(
                response?.data?.message || '알 수 없는 에러가 발생했습니다.'
            );
        });
