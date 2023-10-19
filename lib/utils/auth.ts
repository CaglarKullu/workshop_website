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
        name: "credentials",
        credentials: {},
        async authorize(credentials, req) {
            const {email} = credentials as{ email:string}
         const user = await prisma.user.findUnique(
          {
            where:{
              email: email
            }
          }
         );
         if (!user) {
          throw Error("email mismatch!")
         }
          return {
            name: user.name,
            email: user.email,
            role: user.role,
            id:user.id
          }
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

