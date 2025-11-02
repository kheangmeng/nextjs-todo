"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n, type Locale } from "@/i18n-config";
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const activeLocale = pathname.split("/")[1];

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <ButtonGroup>
      {i18n.locales.map((locale) => {
        return (
          <Button variant={activeLocale === locale ? "default" : "outline"} size="sm" key={locale}>
            <Link href={redirectedPathname(locale)}>{locale}</Link>
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
