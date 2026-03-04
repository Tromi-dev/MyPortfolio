import "./style/Tailwind.css";
import "./style/App.css";

import type { themeType } from "@/types";
import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, PageLoading, NotFound, Loading } from "@/components/fallbacks";
import { ThemeContext } from "@/lib/context";
import { getTheme } from "@/lib/data";

import HomePage from "@/pages/Home";
import CodePage from "@/pages/Code";
import CodeProjectPage from "@/pages/CodeProject";
import DesignsPage from "@/pages/Designs";
import DesignProjectPage from "@/pages/DesignProject";
import ContactPage from "@/pages/Contact";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function App() {
  const [theme, setTheme] = useState<themeType>(getTheme);
  const { pathname } = useLocation();

  useEffect(() => scroll({ top: 0, behavior: "instant" }), [pathname]);

  useEffect(() => {
    const rootClasses = document.querySelector(":root")?.classList;
    const isDark = theme === "dark";
    rootClasses?.remove(isDark ? "light" : "dark");
    rootClasses?.add(isDark ? "dark" : "light");
  }, [theme]);

  return (
    <Suspense fallback={PageLoading()}>
      <ThemeContext value={{ theme, setTheme }}>
        <Dev />
        <Navbar />
        <ErrorBoundary FallbackComponent={ErrorFallback} key={pathname}>
          <Suspense fallback={Loading()}>
            <Content />
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </ThemeContext>
    </Suspense>
  );
}

const Content = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />

    <Route path="/code-projects" element={<CodePage />} />
    <Route path="/code-projects/:owner/:project" element={<CodeProjectPage />} />

    <Route path="/design-projects" element={<DesignsPage />} />
    <Route path="/design-projects/:project" element={<DesignProjectPage />} />

    <Route path="/contact-me" element={<ContactPage />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const Dev = () => {
  const [hide, setHide] = useState(false);
  const [showX, setShowX] = useState(false);

  if (hide) return;

  return (
    <div
      className="w-10 h-10 hover:w-60 fixed top-4 right-4 shadow-iv px-2 hover:px-4 py-2 flex items-center justify-between text-sm text-inv-sys bg-sys/15 border border-white/5 hover:brightness-125 backdrop-blur-[1px] rounded-lg z-999 overflow-hidden"
      style={{ transition: "filter 150ms var(--transition), width 300ms var(--transition)" }}
      onMouseEnter={() => setShowX(true)}
      onMouseLeave={() => setShowX(false)}
    >
      <svg viewBox="0 0 30 30" height="24" width="24" fill="none">
        <circle r="12" cx="15" cy="15" className="stroke-inv-sys stroke-2" />
        <line
          x1="15"
          x2="15"
          y1="8"
          y2="16"
          className="stroke-inv-sys stroke-2"
          strokeLinecap="round"
        />
        <circle r=".5" cx="15" cy="21" className="stroke-inv-sys stroke-2" />
      </svg>

      <p
        className={`h-4 ml-2 translate-y-[-.125em] pr-1 font-medium text-inv-sys whitespace-nowrap ${!showX && "opacity-0 !w-0 !ml-0 !pr-0"}`}
        style={{ transition: "opacity 200ms var(--transition), width 300ms var(--transition)" }}
      >
        Under Development
      </p>

      <svg
        id="x"
        viewBox="0 0 12 12"
        height={12}
        width={12}
        onClick={() => setHide(true)}
        className={`cursor-pointer ml-2 ${!showX && "opacity-0 !w-0 !ml-0"}`}
        style={{ transition: "opacity 200ms var(--transition), width 300ms var(--transition)" }}
      >
        <line x2={12} y2={12} className="stroke-inv-sys stroke-1.95" strokeLinecap="round" />
        <line x1={12} y2={12} className="stroke-inv-sys stroke-1.95" strokeLinecap="round" />
      </svg>
    </div>
  );
};
