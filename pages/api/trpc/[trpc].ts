import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/lib/trpc/trpc";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
