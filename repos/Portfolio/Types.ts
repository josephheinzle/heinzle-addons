export interface MainPageProps {}
export interface IdleGameProps {}
export interface StudioGhibliProps {}
export interface TicTacToeProps {}
export interface JustMyTypeProps {}
export interface GundamGetterProps {}
export interface BlogsLabProps {}
export interface ResumeProps {}
export interface NavbarProps {}
export interface ProfileProps {}

export interface IFetchOptions {
  headers: IHeaderObject;
  body?: string;
}

export interface IHeaderObject {
  [key: string]: string;
}

export interface ReqUser extends Request {
  user?: { username?: string; email?: string; password?: string };
}

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