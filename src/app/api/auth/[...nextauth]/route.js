import { dbConnect } from "@/utils/config/dbConnection"
import User from "@/utils/models/User";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const DEFAULT_PROFILE_IMAGE = "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png";


const createUser = async (email, password, name) => {
  const hashedPassword = await bcrypt.hash(password.toString(), 10);
  const newUser = new User({
    email: email,
    password: hashedPassword,
    name: name,
    profileImage: DEFAULT_PROFILE_IMAGE,
  });
  return await newUser.save();
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password, name, isRegistering } = credentials;
        try {
          await dbConnect();
          let user = await User.findOne(email);
          if (isRegistering) {
            if (user) {
              throw new Error("User is already registered");
            }
            user = await createUser(email, password, name);
          } else {
            if (!user) {
              return null;
            }
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
              return null;
            }
          }
          if (!user.profileImage) {
            user.profileImage = DEFAULT_PROFILE_IMAGE;
            await user.save();
          }
          return user;
        } catch (error) {
          console.log("Error at api/nextauth: ", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const { email, name, image } = user;
          await connect();
          let foundUser = await User.findOne({ email });
          if (!foundUser) {
            const newUser = new User({
              email, name, profileImage: image || DEFAULT_PROFILE_IMAGE,
            });
            foundUser = await newUser.save();
          } else if (!foundUser.profileImage || foundUser.profileImage === DEFAULT_PROFILE_IMAGE) {
            //failsafe so we don't mess up default profile image
            foundUser.profileImage = image || DEFAULT_PROFILE_IMAGE;
            await foundUser.save();
          }
          user._id = foundUser._id.toString();
          user.email = foundUser.email;
          user.name = foundUser.name;
          user.notificationPreferences = foundUser.notificationPreferences;
          user.admin = foundUser.admin;
          user.profileImage = foundUser.profileImage;
          console.log("User logged in: ", user.email);
          return true;
        } catch (err) {
          console.log("Error authorizing: ", err);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token._id = user._id.toString();
        token.email = user.email;
        token.name = user.name;
        token.notificationPreferences = user.notificationPreferences;
        token.admin = user.admin;
        token.profileImage = user.profileImage;
      }
      if (trigger === "update" && session) {
        token.name = session.user.name;
        token.email = session.user.email;
        token.profileImage = session.user.profileImage || DEFAULT_PROFILE_IMAGE;
      }
      return token;
    },
    async session({ session: Any, token }) {
      if (session.user) {
        session.user._id = token._id.toString();
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.notificationPreferences = token.notificationPreferences;
        session.user.admin = token.admin;
        session.user.profileImage = token.profileImage;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
