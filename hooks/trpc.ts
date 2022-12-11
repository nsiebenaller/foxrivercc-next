import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { AppRouter } from "@/lib/trpc";

const BASE_DOMAIN = String(process.env.BASE_DOMAIN);
function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  return BASE_DOMAIN;
}

const trpc = createTRPCNext<AppRouter>({
  config: () => {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    };
  },
  ssr: true,
});
export default trpc;
