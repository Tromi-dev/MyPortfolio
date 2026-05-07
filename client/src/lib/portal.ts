import type {
  codeCardProps,
  codeProjectProps,
  designCardProps,
  designProjectProps,
  topProps,
} from "@/types";
import { createClient } from "@supabase/supabase-js";

const env = import.meta.env;

const server: string = env.VITE_SERVER_URL;
const database = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function requestServer(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
    console.log("aborted");
  }, 10000); // 10s timeout

  try {
    const res = await fetch(server + url, {
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

function tmout(ac: AbortController) {
  ac.abort();
  console.log("aborted");
}

// Home.tsx
export const fetchSkills = async () => {
  const ac = new AbortController();

  const req = await database
    .from("rdmp_technical_skils")
    .select()
    .order("id")
    .abortSignal(ac.signal);

  if (req.data) {
    clearTimeout(setTimeout(tmout, 10000));
  }

  setTimeout(tmout, 10000); // 10s timeout

  return req;
};
/* async (): Promise<skillProps[]> => await requestServer("/get-skills"); */

export const fetchTopProjects = async (): Promise<topProps[]> =>
  await requestServer("/get-repo/top");

// Code.tsx
export const fetchCodeCards = async (): Promise<codeCardProps[]> =>
  await requestServer("/get-repo/card");

// CodeProject.tsx
export const fetchCodeProject = async (owner: string, project: string): Promise<codeProjectProps> =>
  await requestServer(`/get-repo/${owner}/${project}`);

// Designs.tsx
export const fetchDesignCards = async (): Promise<designCardProps[]> =>
  await requestServer("/get-designs");

// DesignProject.tsx
export const fetchDesignProject = async (project: string): Promise<designProjectProps> =>
  await requestServer(`/get-designs/${project}`);
