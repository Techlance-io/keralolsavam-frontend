import "../styles/globals.css";
import AuthProvider from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="main_container"> <Component {...pageProps} /></div>
     
    </AuthProvider>
  );
}

export default MyApp;
