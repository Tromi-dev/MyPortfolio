import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import type {
  Dispatch,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
  RefObject,
  SetStateAction,
} from "react";

export type gridProps = {
  layout?: string;
  className?: string;
  id: string;
  children: ReactNode;
};

// server pulls

export type codeCardProps = {
  repo: string;
  name: string;
  logo: string;
  tags: string[][] | null;
  date: Date;
  owner: string;
};

export type palette = { background: string; foreground: string } | undefined;
export type codeProjectProps = {
  repo: string;
  name?: string;
  date: Date;
  style?: palette;
  bio?: string;
  proj_link?: string;
  git_link?: string;
  owner: string;
  images?: string[];
};

export type designCardProps = {
  name: string;
  date: Date;
  logo: string;
};

export type designProjectProps = {
  name: string;
  date: Date;
  bio: string;
  pros: string;
  cons: string;
  images: string[];
};

export type skillProps = {
  id: bigint;
  name: string;
  logo_name: string;
};

export type topProps = {
  id: bigint;
  image: string;
  name: string;
  owner: string;
  is_code: boolean;
};

// —————————————————————————————————————————————————————————————————————————————————————

export type themeType = "light" | "dark";
export type contextType = { theme: themeType; setTheme: Dispatch<SetStateAction<themeType>> };

export type projectCardColours = "sky" | "pink" | "yellow";
type cardColours = projectCardColours | "blue" | "purple" | "gold" | "mono";

export type cardProps = HTMLAttributes<HTMLElement> & {
  variant?: string;
  colour?: cardColours;
  children?: ReactNode;
  ref?: ElemRef | ForwardedRef<HTMLElement>;
};

export type topCarouselProps = {
  src?: string;
  alt?: string;
  dataName?: string;
  dataOwner?: string;
  isCode?: boolean;
};

export type Elem = HTMLElement | null;
export type ElemRef = RefObject<Elem>;

export type userInputProps = { search: string; sort: "date" | "name"; desc: boolean };
export type setUserInputProps = Dispatch<SetStateAction<userInputProps>>;

export type Status = {
  value: "date" | "name";
  label: "Date" | "Name";
};

export type Refetch = (
  options?: RefetchOptions | undefined,
) => Promise<QueryObserverResult<object[], Error>>;

export type waveProps = { text: string; offset?: number };
