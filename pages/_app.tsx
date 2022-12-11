import type { AppType } from "next/app";
import Sidebar from "@/components/Sidebar";
import trpc from "@/hooks/trpc";
import "@/styles/globals.css";
import { AppStateProvider } from "@/hooks/useAppState";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <AppStateProvider>
      <div className="grid h-screen grid-cols-app">
        <Sidebar />
        <main className="max-h-screen overflow-auto p-4">
          <Component {...pageProps} />
        </main>
      </div>
    </AppStateProvider>
  );
};
export default trpc.withTRPC(App);
