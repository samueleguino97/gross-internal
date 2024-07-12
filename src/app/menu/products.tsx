"use client";
import { $activeCategory } from "@/stores/menu";
import { useStore } from "@nanostores/react";
import React from "react";

import { Julius_Sans_One } from "next/font/google";
import Image from "next/image";
const julius = Julius_Sans_One({ subsets: ["latin"], weight: ["400"] });
function Products({ products }: { products: any[] }) {
  const activeCategory = useStore($activeCategory);
  return (
    <div className="px-7 flex flex-col gap-6 pt-6">
      {products
        .filter((p) => p.pos_categ_ids.includes(activeCategory))
        .map((i, index) => (
          <div
            className={
              index % 2 !== 0
                ? " gap-2 flex flex-row-reverse w-full"
                : " gap-2 flex w-full h-max"
            }
            key={i.name}
          >
            <div className="flex text-[#2b2b2b] flex-col gap-1 flex-1">
              <h4 className="text-sm " style={julius.style}>
                {i.name}
              </h4>
              {!!i.description_self_order && (
                <p
                  className="text-xs font-medium"
                  dangerouslySetInnerHTML={{ __html: i.description_self_order }}
                ></p>
              )}
              <span>
                35
                <span className="text-[#d97b52] text-lg"> Bs</span>
              </span>
            </div>
            {!!i.image_1024 && (
              <div className="rounded-md w-24 h-24 relative  px-4 py-2 bg-[#d97b52] text-xs font-medium text-white flex items-center justify-center">
                {!!i.image_1024 && (
                  <Image
                    className="rounded-md object-cover h-full w-full aspect-square"
                    fill
                    src={`data:image/jpg;base64, ${i.image_1024}`}
                    alt={i.name}
                  />
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default Products;
