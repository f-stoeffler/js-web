"use client";

import { useState, useEffect } from "react";
import { Project } from "../../../generated/prisma";
import Image from "next/image";

export default function ProjectsComp() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects?page=${page}`);

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      console.log(data);
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Projects
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Showing {projects.length} of {totalCount} projects
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {projects.slice(0, 8).map((project) => (
            <div
              key={project.slug}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {project.mainImage && (
                <Image
                  src={"/projects/" + project.mainImage}
                  width={400}
                  height={400}
                  alt={"furz"}
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {project.title}
                </h2>
                <p className="text-gray-600 text-sm">{project.shortDesc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Pagination */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(-1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 active:bg-green-400"
          >
            Previous
          </button>

          <button
            onClick={() => handlePageChange(1)}
            disabled={projects.length <= 8} // Assuming pageSize is 8
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 active:bg-green-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
