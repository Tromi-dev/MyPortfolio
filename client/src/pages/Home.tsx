import "./style/Home.css";

import type { cardProps, Elem } from "@/types";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type MouseEvent,
  type RefObject,
  type SetStateAction,
} from "react";
import { aboutMeText, myBackground } from "@/lib/data";

import Card from "@/components/Card";
import Grid from "@/components/Grid";
import TopProjects from "@/components/TopProjects";
import Skills from "@/components/Skills";
import Markdown from "react-markdown";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Background />
    </main>
  );
}

const Hero = () => (
  <Grid layout="two-two" className="bg-dark hero" id="top">
    <section className="w-full thou:w-4/5 min-w-fit max-w-full h-fit min-h-1/2 max-h-dvh flex flex-col items-center justify-center thou:justify-center gap-12 z-[3] absolute top-1/2 left-1/2 trans">
      <h1 className="orbit title-font text-light text-center [line-height:1] text-shadow-v [letter-spacing:calc((.25dvw+.1rem)*-1)]">
        reuben
        <span className="[letter-spacing:calc((1dvw+.5rem)*-1)]"> </span>
        dubois
      </h1>

      {/* <p className="text-light">some creative tagline trust me bro</p> */}

      <div className="flex items-center flex-wrap max-sm:flex-col w-full justify-center gap-x-12 gap-y-8">
        <Card children="UI/UX Designer" colour="sky" className="hero-card shadow-v one" />
        <Card children="Software Engineer" colour="yellow" className="hero-card shadow-v two" />
        <Card children="Web Developer" colour="pink" className="hero-card shadow-v three" />
      </div>
    </section>

    <img
      src="/wireframeCodeGradient.svg"
      alt="App Wireframe & JSX Code fading from transparent to white"
      loading="eager"
      className="min-w-dvw min-h-[40dvh] object-bottom object-cover row-[-1] col-span-full self-end z-[2]"
    />

    <div id="heroGradient" className="absolute w-full h-full top-0 left-0" />
  </Grid>
);

const About = () => {
  const portalRef = useRef<Elem>(null);

  return (
    <Grid layout="three-two" id="about" className="bg-sec z-20 home-shadow">
      <TitleBlock text="Who Am I?" alt="#" className="w-[93%] mob:in-grid [grid-area:a]" />

      <p className="text-ter-cont [grid-area:b] thou:[grid-area:b/b-start/b-end/c-end] w-4/5 self-center max-thou:my-2">
        {aboutMeText}
      </p>

      <Card
        className="in-grid pb-8 relative z-10 overflow-y-clip [grid-area:c] thou:[grid-area:d] max-thou:min-h-[24dvh] max-thou:max-h-[50dvh]"
        colour="purple"
        ref={portalRef}
      >
        <h2 className="w-fit orbit [letter-spacing:.1rem] text-xl text-center pb-1 ml-2">
          Technical Stack
        </h2>

        <Skills portalRef={portalRef} />
      </Card>

      <Card
        className="in-grid max-thou:!h-fit relative flex flex-col items-center justify-start !pb-8 [grid-area:d] thou:[grid-area:e/e-start/e-end/f-end]"
        variant="long"
        colour="purple"
      >
        <h2 className="text-start w-full orbit [letter-spacing:.1rem] text-xl pb-3 ml-2">
          Top Projects
        </h2>

        <TopProjects />
      </Card>
    </Grid>
  );
};

const Background = () => {
  const [bgText, setBgText] = useState<number | null>(null);

  type bgRef = HTMLElement | null;
  const refOne = useRef<bgRef>(null);
  const refTwo = useRef<bgRef>(null);
  const refThree = useRef<bgRef>(null);

  const backgroundCardData: { ref: RefObject<bgRef>; className: string; id: number }[] = [
    { ref: refOne, className: "[grid-area:c] thou:[grid-area:d]", id: 1 },
    { ref: refTwo, className: "[grid-area:d] thou:[grid-area:e]", id: 2 },
    { ref: refThree, className: "[grid-area:e] thou:[grid-area:f]", id: 3 },
  ];

  useEffect(() => {
    if (bgText === null) return;
    document.getElementById("background")?.scrollIntoView({ block: "start" });

    const handleClick = (e: Event) => {
      const target = e.target;
      const refs = [refOne.current, refTwo.current, refThree.current];

      if (refs.includes(target as HTMLElement)) return;
      setBgText(null);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [bgText]);

  return (
    <Grid layout="three-two" id="background" className="bg-pri max-thou:!min-h-fit">
      <TitleBlock
        text="My Background"
        alt="#"
        className="w-[93%] [grid-area:a] center-title-block-text"
      />

      <div
        className={`${
          bgText !== null ? "focused" : "text-center"
        } text-ter-cont transition-all [grid-area:b] thou:[grid-area:b/b-start/b-end/c-end] w-[86%] self-start thou:self-center h-fit mt-8 mb-6`}
        id="backgroundInfo"
      >
        <Markdown
          components={{
            code: ({ className, ...rest }) => (
              <code
                {...rest}
                className={`px-1 py-0.5 bg-light/12 brightness-105 rounded-sm ${className}`}
              />
            ),
          }}
        >
          {bgText !== null
            ? myBackground[bgText]?.text ?? "No text found"
            : "Click a card to read more about me!"}
        </Markdown>
      </div>

      {backgroundCardData.map(({ id, ...d }, index) => (
        <BackgroundCard key={id} {...{ index, bgText, setBgText, ...d }} />
      ))}
    </Grid>
  );
};

type backgroundCardProps = cardProps & {
  index: number;
  bgText: number | null;
  setBgText: Dispatch<SetStateAction<number | null>>;
};
const BackgroundCard = forwardRef<HTMLElement, backgroundCardProps>(
  ({ index, bgText, ...props }, ref) => {
    const handleClick = (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      props.setBgText(!(bgText === index) ? index : null);
    };

    return (
      <Card
        {...props}
        onClick={handleClick}
        className={`w-4/5 transition-all cursor-pointer h-2/3 min-h-fit max-h-full text-xl orbit flex flex-col items-center justify-center gap-4 max-w-full [user-select:none] !py-6 ${
          props.className
        }${bgText === index ? " scale-105 brightness-125" : ""}${index >= 1 ? " mt-4" : ""}
        `}
        colour="blue"
        ref={ref}
      >
        {myBackground[index].image && (
          <img src={myBackground[index].image} alt="Image For a 'My Background' section" />
        )}
        <p>{myBackground[index].title}</p>
      </Card>
    );
  }
);

const TitleBlock = ({
  text,
  src = "placeholder.svg",
  alt,
  className,
}: {
  text: string;
  src?: string;
  alt: string;
  className?: string;
}) => (
  <header
    className={`flex flex-col items-center justify-evenly thou:gap-5 min-h-fit h-80 max-w-[90dvw] min-[1001px]:w-4/5 min-[1001px]:h-[88%] ${className}`}
  >
    <span className="section-header h-[calc(30%-0.5rem)] min-h-fit min-w-[7rem] w-full thou:shadow-i rounded-2xl flex items-center justify-evenly gap-4 bg-none text-ter-cont thou:bg-ter-cont thou:text-on-ter-cont py-2">
      <h1 className="orbit text-center max-thou:mb-2 [line-height:1] text-[calc(2dvw+.75rem)] !w-max thou:w-fit">
        {text}
      </h1>
    </span>

    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`bg-ter h-[calc(60%-0.5rem)] min-w-[7rem] max-w-[98dvw] w-fit thou:w-full rounded-2xl text-ter-cont shadow-i flex items-center justify-center ${
        src !== "placeholder.svg" ? "object-cover" : "object-contain"
      }`}
    />
  </header>
);
