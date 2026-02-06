import "./style/Contact.css";

import { contactsData, urlPrefixes } from "@/lib/data";
import { Link } from "react-router";

import Grid from "@/components/Grid";
import Header from "@/components/Header";
import Card from "@/components/Card";

/* In-File Components =>
  - Contacts
*/

export default function ContactPage() {
  return (
    <>
      <title>Contact Me | RD Potfolio</title>
      <main id="pageContent">
        <Grid id="top" className="with-header contact mt-4">
          <Header text="Contact Me" />
          {/* <div className=" min-h-1/3 flex flex-col items-center gap-12 [grid-area:text/text-start/text-end/contacts-end]"> */}
          <Card
            color="mono"
            className="contact-card max-w-[93%] min-w-1/2 flex items-center justify-center [grid-area:text] text-center h-fit mb-6 dark-border"
          >
            this is the text
          </Card>
          <Contacts />
          {/* </div> */}
        </Grid>
      </main>
    </>
  );
}

const Contacts = () => {
  const formatLink = (link: string) =>
    link.startsWith("https://") || link.startsWith("mailto:") ? link : "https://" + link;

  return (
    <section
      className="flex flex-col items-center [grid-area:contacts]"
      style={{ height: `${contactsData.length * 10}rem` }}
    >
      {contactsData.map(c => (
        <Link
          key={c.id}
          to={formatLink(c.link)}
          className="contact-link text-xl shadow-i dark-border w-[93dvw] rounded-2xl thou:w-dvw thou:rounded-none"
          style={{ backgroundColor: c.hex.bg, color: c.hex.txt }}
        >
          {typeof c.image === "string" ? (
            <img src={c.image} alt={c.name + " Logo"} loading="lazy" className="contact-image" />
          ) : (
            c.image
          )}

          <div className="flex flex-col gap-2 justify-between items-center">
            <p className="text-2xl orbit">{c.name}</p>
            <p className="text-xs jb-mono opacity-75">
              {c.link.replace(new RegExp(urlPrefixes.join("|")), "")}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
};
