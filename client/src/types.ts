import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import type {
  Dispatch,
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
  RefObject,
  SetStateAction,
} from "react";

// server pulls

export type gridProps = {
  layout?: string;
  className?: string;
  id: string;
  children: ReactNode;
};

export type codeCardProps = {
  id: bigint;
  name: string;
  logo: string;
  tags: string[][];
  date: string;
  owner: string;
};

export type codeProjectProps = {
  id: bigint;
  repo_name: string;
  date: string;
  style: string[];
  bio: string;
  links: (string | null)[][];
  images: string[];
};

export type designCardProps = {
  id: bigint;
  name: string;
  date: string;
  logo: string;
};

export type designProjectProps = {
  id: bigint;
  name: string;
  date: string;
  images: string[];
  bio: string;
  pros: string;
  cons: string;
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
  options?: RefetchOptions | undefined
) => Promise<QueryObserverResult<object[], Error>>;
