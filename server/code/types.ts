import type { Endpoints } from "@octokit/types";

// — DB Route Queries ————————————————————————
export type designCardProps = Promise<
  {
    id: bigint;
    name: string;
    date: Date;

    logo: string;
  }[]
>;

export type designProjectTypes = Promise<{
  id: bigint;
  name: string;
  date: Date;
  images: string[];
  bio: string;
  pros: string;
  cons: string;
}>;

export type skillsProps = Promise<
  {
    id: bigint;
    name: string;
    logo_name: string;
  }[]
>;

// every repo
export type codeCardProps = Promise<
  {
    id: bigint;
    name: string;
    logo: string;
    tags: string[];
    date: Date;
  }[]
>;

// data for individual project page
export type repoProps = Promise<{
  id: bigint;
  repo_name: string;
  date: Date;
  style: string[];
  bio: string;
  links: (string | null)[][];
  owner: string;
  images: string[];
}>;

export type topProps = Promise<
  {
    id: bigint;
    name: string;
    image: string;
    is_code: boolean;
  }[]
>;

export type linkProps = Promise<
  {
    id: bigint;
    link: string;
    style: string;
    logo_name: string;
  }[]
>;

// — GitHub Handling ————————————————————————
export type dbRepoName = { repo_name: string };

export type gitRepo = Endpoints["GET /user/repos"]["response"]["data"][number];
