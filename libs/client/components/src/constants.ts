const url = 'http://localhost';
const port = 3000;

console.log(`NEXT_API_URL: ${url}:${port}`);
export const API_URL = new URL('/api/books/', `${url}:${port}`);
