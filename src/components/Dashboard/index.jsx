"use server";

import { getProjects } from "@/server/get-projects";
import Link from "next/link";
import React from "react";
import NewProject from "./NewProject";
import Header from "../Header";
import ProjectActions from "./ProjectActions";
import { checkUser } from "@/lib/checkUser";

const Dashboard = async () => {
  await checkUser();

  const groupsList = await getProjects();

  const myProjects = groupsList ? (
    groupsList.map((group) => (
      <div key={group.id} className="bg-gray-400 w-fit px-4 py-2 rounded-md">
        <Link href={`dashboard/${group.id}`}>{group.name}</Link>
        <ProjectActions groupId={group.id} />
      </div>
    ))
  ) : (
    <p>No Projects</p>
  );

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
