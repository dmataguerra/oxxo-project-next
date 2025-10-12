import { cookies } from 'next/headers'
import { TOKEN_NAME } from '@/constants'
import { cache } from 'react'

export const authHeaders = cache(() => {
    const tokenCookie = cookies().get(TOKEN_NAME)?.value;
    
    let actualToken = tokenCookie;
    if (tokenCookie?.startsWith('j:')) {
        const parsedCookie = JSON.parse(tokenCookie.substring(2));
        actualToken = parsedCookie.token;
    }
    
    return {
        'Authorization' : `Bearer ${actualToken}`
    }
})