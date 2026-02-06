import "./style/Project.css";

import type { codeProjectProps } from "@/types";
import { useContext } from "react";
import { Link, useParams } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchCodeProject } from "@/utils/serverPortal";
import { ExtraResourceIcon, GitHubIcon, ProjectIcon } from "@/components/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useMDStyles } from "@/lib/data";

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
import { ThemeContext } from "@/lib/context";

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
          <Header text={project!} children={<Links links={data.links} />} isDev />
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
  style,
  ...props
}: codeProjectProps & { isRefetching: boolean }) => {
  const { theme } = useContext(ThemeContext);
  const styles = useMDStyles(style, theme);

  return (
    <>
      <section className="max-w-8/10 min-h-fit h-1/2 [grid-area:c]">
        <Carousel
          opts={{ loop: true }}
          className={`w-full min-h-fit h-full flex flex-col items-center justify-center gap-4 rounded-2xl ${
            isRefetching ? "opacity-75" : null
          }`}
        >
          <CarouselContent ParentClassName="rounded-2xl">
            {images.map(i => (
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
              style={{ backgroundColor: style[0], color: style[1] }}
            />
            <CarouselNext
              className="w-2/5"
              style={{ backgroundColor: style[0], color: style[1] }}
            />
          </div>
        </Carousel>

        <Card
          className="flex items-center justify-evenly gap-2 w-full"
          style={{ backgroundColor: style[0], color: style[1] }}
        >
          <p>{`Updated at: ${props.date}`}</p>
          {/* ADD created date & status tag */}
        </Card>
      </section>

      {/* ————————————————————————————————————————————————————————————————————————————————————— */}

      <Card
        className="in-grid scroller markdown-card prose prose-invert max-w-1/2 [grid-area:d]"
        style={styles.card}
      >
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
                    : `https://github.com/TruckOfMinds/${props.repo_name}/blob/main${aProps.href}`
                }
              >
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

const Links = ({ links }: { links: (string | null)[][] }) => {
  const getIconFromLabel = (label: string) => {
    switch (label.toLowerCase()) {
      case "project":
        return <ProjectIcon />;
      case "github":
        return <GitHubIcon />;
      default:
        return <ExtraResourceIcon />;
    }
  };

  return (
    <Card
      colour="sky"
      className="w-1/4 min-w-fit h-16 min-h-fit flex items-center justify-evenly gap-2 mr-12"
    >
      {links.map(l =>
        l[0] && l[1] ? (
          <Link key={l[1]} to={l[0]} target="_blank" className="cursor-pointer">
            {getIconFromLabel(l[1])}
            <p>{l[1]}</p>
          </Link>
        ) : null,
      )}
    </Card>
  );
};
