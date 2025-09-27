"use client";

import { useState, useEffect } from "react";
import { Project } from "../../../generated/prisma";
import Image from "next/image";
import ProjectComp from "./Project";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ProjectsComp() {
  const largePageSize = 4;
  const smallPageSize = 3;

  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(largePageSize);
  const [loading, setLoading] = useState(true);

  // Update pageSize based on window width (lg breakpoint: 1024px)
  useEffect(() => {
    function handleResize() {
      const newPageSize =
        window.innerWidth < 1536 ? smallPageSize : largePageSize;

      if (newPageSize !== pageSize) {
        // Calculate new page based on current pageSize and newPageSize
        let newPage = Math.trunc((currentPage * pageSize) / newPageSize);
        if (newPage < 1) {
          newPage = 1
        }
        setCurrentPage(newPage);
        setPageSize(newPageSize);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pageSize, currentPage, largePageSize, smallPageSize]);

  const fetchProjects = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/projects?page=${page}&pageSize=${pageSize}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(currentPage + newPage);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="max-w-9xl mx-auto">
        <div className="grid grid-cols-12">
          <div className="flex items-center justify-center">
            <button
              onClick={() => handlePageChange(-1)}
              disabled={currentPage === 1}
              className="bg-priml hover:bg-prim rounded-full disabled:bg-gray-300 disabled:hover:cursor-default active:bg-primd hover:cursor-pointer pt-1.5 pr-2 pl-1 pb-1 transition-all"
            >
              <i className="bi bi-chevron-left text-4xl"></i>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 col-span-10">
            {projects.slice(0, pageSize).map((project) => (
              <ProjectComp
                key={project.slug}
                title={project.title}
                img={project.mainImage}
                slug={project.slug}
              >
                {project.shortDesc}
              </ProjectComp>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={() => handlePageChange(1)}
              disabled={projects.length <= pageSize}
              className="rounded-full bg-priml hover:bg-prim text-white disabled:bg-gray-300 disabled:hover:cursor-default active:bg-primd hover:cursor-pointer pt-1.5 pl-2 pr-1 pb-1 transition-all"
            >
              <i className="bi bi-chevron-right text-4xl"></i>
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-3 mb-6 text-2xl">
          Seite {currentPage}
        </div>
        {/* Simple Pagination */}
      </div>
    </div>
  );
}
