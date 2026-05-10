import express, { Request, Response } from "express";
import cors from "cors";
import {
  getCodeCardData,
  getDesignCardData,
  getDesignProjectData,
  getRepoData,
  // getSkillsData,
  // getTopRepoData,
} from "./db.js";
import { addBio, addNewRepos } from "./handleGit.js";

const app = express();
app.use(cors<Request>());
app.use(express.json());

app.listen(4060, () => console.log("hey all, port 4060 here"));

app.get("/", (_: Request, res: Response) => res.json({ message: "heyyyy" }));

app.get("/get-designs", async (_: Request, res: Response) => res.json(await getDesignCardData()));

app.get("/get-designs/:project", async (req: Request, res: Response) => {
  const { project } = await req.params;
  return res.json(await getDesignProjectData(project));
});

// app.get("/get-skills", async (_: Request, res: Response) => res.json(await getSkillsData()));

app.get("/get-repo/:owner/:name", async (req: Request, res: Response) => {
  const { owner, name } = await req.params;
  const notOnGithub = ["Hall of Fame"];
  if (!notOnGithub.includes(name)) await addBio(owner, name.replace(/ /g, "-"));
  return res.json(await getRepoData(name));
});

app.get("/get-repo/card", async (_: Request, res: Response) => {
  await addNewRepos();
  return res.json(await getCodeCardData());
});

// app.get("/get-repo/top", async (_: Request, res: Response) => res.json(await getTopRepoData()));
