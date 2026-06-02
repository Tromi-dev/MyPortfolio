import type { waveProps } from "@/types";

const CharacterJSX = ({ characters, offset }: { characters: string[]; offset: number }) => {
  return (
    <section className="whitespace-nowrap">
      {characters.map((c, i) => {
        const index = i + offset;
        return (
          <span
            key={index}
            className="name-header-char hover-active"
            style={{ animationDelay: `-${index * 80}ms` }}>
            {c}
          </span>
        );
      })}
    </section>
  );
};

export default function WaveText({ text, offset = 0 }: waveProps) {
  const characters = text.split("");
  const firstSpace = characters.findIndex(c => c === " ");

  if (firstSpace === -1) {
    return <CharacterJSX characters={characters} offset={offset} />;
  }

  const beforeChars = characters.slice(0, firstSpace);
  const afterText = text.slice(firstSpace + 1);

  return (
    <>
      {beforeChars.length && <CharacterJSX characters={beforeChars} offset={offset} />}
      {afterText.length && <WaveText text={afterText} offset={offset + firstSpace + 1} />}
    </>
  );
}
