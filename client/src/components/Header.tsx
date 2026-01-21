import "./style/Header.css";

import type { ChangeEvent, ReactNode } from "react";
import type { setUserInputProps, userInputProps } from "@/types";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { SortOrderIcon } from "./icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { shadcnToggle } from "@/lib/data";
import Sort from "./Sort";

export default function Header({
  className,
  isDev,
  isDesign,
  text,
  children,
}: {
  className?: string;
  isDev?: boolean;
  isDesign?: boolean;
  text: string;
  children?: ReactNode;
}) {
  return (
    <header
      className={`flex items-center ${
        isDev || isDesign ? "justify-between" : "justify-start"
      } w-[93%] gap-y-4 gap-x-10 [grid-area:a] thou:[grid-area:a/a-start/a-end/b-end] header-media ${className}`}
    >
      <TitleSection isDev={isDev} isDesign={isDesign} text={text} />
      {children}
    </header>
  );
}

const TitleSection = ({
  isDev,
  isDesign,
  text,
}: {
  isDev?: boolean;
  isDesign?: boolean;
  text: string;
}) => {
  return (
    <section className="project-title flex items-center gap-4 max-w-full">
      <h1 className="orbit text-5xl w-max">{text}</h1>

      {isDev || isDesign ? (
        <div
          className={`header-label ${
            isDev ? "dev" : "des"
          } text-2xl rounded-full border-3 px-7 mt-3`}
        >
          {isDev ? "Dev" : "Design"}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export const SearchAndSort = ({
  isDev,
  userInput,
  setUserInput,
}: {
  isDev?: boolean;
  userInput: userInputProps;
  setUserInput: setUserInputProps;
}) => (
  <form
    onSubmit={e => e.preventDefault()}
    className={`w-full flex items-center gap-4 max-col:justify-between  ${
      !isDev ? "design" : "dev"
    }`}
  >
    <Label htmlFor="search" className="flex flex-col items-start text-inv-sys w-full">
      Search
      <Input
        className="search-y-sort shadow-half border-none min-w-30 max-w-full"
        type="text"
        placeholder={`${isDev ? "e.g. JavaScript" : "Project name"}`}
        name="search"
        id="search"
        value={userInput.search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUserInput({ ...userInput, search: e.target.value })
        }
      />
    </Label>

    <fieldset className="flex items-end gap-2">
      <Label htmlFor="sort" className="flex flex-col items-start text-inv-sys">
        Sort by
        <Sort title="Sort my projects" userInput={userInput} setUserInput={setUserInput} />
      </Label>

      <Tooltip delayDuration={500}>
        <TooltipTrigger type="button">
          <article
            className={`search-y-sort shadow-half ${shadcnToggle}`}
            onClick={() => setUserInput({ ...userInput, desc: !userInput.desc })}
          >
            <SortOrderIcon
              className={`sort-icon transition-transform ${userInput.desc ? "rotate-90" : ""}`}
            />
          </article>
        </TooltipTrigger>
        <TooltipContent>
          <p className="jb-mono">{userInput.desc ? "Descending" : "Ascending"}</p>
        </TooltipContent>
      </Tooltip>
    </fieldset>
  </form>
);
