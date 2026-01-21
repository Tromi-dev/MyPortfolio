import { ExtraResourceIcon } from "@/components/icons";
import type {
  codeCardProps,
  designCardProps,
  projectCardColours,
  themeType,
  userInputProps,
} from "@/types";
import type { CSSProperties, JSX } from "react";

export {
  aboutMeText,
  myExperience,
  getCardColour,
  shadcnToggle,
  getTheme,
  sortMethod,
  urlPrefixes,
  contactsData,
  useMDStyles,
};

const aboutMeText = `I'm an 18 year old junior software engineer, who's passionate about melding innovation and
what's the most effective in everything I create. I mainly focus on developing web UIs and applications, however 
my horizons are always expanding as I seek out new creative avenues and ways to improve myself.`;

//* —————————————————————————————————————————————————————————————————————————————————————

type experienceCardContent = { text: string; title: string; image?: string };
const myExperience: experienceCardContent[] = [
  {
    title: "Tech Educators",
    text: `***Mar 2025 - Jul 2025 —*** This 12 week web-development bootcamp gave me a clearer insight into how a workplace operates, 
    whilst enhancing my knowledge and experience in website and UI development, allowing me to stay restabilise my understandings 
    in order to build upon them in the future. I gained understanding in areas I was previously unconfident in, such as \`useEffects\`
    leading me to be able to start confidently fetch data; knowing exactly how the process functions. This was done through working 
    on numerous showcases followed by small projects week-by-week (e.g. [_EverQuill_](/code-projects/Tromi-dev/EverQuill)), 
    some of which were worked on in small groups in an agile workflow.`,
  },
  {
    title: "Access Norwich",
    text: `***Sep 2023 - Jul 2025 —*** During my two year course, I built upon what I had 
    previously learnt by working on several small projects to better my Python skills with libraries including \`datetime, 
    Pandas, and Matplotlib\`. In the latter half, I also started learning web development and UI/UX best 
    practices which would go on to shape my passion and motivations going forward. This course was addiitonally my first experience 
    collaborating with groups of other students in web design, development, and presentations—which helped to increase my confidence 
    and communication skills in the workplace and out. On top of this, the two practical examinations this course hosted 
    (click [here](/code-projects/Tromi-dev/Occupational-Specialism) for the 2nd project) showed me how effectively I behave under 
    pressure and allowed me to gain knowledge of how I can improve myself to become a better worker.`,
  },
  {
    title: "High School",
    text: `***Sep 2018 - Jul 2023 —*** I gained the foundation of my computing career, 
    furthering my problem solving skills _(with GCSE maths and computer science)_.
    I established my Python skills and learned key programming concepts such as iteration, 
    recursion, and file handling.`,
  },
];

//* —————————————————————————————————————————————————————————————————————————————————————

const randomColour = (): "sky" | "pink" | "yellow" => {
  const choice = Math.floor(Math.random() * 3);
  return choice === 0 ? "sky" : choice === 1 ? "pink" : "yellow";
};

const cardColours = new Map<bigint, projectCardColours>();

const getCardColour = (id: bigint) => {
  if (!cardColours.has(id)) cardColours.set(id, randomColour());
  return cardColours.get(id)!;
};

//* —————————————————————————————————————————————————————————————————————————————————————

const shadcnToggle: string = `h-9 px-0 min-w-9 inline-flex items-center justify-center gap-2 rounded-md text-sm 
font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 
data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none 
[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 
focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 
dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap`;

//* —————————————————————————————————————————————————————————————————————————————————————

const getTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme === "light" || storedTheme === "dark" ? storedTheme : "light";
};

//* —————————————————————————————————————————————————————————————————————————————————————

const compareDates = (date1: string, date2: string) => {
  const aMMDD = date1.split("/");
  const dateA = [aMMDD[1], aMMDD[0], aMMDD[2]].join("/");
  const bMMDD = date2.split("/");
  const dateB = [bMMDD[1], bMMDD[0], bMMDD[2]].join("/");

  if (Date.parse(dateA) > Date.parse(dateB)) return 1;
  if (Date.parse(dateA) < Date.parse(dateB)) return -1;
  return 0;
};

const sortMethod = (
  a: designCardProps | codeCardProps,
  b: designCardProps | codeCardProps,
  userInput: userInputProps
): number => {
  if (userInput.sort === "date") return compareDates(a.date, b.date);

  return a.name.localeCompare(b.name);
};

//* —————————————————————————————————————————————————————————————————————————————————————

const urlPrefixes = ["mailto:", "www.", "https://"];

type contactProps = {
  id: number;
  name: string;
  image: string | JSX.Element;
  hex: { txt: string; bg: string };
  link: string;
};
const contactsData: contactProps[] = [
  {
    id: 1,
    name: "Gmail",
    image: "/gmail.svg",
    hex: { bg: "#2a2a2a", txt: "#ffffff" },
    link: "mailto:reudbub07@gmail.com",
  },
  {
    id: 2,
    name: "Linkedin",
    image: ExtraResourceIcon({
      fill: "white",
      className: "contact-image fallback",
    }),
    hex: { bg: "#0a66c2", txt: "#ffffff" },
    link: "www.linkedin.com/in/reuben-dubois-dev",
  },
  {
    id: 3,
    name: "GitHub",
    image: "/github-mark-white.svg",
    hex: { bg: "#171d1e", txt: "#ffffff" },
    link: "https://github.com/Tromi-dev",
  },
];

//* —————————————————————————————————————————————————————————————————————————————————————

const useMDStyles = (col: string[], theme: themeType): { [k: string]: CSSProperties } =>
  theme === "dark"
    ? {
        card: {
          backgroundColor: col[0],
          scrollbarColor: `${col[0]} transparent`,
        },
        img: { color: col[1] },
        a: { color: col[1] },
        h1: { color: col[1] },
        h2: { color: col[1] },
        h3: { color: col[1] },
        p: { color: col[1] },
        li: { color: col[1] },
      }
    : {
        card: {
          backgroundColor: col[1],
          scrollbarColor: `${col[0]} transparent`,
        },
        img: {
          color: `hsl(from ${col[1]} h s calc(l - 64))`,
        },
        a: { color: `hsl(from ${col[0]} h s calc(l - 10))` },
        h1: { color: `hsl(from ${col[0]} h s calc(l - 10))` },
        h2: { color: `hsl(from ${col[0]} h s calc(l - 10))` },
        h3: { color: `hsl(from ${col[0]} h s calc(l - 10))` },
        p: {
          color: `hsl(from ${col[1]} h s calc(l - 80))`,
        },
        li: {
          color: `hsl(from ${col[1]} h s calc(l - 80))`,
        },
      };
