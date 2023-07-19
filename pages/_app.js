import Header from "@/components/appComponents/Header";
import Sidebar from "@/components/appComponents/Sidebar";
import AuthContext from "@/contexts/authContext";
import "@/styles/globals.css";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthContext>
      <div data-theme="dark" className="grid font-mono grid-cols-5">
        <div className="h-screen hidden lg:block w-full bg-[#20233F]">
          <Sidebar />
        </div>
        <div className="lg:col-span-4 col-span-5 bg-[#242847] h-screen overflow-y-scroll flex flex-col pb-12">
          <Header />
          <Component {...pageProps} />
          <ToastContainer />
          </div>
      </div>
    </AuthContext>
    </QueryClientProvider>
  );
}
