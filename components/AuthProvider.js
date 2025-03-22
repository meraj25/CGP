'use client'

import {SessionProvider} from 'next-auth/react'
import { Children } from 'react'

const AuthProvider=({Children,session})=>{

    return(
        <div>
            <SessionProvider session = {session}>
                
                {Children}
            
            </SessionProvider>



        </div>
    )


}
export default AuthProvider