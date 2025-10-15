"use server"

import MenuLanding from "@/components/menu-landing";
import { ModeToggle } from "@/components/mode-toggle";

export default async function Home({ searchParams }: { searchParams: { query: string } }) {
  const { query } = await searchParams

  return (
    <div>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-[95vh] p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[15px] row-start-2 items-center sm:items-start">
          <div className="absolute top-6 right-6"><ModeToggle /></div>
          <MenuLanding />
        </main>
      </div>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        @Copyright Todo
      </footer>
    </div>
  );
}
