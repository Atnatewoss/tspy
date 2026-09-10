import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { type SectionDef } from "@/lib/sections";

export function SectionPrevNext({
  prev,
  next,
}: {
  prev?: SectionDef;
  next?: SectionDef;
}) {
  const prefix = "/docs";
  return (
    <div className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`${prefix}/${prev.slug}`}
          className="group rounded-xl border border-border p-4 transition-colors hover:bg-muted"
        >
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="mt-1.5 block text-sm font-medium text-foreground">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link
          href={`${prefix}/${next.slug}`}
          className="group rounded-xl border border-border p-4 text-right transition-colors hover:bg-muted sm:col-start-auto"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Next
            <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1.5 block text-sm font-medium text-foreground">
            {next.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}