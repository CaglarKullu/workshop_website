import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/utils/prisma";


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
          return user;
        },
      }),
  ],
  secret:process.env.NEXTAUTH_SECRET,
callbacks:{
  async jwt({token,user,session}){
    // check user if there is user pass id and the role to add more params add to next-auth.d.ts file
    if (user) {
      return{
        ...token,
        id:user.id,
        role:user.role!
      };
    }
    return token;
  },
  async session({session, token,user}){
    // data to session
    return{
      ...session,
      user:{
        ...user,
        id:token.id,
        role:token.role
      }
    };
  },

}
};

