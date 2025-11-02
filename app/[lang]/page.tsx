"use server"

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import MenuLanding from "@/components/menu-landing";
import { ModeToggle } from "@/components/mode-toggle";
import Counter from "@/components/counter";
import LocaleSwitcher from "@/components/locale-switcher";
import { ButtonGroup } from "@/components/ui/button-group"

export default async function Home({ params }: { params: Promise<{ lang: Locale }>}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-[95vh] p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[15px] row-start-2 items-center sm:items-start">
          <div className="absolute top-6 right-6 flex items-center gap-6"><LocaleSwitcher /> <ModeToggle /></div>
          <MenuLanding />

          <hr />
          <p>Current locale: {lang}</p>
          <p>
            This text is rendered on the server:{" "}
            {dictionary["server-component"].welcome}
          </p>
          <Counter dictionary={dictionary.counter} />
        </main>
      </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        @Copyright Todo
      </footer>
    </div>
  );
}
