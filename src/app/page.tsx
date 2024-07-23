import React from "react";

import { Julius_Sans_One } from "next/font/google";

import Image from "next/image";
import Categories from "./menu/categories";
import Products from "./menu/products";
import { getCategories, getProducts } from "@/funcs/odoo";

const julius = Julius_Sans_One({ subsets: ["latin"], weight: ["400"] });
export const revalidate = 3600;

async function Menu() {
  const [categs, prods] = await Promise.all([getCategories(), getProducts()]);
  return (
    <div className="py-7 text-[#2b2b2b] max-w-96 md:container  mx-auto">
      <Image
        height={48}
        className="block  mx-auto "
        src={"/logo.svg"}
        alt="logo"
        width={127}
      />
      <div className="pt-4 px-7">
        <h1 className="text-3xl" style={julius.style}>
          Por la semana de la amistad
        </h1>
        <div className="flex flex-col pt-2 gap-3">
          <Image
            width={200}
            height={200}
            className="rounded-md w-full h-52 aspect-video object-cover"
            src={"/promo.jpg"}
            alt="promo"
          />
          <div className="flex flex-col justify-between  text-left">
            <div className="flex flex-col">
              <span className="text-xs text-[#c3c3c3] font-medium">
                2
                <span className="text-[#2b2b2b] font-medium">
                  {" "}
                  Cocteles de Fruta
                </span>
              </span>
              <span className="text-xs text-[#c3c3c3] font-medium">
                2
                <span className="text-[#2b2b2b] font-medium">
                  {" "}
                  Jugos de Fruta
                </span>
              </span>
            </div>
            <div className="text-5xl ">
              25 <span className="text-[#d97b52]">Bs</span>
            </div>
            <div>
              <span className="text-[8px] text-[#c3c3c3]">
                Disponibilidad solo en local
              </span>
              <a
                href={`https://wa.me/59165344065?text=${"Hola, quiero reservar una mesa para S'mores en el local."}`}
                target="_blank"
                className={
                  "rounded-md px-4 py-2 bg-[#d97b52] text-xs font-medium text-white flex items-center justify-center"
                }
              >
                Reservar Mesa
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6 overflow-hidden">
        <h1 className="text-3xl px-7 sticky" style={julius.style}>
          Menu
        </h1>
        <Categories categs={categs} />
        <Products products={prods} />
      </div>
    </div>
  );
}

export default Menu;
