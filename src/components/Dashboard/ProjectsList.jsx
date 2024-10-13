"use client";
import getProjects from "@/server/get-projects";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import InfiniteScroll from "../InfiniteScroll";
import ProjectCard from "../Project/ProjectCard";

export default function ProjectsList({ initialData }) {
  const { data, isFetching, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["projects"],
      queryFn: ({ pageParam }) => getProjects({ cursorId: pageParam }),
      initialPageParam: "",
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.cursor : undefined,
      getPreviousPageParam: (firstPage) => firstPage.cursor,
      initialData: initialData
        ? { pages: [initialData], pageParams: [""] }
        : undefined,
      staleTime: 60000, // 1 minute
    });

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="grid grid-cols-1  md:grid-cols-5 lg:grid-cols-7 gap-4">
        {data?.pages &&
          data.pages.map((page) =>
            page.projects.map((project) => (
              <ProjectCard key={project.id} projectData={project} />
            ))
          )}
        {data.pages.length == 1 && data.pages[0].projects.length == 0 && (
          <div className="col-span-full">There are no projects.</div>
        )}
      </div>
      <InfiniteScroll
        isLoading={isFetching}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        threshold={1}
      >
        <div className="w-full flex items-center justify-center text-xs text-muted-foreground">
          {isLoading && (
            <span className="flex flex-row justify-center gap-2 items-center ">
              <span>Loading...</span>
            </span>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
}
