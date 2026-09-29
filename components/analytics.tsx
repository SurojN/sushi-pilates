"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, type AnalyticsEvent } from "@/lib/analytics";
export function Analytics() {
  const pathname = usePathname();
  useEffect(() => { track("page_view", { path: pathname }); }, [pathname]);
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-event]") : null;
      if (element?.dataset.event) track(element.dataset.event as AnalyticsEvent, { source: element.dataset.source || "website" });
    };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  return null;
}
