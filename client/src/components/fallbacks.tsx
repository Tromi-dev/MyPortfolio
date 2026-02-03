import type { FallbackProps } from "react-error-boundary";
import type { Refetch } from "@/types";
import { Button } from "./ui/button";

import Grid from "./Grid";

export { ErrorFallback, NotFound, PageLoading, Loading, Error };

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex flex-col items-center gap-4 justify-between">
      <h1>Something went wrong</h1>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}

function NotFound() {
  return (
    <>
      <title>404 | Reuben Dubois Portfolio</title>
      <main>
        <Grid id="top">Page not found</Grid>
      </main>
    </>
  );
}

function PageLoading() {
  return (
    <section className="page-loading-screen">
      <img src="logo.svg" alt="My designer logo" className="grayscale" />
      <p>Page Loading...</p>
    </section>
  );
}

const Loading = () => (
  <div className="w-full h-full flex items-center justify-center absolute trans top-1/2 left-1/2">
    Loading...
  </div>
);

const Error = ({
  error,
  refetch,
  className,
}: {
  error: Error | { message: string };
  refetch: Refetch;
  className?: string;
}) => (
  <div
    className={`w-full h-full flex flex-col items-center justify-start gap-4 min-h-fit max-h-80 text-center ${className}`}
  >
    {/* <img src="/error.svg" alt="Error 'X' Icon" className="max-h-40 h-1/3"  */}
    <h1 className="orbit text-ter-cont text-2xl w-fit">Uh oh.</h1>
    <h2 className="text-center">{`${error.message}. Please try again later.`}</h2>
    <button
      onClick={() => refetch()}
      className="rounded-full bg-ter-cont text-on-ter-cont px-6 py-1 mb-4 cursor-pointer transition-all hover-active"
    >
      Retry
    </button>
  </div>
);
