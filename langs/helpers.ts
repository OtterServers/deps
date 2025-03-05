export type Json = Record<string, any>

export const env = <T = string | undefined>(key: string) => {
    const value = Bun.env[key]
    if (!value) return undefined as T
    return value as T
}

export const curl = async (url: string) => (await fetch(url))
export const curlJson = async (url: string) => (await curl(url)).json() as Json

export function parseContentDisposition(header: string): string | null {
    let filename: string | null = null;

    // Handle RFC 6266 format with encoding (filename*=UTF-8''filename.jpg)
    const filenameStarMatch = /filename\*=([^']*)'([^']*)'([^;]*)/.exec(header);
    if (filenameStarMatch) {
        try {
            // Extract encoded filename
            const encodedFilename = filenameStarMatch[3];

            // Decode the filename
            filename = decodeURIComponent(encodedFilename);
            return filename;
        } catch (e) {
            // Fall through to other methods if decoding fails
            throw new Error(`Failed to decode filename: ${e.message}`);
        }
    }

    // Handle standard format (filename="filename.jpg" or filename=filename.jpg)
    const filenameMatch = /filename="([^"]*)"/.exec(header) || /filename=([^;]*)/.exec(header);
    if (filenameMatch) {
        filename = filenameMatch[1].trim();
    }

    return filename;
}

export const download = async (url: string, destination: string | null = null) => {
    const response = await fetch(url)

    if (!response.ok) throw new Error(`Failed to download: ${response.status} ${response.statusText}`)

    if (!destination) {
        const contentDisposition = response.headers.get('content-disposition')
        if (contentDisposition) destination = parseContentDisposition(contentDisposition)
        if (!destination) destination = url.split("/").at(-1)?.split("?")[0] as string
    }

    await Bun.write(destination, await response.arrayBuffer())
}

export const generateRandomString = (length: number) => {
    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    return Array(length).join().split(",").map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join("")
}