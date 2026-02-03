import "./style/Project.css";

import type { designProjectProps } from "@/types";
import { fetchDesignProject } from "@/utils/serverPortal";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DisabledScrollMarker, ScrollMarker } from "@/components/TopProjects";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import Card from "@/components/Card";
import Grid from "@/components/Grid";
import Header from "@/components/Header";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/* In-File Components =>
  - Content
*/

export default function DesignProjectPage() {
  const { project } = useParams();

  const { isRefetching, data } = useSuspenseQuery({
    queryKey: ["designProject", project!],
    queryFn: () => fetchDesignProject(project!),
  });

  return (
    <>
      <title>{`${project!} | Reuben Dubois Portfolio`}</title>
      <main>
        <Grid id="top" className={`with-header design ${isRefetching ? "opacity-75" : null}`}>
          <Header text={project!} isDesign className="opacity-100" />
          <Content {...data} />
        </Grid>
      </main>
    </>
  );
}

const Content = ({ images, ...props }: designProjectProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrent(api.selectedScrollSnap()));

    return () => {
      api.off("select", () => setCurrent(api.selectedScrollSnap()));
    };
  });

  return (
    <>
      <Carousel
        setApi={setApi}
        className={`[grid-area:images] w-4/6 flex flex-col items-center gap-8 card mono shadow-2xl shadow-sec mb-8 px-18 py-12 rounded-4xl`}
      >
        <CarouselContent ParentClassName="rounded-4xl">
          {images.map((i, index) => (
            <CarouselItem key={index}>
              <img
                src={`${import.meta.env.VITE_BUCKET_URL}/${i}`}
                alt={`Image ${images.indexOf(i) + 1} for ${props.name}`}
                className="max-w-full rounded-4xl aspect-video bg-ter-cont"
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="carousel-button-container min-w-4/5 h-12">
          <CarouselPrevious className="w-2/5 h-full res-shadow rounded-4xl rel translate-0 card pink cursor-pointer hover:brightness-105 border-0 hover:scale-110 active:scale-90 active:brightness-90" />

          <Card colour="purple" className="flex items-center justify-center gap-1">
            {api && images.length > 1 ? (
              images.map((_, index) => (
                <ScrollMarker
                  key={index}
                  api={api}
                  current={current === index}
                  index={index}
                  colour={"rgb(253 214 255)"}
                />
              ))
            ) : (
              <DisabledScrollMarker />
            )}
          </Card>

          <CarouselNext className="w-2/5 h-full res-shadow rounded-4xl rel translate-0 card pink cursor-pointer hover:brightness-105 border-0 hover:scale-110 active:scale-90 active:brightness-90" />
        </div>
      </Carousel>

      <Card
        children={props.bio}
        colour="pink"
        className="[grid-area:bio] flex items-center justify-center in-grid long text-center"
      />

      <div className="[grid-area:procon] w-[90.1%] h-full gap-8 flex items-center justify-between">
        <ProCon title="What Went Well" children={props.pros} />
        <ProCon title="What Went Worse" children={props.cons} />
      </div>
    </>
  );
};

const ProCon = ({ title, children }: { title: string; children: string }) => (
  <Card colour="purple" className="w-[50%] min-h-full">
    <h1 className="text-xl orbit mb-2">{title}</h1>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        ul: ulProps => <ul {...ulProps} style={{ listStyle: "inside", marginLeft: "1rem" }} />,
      }}
      children={children}
    />
  </Card>
);
