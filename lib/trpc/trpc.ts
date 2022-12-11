import { z } from "zod";
import { initTRPC } from "@trpc/server";
import prisma from "@/lib/prisma";

const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  family: publicProcedure.query(async () => {
    const families = await prisma.family.findMany({
      include: { members: true, contact: true },
    });
    return families.sort((a, b) => (a.lastName > b.lastName ? 1 : -1));
  }),
  familyById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input: { id } }) => {
      const family = await prisma.family.findFirst({
        include: { members: true, contact: true },
        where: { id },
      });
      return family;
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
