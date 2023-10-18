import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/utils/prisma";
import { Role } from "@prisma/client";


export const authOptions: NextAuthOptions = {
adapter:PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    
    CredentialsProvider({
        name: "anon",
        credentials: {},
        async authorize(credentials, req) {
            
          //no need to check anything here, just create a new CT anonymous session and return the token
          const authResult = await createAnonymousUser();
          /**
           * https://docs.commercetools.com/tutorials/anonymous-session#creating-a-token-with-a-new-anonymous-session
           * {
               "access_token": "vkFuQ6oTwj8_Ye4eiRSsqMeqLYNeQRJi",
               "token_type": "Bearer",
               "expires_in": 172800,
               "refresh_token": "{projectKey}:OWStLG0eaeVs7Yx3-mHcn8iAZohBohCiJSDdK1UCJ9U",
               "scope": "view_products:{projectKey} manage_my_orders:{projectKey} manage_my_profile:{projectKey}"
             }
           */
          return { token: authResult, id: authResult?.id! };
        },
      }),
  ],
  callbacks: {
    async session({token, session}) {
        if(token){
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.image = token.picture
            session.user.role = token.role
            session.accessToken = token.accessToken
        }
        return session;
    },
    async jwt({token, user, account, profile}) {
        const dbUSer = await prisma.user.findUnique({
            where: {
                id: token.id
            }
        })

        if (!dbUSer) {
 
           token.id= user!.id
           return token;
        }
        return {
            accessToken: account?.access_token!,
            id: dbUSer.id,
            name: dbUSer.name,
            role: dbUSer.role,
            email: dbUSer.email,
            picture: dbUSer.image
            
        }
    },
  }
};
async function createAnonymousUser() : Promise<import("next-auth").User | PromiseLike<import("next-auth").User | null> | null> {
    const anonUser = await prisma.user.create({
        data: {
            email: 'anon@anon.com',
            name: 'Anon User',
            role:Role.ANON,
            ev_slug:"1234"
          },
    })
    return {
        id: anonUser.id

    };
}

