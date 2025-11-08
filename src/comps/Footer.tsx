"use server";

import { getFooter } from "@/lib/footer";
import Link from "next/link";
import FooterItemComp from "./FooterItem";

export default async function FooterComp() {
  const footer = await getFooter();
  if (footer)
    return (
      <footer className="border-t-2 border-prim bg-bg2 py-4" id="footer">
        <div className="sm:container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-3.5 md:gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-base font-bold text-fg">{footer.title}</h3>
              {footer.bottomText != "" && (
                <div className="mt-3 text-grayout text-xs hidden md:block">
                  {footer.bottomText}
                </div>
              )}
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1.5 md:gap-x-6 md:gap-y-4 text-sm md:mt-px">
              {footer.footerItems?.map((footerItem) => (
                <FooterItemComp key={footerItem.id} url={footerItem.url}>
                  {footerItem.text}
                </FooterItemComp>
              ))}
            </div>
          </div>
          {footer.bottomText != "" && (
            <div className="mt-3.5 text-grayout text-xs text-center md:hidden">
              {footer.bottomText}
            </div>
          )}
        </div>
      </footer>
    );
}
