import type {
  codeCardProps,
  codeProjectProps,
  designCardProps,
  designProjectProps,
  skillProps,
  topProps,
} from "@/types";
import { createClient, type PostgrestBuilder } from "@supabase/supabase-js";

const env = import.meta.env;

const database = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function requestServer(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
    console.log("aborted");
  }, 60000); // 60s timeout

  try {
    const res = await fetch(url, {
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

async function requestDatabase<T>(
  query: PostgrestBuilder<never, T, false>,
  ac: AbortController = new AbortController(),
  timeoutMs = 4000,
) {
  const timeout = setTimeout(() => {
    ac.abort();
    console.log("aborted");
  }, timeoutMs);

  try {
    const req = await query;

    // If the response data is nullish, throw so callers get an explicit error
    if (req.data == null) {
      throw new Error("Database returned no data");
    }

    return req.data;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    } else {
      throw new Error("Database error");
    }
  } finally {
    clearTimeout(timeout);
  }
}

// Home.tsx
export const fetchSkills = async (): Promise<skillProps[]> => {
  const ac = new AbortController();
  return await requestDatabase<skillProps[]>(
    database
      .from("rdmp_technical_skills")
      .select()
      .order("id")
      .abortSignal(ac.signal)
      .overrideTypes<skillProps[], { merge: false }>(),
  );
};

export const fetchTopProjects = async (): Promise<topProps[]> => {
  const ac = new AbortController();
  return await requestDatabase<topProps[]>(
    database
      .from("top_projects")
      .select()
      .abortSignal(ac.signal)
      .overrideTypes<topProps[], { merge: false }>(),
  );
};

// Code.tsx
export const fetchCodeCards = async (): Promise<codeCardProps[]> =>
  await requestServer("/api/get-repo/card");

// CodeProject.tsx
export const fetchCodeProject = async (owner: string, project: string): Promise<codeProjectProps> =>
  await requestServer(`/api/get-repo/${owner}/${project}`);

// Designs.tsx
export const fetchDesignCards = async (): Promise<designCardProps[]> =>
  await requestServer("/api/get-designs");

// DesignProject.tsx
export const fetchDesignProject = async (project: string): Promise<designProjectProps> =>
  await requestServer(`/api/get-designs/${project}`);
