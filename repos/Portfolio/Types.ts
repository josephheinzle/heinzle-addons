export interface NO_PROPS {}

export interface ProjectDetails {
  title: string;
  details: string;
  techStack: string[];
  pageURL: string;
  appURL: string;
  gitHubURL: string;
  lab: boolean;
}

export interface ProjectLinksProps {
  appURL: string;
  gitHubURL: string;
}