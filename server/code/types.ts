import type { Endpoints } from "@octokit/types";

// — DB Route Queries ————————————————————————
export type designCardProps = Promise<
  {
    name: string;
    date: Date;
    logo: string;
  }[]
>;

export type designProjectTypes = Promise<{
  name: string;
  date: Date;
  bio: string;
  pros: string;
  cons: string;
  images: string[];
}>;

// export type skillsProps = Promise<
//   {
//     id: bigint;
//     name: string;
//     logo_name: string;
//   }[]
// >;

// every repo
export type codeCardProps = Promise<
  {
    repo: string;
    name?: string;
    logo?: string;
    tags: string[][] | null;
    date: Date;
    owner: string;
  }[]
>;

// data for individual project page
export type repoProps = Promise<{
  repo: string;
  name?: string;
  date: Date;
  style?: JSON;
  bio?: string;
  proj_link?: string;
  git_link?: string;
  owner: string;
  images?: string[];
}>;

// export type topProps = Promise<
//   {
//     id: bigint;
//     name: string;
//     image: string;
//     is_code: boolean;
//   }[]
// >;

// — GitHub Handling ————————————————————————
export type dbRepoName = { repo_name: string };

export type gitRepo = Endpoints["GET /user/repos"]["response"]["data"][number];
