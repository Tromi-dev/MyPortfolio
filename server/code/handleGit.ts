import { handleRepo, updateBio } from "./db.js";
import { Octokit } from "@octokit/rest";
import { gitRepo } from "./types.js";
import dotenv from "dotenv";

export { addNewRepos, addBio };

dotenv.config();

const octokit = new Octokit({
  auth: process.env.PERSONAL_TOKEN,
  userAgent: "MyPortfolioServer",
  timeZone: "Europe/Belfast",
});

const addNewRepos = async () => {
  // repos that I can't/don't want to make private and/or
  // that I don't want to be shown.
  const protectedRepos = [
    "MyPortfolio",
    "Opinia",
    "CoPlay",
    "Pok-dex-Project",
    "FractalDev-Portfolio",
  ];

  const { data: allRepos } = await octokit.request("GET /user/repos", {
    visibility: "public",
    affiliation: "owner, collaborator", // my repos plus ones i've worked on
    sort: "updated",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const filteredRepos: gitRepo[] = allRepos.filter(r => !protectedRepos.includes(r.name));

  filteredRepos.forEach(f => handleRepo(f));
};

const addBio = async (owner: string, repo: string) => {
  const { data: readme } = await octokit.request("GET /repos/{owner}/{repo}/readme", {
    owner: owner,
    repo: repo,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  updateBio(readme.content, repo);
};
