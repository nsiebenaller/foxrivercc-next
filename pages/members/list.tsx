import { NextPage } from "next";
import React from "react";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import FamilyTable from "@/components/FamilyTable";
import FamilyView from "@/components/FamilyView";

const ListPage: NextPage = () => {
  return (
    <div className="grid h-full gap-2 overflow-hidden">
      <div className="flex gap-2">
        <SearchBar />
        <Button>New</Button>
      </div>
      <div className="flex gap-2 overflow-hidden">
        <div className="block">
          <div className="max-h-full overflow-y-auto">
            <FamilyTable />
          </div>
        </div>
        <div className="block w-full">
          <FamilyView />
        </div>
      </div>
    </div>
  );
};

export default ListPage;
