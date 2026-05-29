import "./style/Skills.css";

import type { Elem, ElemRef, skillProps } from "@/types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fetchSkills } from "@/lib/portal";
import { useQuery } from "@tanstack/react-query";
import { createPortal } from "react-dom";
import { Error, Loading } from "./fallbacks";

import Card from "./Card";

export default function Skills({ portalRef }: { portalRef: ElemRef }) {
  const { isPending, isError, isFetching, error, data, refetch } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isPending) return <Loading />;
  if (isError) return <Error error={error} refetch={refetch} className="mt-4" />;

  return (
    <>
      <section
        id="skillContainer"
        className={`w-full h-[86%] px-[.25rem] py-3 flex flex-wrap items-center content-evenly justify-center gap-x-4 gap-y-3 scroller ${
          isFetching ? "opacity-75" : ""
        }`}>
        {data.length > 0 ? (
          data.map(d => <SkillCard key={d.name} d={d} portalRef={portalRef} />)
        ) : (
          <div className="opacity-75 text-center whitespace-nowrap">
            Skills were not <wbr /> retrieved, <br /> try again soon.
          </div>
        )}
      </section>
    </>
  );
}

const SkillCard = ({ d, portalRef }: { d: skillProps; portalRef: ElemRef }) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number | string }>({
    top: 0,
    left: "50%",
  });
  const ref = useRef<Elem>(null);
  const skillNameRef = useRef<Elem>(null);

  // —— EVENTS ——————————————————————————————————————————————————————————————————————————

  //* Handles Position
  useLayoutEffect(() => {
    if (!show) return;
    if (!ref.current || !portalRef.current || !skillNameRef.current) {
      setCoords({
        top: 0,
        left: "50%",
      });
      return;
    }

    const cardRect = ref.current.getBoundingClientRect();
    const targetRect = portalRef.current.getBoundingClientRect();
    const popupRect = skillNameRef.current.getBoundingClientRect();

    setCoords({
      top: cardRect.top - targetRect.top,
      left: cardRect.left - targetRect.left + (cardRect.width - popupRect.width) / 2,
    });
  }, [show, portalRef]);

  //* Handles State
  useEffect(() => {
    // if event is not on its corresponding skill
    const handleEvent = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setShow(false);
    };

    const checkKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") handleEvent(e);
    };

    // manages both mouse and keyboard events
    const addListeners = () => {
      document.addEventListener("click", handleEvent);
      document.addEventListener("keyup", checkKey);
      document.getElementById("skillContainer")?.addEventListener("scroll", () => setShow(false));
    };
    const removeListeners = () => {
      document.removeEventListener("click", handleEvent);
      document.removeEventListener("keyup", checkKey);
      document
        .getElementById("skillContainer")
        ?.removeEventListener("scroll", () => setShow(false));
    };

    if (show) addListeners();
    return () => removeListeners();
  }, [show, ref]);

  // —————————————————————————————————————————————————————————————————————————————————————

  return (
    <>
      <Card
        onClick={() => setShow(!show)}
        className="skill border-transparent border cursor-pointer rounded-lg h-8 w-8 flex items-center justify-center transition-all hover-active dark-border box-content"
        colour="purple"
        ref={ref}
        tabIndex={0}
        onKeyUp={e => (e.key === "Enter" ? setShow(!show) : null)}>
        <img
          src={[import.meta.env.VITE_BUCKET_URL, d.logo_name].join("/skills/") || "/noSkill.svg"}
          alt="logo"
          className="h-full w-auto [user-select:none]"
        />
      </Card>

      {show &&
        portalRef.current &&
        createPortal(
          <Card
            ref={skillNameRef}
            style={coords}
            className="skill-name absolute rounded-md z-10 shadow-iv text-sm dark-border box-content">
            {d.name || "n/a"}
          </Card>,
          portalRef.current,
        )}
    </>
  );
};
