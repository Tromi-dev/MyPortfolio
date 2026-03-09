import "./style/Code.css";

import type { codeCardProps, userInputProps } from "@/types";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CodeCard } from "@/components/Card";
import { fetchCodeCards } from "@/utils/serverPortal";
import { sortMethod, getCardColour } from "@/lib/data";
import { Error, Loading } from "@/components/fallbacks";
import Header, { SearchAndSort } from "@/components/Header";

import Grid from "@/components/Grid";

export default function CodePage() {
  const [userInput, setUserInput] = useState<userInputProps>({
    search: "",
    sort: "date",
    desc: true,
  });

  return (
    <>
      <title>Code Projects | Reuben Dubois Portfolio</title>
      <main id="pageContent">
        <Grid id="top" className="with-header w-full pt-4 grows">
          <Header
            text="My Projects"
            isDev
            children={<SearchAndSort isDev userInput={userInput} setUserInput={setUserInput} />}
            // className="max-xl:flex-col max-xl:justify-center max-xl:justify-self-center max-xl:w-[93%]"
          />
          <Projects userInput={userInput} />
        </Grid>
      </main>
    </>
  );
}

const Projects = ({ className, userInput }: { className?: string; userInput: userInputProps }) => {
  const { isPending, isError, isFetching, error, data, refetch } = useQuery({
    queryKey: ["code"],
    queryFn: fetchCodeCards,
  });

  if (isPending)
    return (
      <article className={`code-card-container code-projects self-center`}>
        <Loading />
      </article>
    );

  if (isError)
    return (
      <article className={`absolute trans top-[50dvh] left-[50dvh]`}>
        <Error error={error} refetch={refetch} />
      </article>
    );

  // —————————————————————————————————————————————————————————————————————————————————————

  const searchFilter = (d: codeCardProps) => {
    const searchContains = (input: string) =>
      input.toLocaleLowerCase().includes(userInput.search.toLocaleLowerCase());

    if (userInput.search === "" || searchContains(d.name)) {
      return true;
    }

    if (d.tags) {
      for (const i of d.tags) {
        if (searchContains(i[0] /* name of tag */)) {
          return true;
        }
      }
    }

    return false;
  };

  const newData = data
    .filter(searchFilter)
    .sort((a, b) => sortMethod(a, b, userInput))
    .map(d => (
      <CodeCard
        key={String(d.id)}
        colour={getCardColour(d.id)}
        className={`h-48 card-width transition-all hover:brightness-105 hover:scale-105 active:brightness-90`}
        {...d}
      />
    ));

  return (
    <section
      className={`${
        isFetching && "opacity-75"
      } project-card-container [grid-area:b/b-start/b-end/d-end] thou:[grid-area:c/c-start/c-end/d-end] max-xl:flex-col ${className}`}
    >
      {userInput.desc ? newData.reverse() : newData}
    </section>
  );
};
