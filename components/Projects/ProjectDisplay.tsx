import ProjectCard from './ProjectCard/ProjectCard';
import React from 'react';
import { Project } from '@/types/project';

type ProjectsDisplayProps = {
  projects: Project[];
  activeLanguagesNames: string[];
};

const ProjectsDisplay = ({
  projects,
  activeLanguagesNames,
}: ProjectsDisplayProps) => {
  return (
    <div className="flex flex-col gap-4 h-[75vh] overflow-y-scroll mb-10 w-[90%] md:w-full max-w-[1240px] mx-auto pl-2">
      {projects.map((project, i) => {

        return <ProjectCard
          key={project.item.url + i}
          {...project.item}
          activeLanguagesNames={activeLanguagesNames}
        />
      }
    )}
    </div>
  );
};

export const MemomizedProjectsDisplay = React.memo(ProjectsDisplay);
