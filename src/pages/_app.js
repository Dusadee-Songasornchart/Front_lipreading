import "@/styles/globals.css";
import "@/styles/sign_in.css";
import "@/styles/sign_up.css";
import "@/styles/Create_team.css";
import "@/styles/editTeam.css";
import "@/styles/color.css"
import "@/styles/editUser.css"
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
