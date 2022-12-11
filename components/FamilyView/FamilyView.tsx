import trpc from "@/hooks/trpc";
import { useAppState } from "@/hooks/useAppState";
import React from "react";

const FamilyView = () => {
  const { selectedFamilyId } = useAppState();
  const { data, status } = trpc.familyById.useQuery(
    { id: selectedFamilyId || 0 },
    { enabled: Boolean(selectedFamilyId) }
  );
  if (!selectedFamilyId) return null;
  if (status === "loading")
    return <div className="rounded border border-gray-200 p-4">loading...</div>;
  if (status === "error" || !data)
    return (
      <div className="rounded border border-gray-200 p-4">
        An error has occurred!
      </div>
    );
  return (
    <div className="h-full rounded border border-gray-200 p-4">
      <h2 className="text-xl font-semibold">{data.lastName} Family</h2>
    </div>
  );
};

export default FamilyView;
