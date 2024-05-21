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
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false;
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL("/dashboard", request.nextUrl));
      // }

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        const dashboardUrl = new URL("/dashboard", request.nextUrl);
        return Response.redirect(dashboardUrl);
      }
    
      return true;
    },
  },
};

