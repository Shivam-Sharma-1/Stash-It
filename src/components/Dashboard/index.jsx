import { getGroups } from "@/server/get-groups";
import Link from "next/link";
import React from "react";
import NewProject from "./NewProject";
import Header from "../Header";

const Dashboard = async () => {
  const groupsList = await getGroups();

  const myProjects = groupsList.map((group) => (
    <Link href={`dashboard/${group.id}`} key={group.id} className="w-fit">
      <div className="bg-gray-400 w-fit px-4 py-2 rounded-md">{group.name}</div>
    </Link>
  ));

  return (
    <main className="w-full flex flex-col">
      <Header />
      <div className="w-full flex flex-col gap-4 px-10 py-6">
        <div className="w-full flex justify-between items-center flex-wrap">
          <h1>My Projects</h1>
          <NewProject />
        </div>
        <div>{myProjects}</div>
      </div>
    </main>
  );
};

export default Dashboard;
