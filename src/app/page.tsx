import NavbarItem from "@/comps/NavbarItem";
import SkillItem from "@/comps/SkillItem";
import useDragScroll from "@/comps/useDragScroll";
import WorkItem from "@/comps/WorkItem";
import Works from "@/comps/Works";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="h-svh  flex flex-col">
        <div className="w-full shadow-md border-b-2 border-prim">
          <div className="container mx-auto">
            <div className="flex h-16 mx-6">
              <div className=" font-black flex items-center">
                <Image src="/showtech.png" width={300} height={80} alt="Logo" />
              </div>
              <div className="flex justify-end h-full w-full">
                <NavbarItem url="/gugu">Leistungen</NavbarItem>
                <NavbarItem url="/gaga">Kontakt</NavbarItem>
                <NavbarItem url="/gaga">Preise</NavbarItem>
                <NavbarItem url="/gugu">Musik</NavbarItem>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow striped-background border-b-2 border-prim">
          <div className="container mx-auto h-full flex items-center">
            <div className="mx-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                <div className="flex items-center mx-auto">
                  <div className="gap-4 grid grid-cols-1">
                    <h1 className="font-bold text-5xl text-center">
                      Guter Sound? Kein Zufall!
                    </h1>
                    <p className="text-center text-lg">
                      Staatlich geprüfter Veranstaltungstechniker für Bühnen in
                      Villach und ganz Kärnten seit über 100 Jahren
                    </p>
                    <button className="rounded-lg border-2 border-prim text-xl py-2 text-prim hover:bg-prim hover:text-fg transition-all cursor-pointer">
                      Jetzt anfragen!
                    </button>
                  </div>
                </div>
                <div>
                  <Image
                    src="/js.jpg"
                    height={1300}
                    width={1300}
                    className="rounded-xl w-full"
                    alt="flowers"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 mb-20 items-start">
            <SkillItem title="Lichttechnik">
              Lichttechnik oder Beleuchtungstechnik bezeichnet alle technischen
              Maßnahmen, die dazu dienen, Lichtverhältnisse zu beeinflussen.{" "}
            </SkillItem>
            <SkillItem title="Tontechnik">
              Tontechnik ist der Oberbegriff für technische Geräte, die der
              Umwandlung, Bearbeitung, Aufzeichnung (Speicherung) und Wiedergabe
              von akustischen Ereignissen
            </SkillItem>
            <SkillItem title="Julius Stöffler">
              Nicht immer stellt uns das zufrieden, was uns technisch ermöglicht
              wird. Häufig überfordert es uns.{" "}
            </SkillItem>
          </div>
          <div className="">
            <div className="text-center mb-8">
              <h1 className="font-bold text-5xl mb-2">Leistungen</h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Reiciendis molestiae dolorum minima? Facere doloribus id
                delectus dolorem reiciendis illo quidem. Ea dolor tenetur
                placeat incidunt ipsam, ducimus libero natus repellendus. Lorem
                ipsum dolor sit amet, consectetur adipisicing elit. Provident
                voluptas vero similique enim. Ducimus ratione ex ipsam officia
                dolores amet, impedit maxime autem iusto ut expedita? Cum vitae
                minima ut.
              </p>
            </div>
          </div>
        </div>{" "}
        <Works />
      </main>
      <footer className="border-t-2 border-prim text-center pt-4 pb-4 mt-12 bg-bg2">
        What the GIM
      </footer>
    </div>
  );
}
