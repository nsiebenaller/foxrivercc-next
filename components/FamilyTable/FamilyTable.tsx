import React from "react";
import trpc from "@/hooks/trpc";
import { useAppState } from "@/hooks/useAppState";

const FamilyTable = () => {
  const { data, status } = trpc.family.useQuery();
  const { selectedFamilyId, setSelectedFamilyId } = useAppState();
  if (status === "loading") return <div>loading...</div>;
  if (status === "error") return <div>An error has occurred!</div>;
  return (
    <table className="inline-block whitespace-nowrap rounded border border-gray-200">
      <thead>
        <tr className="text-left">
          <th className="px-4 py-2">Last Name</th>
          <th className="px-4 py-2">Home Phone</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {data.map((family, idx) => {
          const isSelected =
            family.id === selectedFamilyId ? "bg-gray-100" : "";
          return (
            <tr
              key={`${family.id}-${idx}`}
              className={`text-left hover:cursor-pointer hover:bg-gray-100 ${isSelected}`}
              onClick={() => setSelectedFamilyId(family.id)}
            >
              <td className="px-4 py-2">{family.lastName}</td>
              <td className="px-4 py-2">{family.homePhone}</td>
              <td>
                <span className="material-symbols-outlined">chevron_right</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default FamilyTable;
