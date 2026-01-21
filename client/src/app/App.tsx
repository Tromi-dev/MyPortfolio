import "./style/Tailwind.css";
import "./style/App.css";

import type { themeType } from "@/types";
import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, PageLoading, NotFound } from "@/components/fallbacks";
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
    <ThemeContext value={{ theme, setTheme }}>
      <Suspense fallback={<PageLoading />}>
        <Dev />
        <Navbar />
        <ErrorBoundary FallbackComponent={ErrorFallback} key={pathname}>
          <Content />
        </ErrorBoundary>
        <Footer />
      </Suspense>
    </ThemeContext>
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
      className="fixed top-4 right-4 shadow-iv px-2 hover:px-4 py-2 flex items-center gap-2 text-sm text-inv-sys bg-sys/15 border border-white/5 hover:brightness-125 transition-[filter] backdrop-blur-[1px] rounded-lg h-fit w-fit z-999"
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

      {showX && (
        <>
          <p className="h-4 mb-0.5 font-[500]">Under Development</p>

          <svg
            viewBox="0 0 12 12"
            height={12}
            width={12}
            onClick={() => setHide(true)}
            className="cursor-pointer invert"
          >
            <line x2={12} y2={12} className="stroke-surf-d stroke-1.75" strokeLinecap="round" />
            <line x1={12} y2={12} className="stroke-surf-d stroke-1.75" strokeLinecap="round" />
          </svg>
        </>
      )}
    </div>
  );
};
