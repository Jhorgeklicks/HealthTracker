import { redirect } from "next/navigation";

export const authConfig = {
  providers:[],
  pages: {
    signIn: "/login",
  },
  callbacks: {
     authorized({ auth, request }) {

      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

      // old
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {

        return (`${request.nextUrl.href}/dashboard`);

        // console.log(request.nextUrl.href)
        // return Response.redirect(new URL("/dashboard", request.nextUrl));
        // return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false;
      // } else if (isLoggedIn) {
      //   return "/dashboard"; 
      // }
    
      return true;
    },
  },
};

