import "./style/Card.css";

import type { cardProps, codeCardProps, designCardProps } from "@/types";
import { Link } from "react-router";
import { memo, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Card({ variant, colour, className, ...props }: cardProps) {
  return (
    <article
      className={["card rounded-2xl shadow-ii thou:max-h-[50dvh]", variant, colour, className].join(
        " "
      )}
      {...props}
    />
  );
}

//* —————————————————————————————————————————————————————————————————————————————————————

const StatusTag = ({ status }: { status: string }) => {
  const isColumn = useMediaQuery("(max-width: 1280px)");
  const [show, setShow] = useState(isColumn);

  useEffect(() => setShow(isColumn), [isColumn]);

  return (
    <div
      className={`status ${status.toLowerCase()} absolute bottom-2 right-2 text-xs text-right rounded-[8px] h-5 w-fit min-w-5 p-3 ${
        show ? "px-2" : null
      }`}
      tabIndex={0}
      onMouseOver={() => !isColumn && setShow(true)}
      onMouseOut={() => !isColumn && setShow(false)}
      onKeyUp={e => e.key === "Enter" && setShow(!show)}
    >
      {show && status}
    </div>
  );
};

//* —————————————————————————————————————————————————————————————————————————————————————

export const CodeCard = memo(
  ({ name, logo, tags, date, owner, ...props }: codeCardProps & Omit<cardProps, "id">) => {
    return (
      <Link
        to={encodeURI(`/code-projects/${owner}/${name}`)}
        className={`relative grow-1 ${props.className}`}
      >
        <Card variant={props.variant} className="card-grid code pr-8" colour={props.colour}>
          <div className="[grid-area:image] code-card-image-container image-cont rounded-lg flex items-center justify-center">
            <img
              src={`${import.meta.env.VITE_BUCKET_URL + logo}`}
              alt={`${name} Logo Image`}
              className="card-image"
              loading="lazy"
            />
          </div>

          <p className="[grid-area:name] text-xl w-full overflow-auto flex items-baseline justify-between">
            {name} <span className="text-xs mr-2">{date}</span>
          </p>

          <section className="[grid-area:tags] tags">
            {tags.map(t => {
              if (t[1] === "status") {
                return <StatusTag key={t[0]} status={t[0]} />;
              }

              return (
                <p key={t[0]} className="tag text-sm px-3 py-1 rounded-full">
                  {t[0]}
                </p>
              );
            })}
          </section>
        </Card>
      </Link>
    );
  }
);

//* —————————————————————————————————————————————————————————————————————————————————————

export const DesignCard = memo(
  ({ name, className, logo, date, id, ...props }: designCardProps & Omit<cardProps, "id">) => {
    return (
      <Link to={`/design-projects/${name}`} className="design-card">
        <Card {...props} className={`card-grid design py-4 ${className}`} id={`${id}`}>
          <div className="image-cont w-full [grid-area:image] justify-self-center rounded-md flex items-center justify-center flex-grow-1">
            <img
              src={`${import.meta.env.VITE_BUCKET_URL}/${logo}`}
              alt={`${name} Logo Image`}
              className="h-3/4"
            />
          </div>

          <h1 className="[grid-area:name] text-xl">{name}</h1>
          <p className="[grid-area:date] text-xs">{date}</p>
        </Card>
      </Link>
    );
  }
);
