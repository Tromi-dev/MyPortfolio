import "./style/Project.css";

import type { codeProjectProps, palette } from "@/types";
import { Link, useParams } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCodeProject } from "@/lib/portal";
import { GitHubIcon, ProjectIcon } from "@/components/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { customPalette } from "@/lib/data";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Grid from "@/components/Grid";
import Header from "@/components/Header";
import Card from "@/components/Card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CodeProjectPage() {
  const { owner, project } = useParams();

  const { isRefetching, data } = useSuspenseQuery({
    queryKey: ["codeProject", project],
    queryFn: () => fetchCodeProject(owner!, project!),
  });

  return (
    <>
      <title>{`${project!} | Reuben Dubois Portfolio`}</title>
      <main id="pageContent">
        <Grid id="top" className="with-header w-full pt-4">
          <Header
            text={project!}
            children={
              <Links git_link={data.git_link} proj_link={data.proj_link} palette={data.style} />
            }
            isDev
          />
          <Content {...data} isRefetching={isRefetching} />
        </Grid>
      </main>
    </>
  );
}

//* —————————————————————————————————————————————————————————————————————————————————————

const Content = ({
  images,
  isRefetching,

  ...props
}: codeProjectProps & { isRefetching: boolean }) => {
  const palette = props.style || { background: "var(--background)", foreground: "var(--primary)" };
  const styles = customPalette(palette);

  return (
    <>
      <section className="max-w-8/10 min-h-fit h-1/2 [grid-area:c]">
        <Carousel
          opts={{ loop: true }}
          className={`w-full min-h-fit h-full flex flex-col items-center justify-center gap-4 rounded-2xl ${
            isRefetching ? "opacity-75" : null
          }`}>
          <CarouselContent ParentClassName="rounded-2xl">
            {images &&
              images.map(i => (
                <CarouselItem key={i}>
                  <img
                    src={import.meta.env.VITE_BUCKET_URL + "/" + i}
                    alt={`Code Project Image #${images.indexOf(i)}`}
                    className="code-project-image rounded-2xl"
                  />
                </CarouselItem>
              ))}
          </CarouselContent>

          <div className="code-carousel w-4/5">
            <CarouselPrevious
              className="w-2/5"
              style={{ backgroundColor: palette.background, color: palette.foreground }}
            />
            <CarouselNext
              className="w-2/5"
              style={{ backgroundColor: palette.background, color: palette.foreground }}
            />
          </div>
        </Carousel>

        <Card
          className="flex items-center justify-evenly gap-2 w-full"
          style={{ backgroundColor: palette.background, color: palette.foreground }}>
          <p>{`Updated at: ${props.date}`}</p>
          {/* ADD created date & status tag */}
        </Card>
      </section>

      {/* ————————————————————————————————————————————————————————————————————————————————————— */}

      <Card
        className="in-grid scroller markdown-card prose prose-invert max-w-1/2 [grid-area:d]"
        style={styles.card}>
        <ReactMarkdown
          children={props.bio}
          remarkPlugins={[remarkGfm]}
          components={{
            img: () => (
              <i className="block py-2" style={styles.img}>
                <s>Redacted Image</s>
              </i>
            ),
            a: aProps => (
              <a
                {...aProps}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.a}
                href={
                  aProps.href && !aProps.href?.startsWith("./")
                    ? aProps.href
                    : `https://github.com/TruckOfMinds/${props.repo}/blob/main${aProps.href}`
                }>
                {aProps.children}
              </a>
            ),
            h1: h1props => (
              <h1 {...h1props} style={styles.h1} className="orbit text-2xl">
                {h1props.children}
              </h1>
            ),
            h2: h2props => (
              <h2 {...h2props} style={styles.h2} className="orbit text-xl">
                {h2props.children}
              </h2>
            ),
            h3: h3props => (
              <h3 {...h3props} style={styles.h3} className="orbit">
                {h3props.children}
              </h3>
            ),
            p: pProps => (
              <p {...pProps} style={styles.p}>
                {pProps.children}
              </p>
            ),
            li: liProps => (
              <li {...liProps} style={styles.li}>
                {liProps.children}
              </li>
            ),
            code: codeProps => {
              const { children, className, ...rest } = codeProps;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  children={String(children).replace(/\n$|`/, "")}
                  language={match[1]}
                  style={dark}
                />
              ) : (
                <code {...rest} className={`solo ${className}`}>
                  {children}
                </code>
              );
            },
          }}
        />
      </Card>
    </>
  );
};

//* —————————————————————————————————————————————————————————————————————————————————————

const Links = (props: { proj_link?: string; git_link?: string; palette: palette }) => {
  const obj = Object.entries({ proj_link: props.proj_link, git_link: props.git_link });
  return (
    <Card
      colour="sky"
      className="w-1/4 min-w-fit h-16 min-h-fit flex items-center justify-center gap-2 mr-12">
      {obj.map(([k, v], count) => (
        <Link
          className={`cursor-pointer${v && " opacity-50"}`}
          key={`${count}_link_${k || ""}`}
          inert={Boolean(v)}
          target="_blank"
          to={v || ""}>
          {k === "proj_link" ? <ProjectIcon /> : <GitHubIcon />}
          <p>{k === "proj_link" ? "Project" : "GitHub"}</p>
        </Link>
      ))}
    </Card>
  );
};
