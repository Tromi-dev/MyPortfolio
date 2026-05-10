import { Pool } from "pg";
import {
  codeCardProps,
  designCardProps,
  gitRepo,
  repoProps,
  // skillsProps,
  // topProps,
  designProjectTypes,
} from "./types.js";
import dotenv from "dotenv";

dotenv.config();

export const db = new Pool({
  connectionString: process.env.DB_URL,
});

export const getDesignCardData = async (): designCardProps => {
  try {
    const { rows } = await db.query(
      `
      SELECT name, date, logo
      FROM rdmp_designs
      ORDER BY date, name DESC;
      `,
    );
    return rows;
  } catch (err) {
    throw new Error("[Database] " + err);
  }
};

export const getDesignProjectData = async (project: string): designProjectTypes => {
  try {
    const { rows } = await db.query(
      `
      SELECT rdmp_designs.name, rdmp_designs.date, rdmp_designs.bio, rdmp_designs.pros, rdmp_designs.cons, rdmp_images.images
      FROM rdmp_designs
      JOIN rdmp_images ON rdmp_images.id = rdmp_designs.image_id
      WHERE rdmp_designs.name = $1
      `,
      [project],
    );
    return rows[0];
  } catch (err) {
    throw new Error("[Database] " + err);
  }
};

export const getCodeCardData = async (): codeCardProps => {
  try {
    const { rows } = await db.query(
      `
      SELECT 
        rdmp_repos.repo_name AS "repo", rdmp_repos.display_name AS "name", rdmp_repos.logo, 
        ARRAY_AGG(ARRAY[rdmp_tags.name, rdmp_tags.type]) FILTER (WHERE rdmp_tags.id IS NOT NULL) AS "tags",
        rdmp_repos.date, rdmp_repos.owner
      FROM rdmp_repos
      LEFT JOIN rdmp_repo_con_tags ON rdmp_repo_con_tags.repo_id = rdmp_repos.repo_name
      LEFT JOIN rdmp_tags ON rdmp_tags.id = rdmp_repo_con_tags.tag_id
      GROUP BY repo_name
      ORDER BY rdmp_repos.date DESC;
      `,
    );

    return rows;
  } catch (err) {
    throw new Error("[Database] " + err);
  }
};

export const getRepoData = async (repo: string): repoProps => {
  try {
    const { rows } = await db.query(
      `
      SELECT repo_name AS "repo", display_name AS "name", date, 
        colours as "style", bio, proj_link, git_link, owner, rdmp_images.images
      FROM rdmp_repos
      JOIN rdmp_images ON rdmp_images.id = rdmp_repos.image_id
      WHERE repo_name = $1;
      `,
      [repo],
    );

    const repoData = rows[0];

    if (repoData.bio) {
      const bufferBio = Buffer.from(repoData.bio, "base64");
      const decodedBio = bufferBio.toString("utf-8").replace(/\\n/g, "\n");
      repoData.bio = decodedBio;
    } else {
      repoData.bio = "This project has no bio.";
    }

    repoData.style = JSON.parse(repoData.style);

    return repoData;
  } catch (err) {
    throw new Error("[Database] " + err);
  }
};

// Content outdated — copy view
// export const getTopRepoData = async (): topProps => {
//   try {
//     const { rows } = await db.query(
//       `
//       SELECT rdmp_repos.id, rdmp_repos.repo_name AS "name", rdmp_images.images[2] AS "image", rdmp_repos.date, rdmp_repos.is_code, rdmp_repos.owner
//       FROM rdmp_repos
//       JOIN rdmp_images ON rdmp_images.id = rdmp_repos.image_id
//       WHERE rdmp_repos.top = true

//       UNION ALL

//       SELECT rdmp_designs.id, rdmp_designs.name, rdmp_images.images[2] AS "image", rdmp_designs.date, rdmp_designs.is_code, rdmp_designs.name AS "owner"
//       FROM rdmp_designs
//       JOIN rdmp_images ON rdmp_images.id = rdmp_designs.image_id
//       WHERE rdmp_designs.top = true

//       ORDER BY date DESC;
//       `,
//     );
//     return rows;
//   } catch (err: any) {
//     throw new Error(err?.message);
//   }
// };

export const handleRepo = (repo: gitRepo) => {
  try {
    db.query(
      `
      INSERT INTO rdmp_repos (repo_name, date, proj_link, git_link, owner)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (repo_name) DO UPDATE
      SET (repo_name, date, proj_link, git_link,  owner) = (EXCLUDED.repo_name, EXCLUDED.date, EXCLUDED.proj_link, EXCLUDED.git_link, EXCLUDED.owner);
      `,
      [
        repo.name.toLocaleLowerCase(),
        repo.updated_at,
        repo.homepage,
        repo.html_url,
        repo.owner.login,
      ],
    );
  } catch (err) {
    throw new Error("[Database] " + err);
  }
};

export const updateBio = (bio: string, name: string) => {
  try {
    db.query(
      `
      UPDATE rdmp_repos
      SET bio = $1
      WHERE repo_name = $2
      `,
      [bio, name],
    );
  } catch (err) {
    throw new Error("[Database] " + err);
  }
};
