import type { topCarouselProps, topProps } from "@/types";
import { type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchTopProjects } from "@/lib/portal";
import { Link } from "react-router";
import { Error, Loading } from "./fallbacks";

export default function TopProjects() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [project, setProject] = useState({ name: "project_name", owner: "na", isCode: false });

  const { isPending, isError, isFetching, error, data, refetch } = useQuery({
    queryKey: ["top"],
    queryFn: fetchTopProjects,
  });

  // —————————————————————————————————————————————————————————————————————————————————————

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      const currentIndex = api.selectedScrollSnap();
      const currentElement = api.slideNodes()[currentIndex]?.firstElementChild;

      const projectName = currentElement?.getAttribute("data-name") || "project_name";
      const projectOwner = currentElement?.getAttribute("data-owner") || "na";
      const projectType = currentElement?.getAttribute("data-is-code");

      setCurrent(currentIndex);
      setProject({
        name: projectName,
        owner: projectOwner,
        isCode: projectType === "true" ? true : false,
      });
    };
    handleSelect();

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect); // cleanup
    };
  }, [api]);

  // —————————————————————————————————————————————————————————————————————————————————————

  if (isPending) return <Loading />;
  if (isError) return <Error error={error} refetch={refetch} />;

  return (
    <div
      className={`flex max-thou:flex-col items-center justify-center gap-6 w-full h-fit thou:h-5/6 ${
        isFetching ? "opacity-75" : ""
      }`}>
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="flex flex-col items-center justify-center gap-4 h-full w-[95%] thou:w-[60%] pt-4">
        <CarouselContent className="w-fit h-full snap" ParentClassName="w-full rounded-2xl">
          <Items data={data} />
        </CarouselContent>

        <div className="flex items-center gap-1 min-h-2">
          {data.length > 1 ? (
            data.map((_, index) => (
              <ScrollMarker
                key={index}
                current={index === current}
                index={index}
                api={api}
                colour="rgb(253 214 255)"
              />
            ))
          ) : (
            <DisabledScrollMarker />
          )}
        </div>
      </Carousel>

      <section className="flex flex-col items-center justify-center gap-4 thou:gap-8 orbit h-full w-full thou:w-1/3">
        <h1 className="w-fit text-2xl text-center">{project.name}</h1>
        <ViewProject name={project.name} isCode={project.isCode} owner={project.owner} />
      </section>
    </div>
  );
}

//* —————————————————————————————————————————————————————————————————————————————————————

const Items = ({ data }: { data: topProps[] }) => {
  if (!data) return <></>;

  if (data.length === 0) {
    return (
      <CarouselItem className="h-full min-w-20 flex justify-center">
        <CarouselImage />
      </CarouselItem>
    );
  }

  return (
    <>
      {data.map(d => (
        <CarouselItem key={d.id} className="h-full min-w-20 flex justify-center">
          <CarouselImage
            src={import.meta.env.VITE_BUCKET_URL + d.image}
            alt={d.name}
            dataName={d.name}
            isCode={d.is_code}
            dataOwner={d.owner}
          />
        </CarouselItem>
      ))}
    </>
  );
};

//* —————————————————————————————————————————————————————————————————————————————————————

const CarouselImage = ({
  src = "fallback.svg",
  alt = "my project",
  dataName = "project_name",
  isCode,
  dataOwner,
}: topCarouselProps) => (
  <img
    src={src}
    alt={"Showcase of " + alt}
    data-name={dataName}
    data-is-code={isCode}
    data-owner={dataOwner}
    className="aspect-video rounded-2xl h-full"
  />
);

//* —————————————————————————————————————————————————————————————————————————————————————

const ViewProject = ({
  name,
  isCode,
  owner,
}: {
  name: string;
  isCode: boolean;
  owner?: string;
}) => {
  const disabled = name === "project_name";
  return (
    <Link
      to={`${isCode && owner ? `code-projects/${owner}` : "design-projects"}/${name}`}
      inert={disabled}
      aria-disabled={disabled}
      className="w-4/5 min-w-max">
      <Button
        className={`view-button italic jb-mono w-full cursor-pointer text-lg py-6 transition-all hover:bg-ter hover:scale-110 hover:brightness-110 active:brightness-75 active:scale-90 ${
          disabled ? " cursor-not-allowed" : null
        }`}
        children="View Project"
      />
    </Link>
  );
};

//* —————————————————————————————————————————————————————————————————————————————————————

export const ScrollMarker = ({
  current,
  index,
  api,
  colour,
}: {
  current: boolean;
  index: number;
  api: CarouselApi;
  colour: string;
}) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={() => api?.scrollTo(index)}
    className="transition-all hover:scale-125">
    <circle
      cx="4.19946"
      cy="4.04224"
      r="3.2981"
      fill={colour}
      strokeWidth={current ? "1" : "0"}
      stroke={colour}
      className={`cursor-pointer ${!current ? "opacity-50" : ""}`}
    />
  </svg>
);

export const DisabledScrollMarker = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-all">
    <circle
      cx="4.19946"
      cy="4.04224"
      r="3.2981"
      fill="rgb(253 214 255)"
      stroke="rgb(253 214 255)"
      strokeWidth="1"
      className="opacity-50"
    />
  </svg>
);
