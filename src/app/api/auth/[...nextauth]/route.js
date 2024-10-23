import NextAuth from "next-auth";
import authOptions from "@/utils/config/options"
import { cookies, headers, params } from 'next/headers';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
