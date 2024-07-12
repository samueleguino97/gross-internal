"use client";
import { $activeCategory } from "@/stores/menu";
import { useStore } from "@nanostores/react";
import React from "react";

function Categories({ categs }: { categs: any[] }) {
  const activeCategory = useStore($activeCategory);
  const excludedCategories: number[] = [13, 4, 12];
  return (
    <div className="flex sticky top-0 gap-2 px-7 py-2 overflow-auto ">
      {categs?.map(
        (i) =>
          !excludedCategories.includes(i.id) && (
            <div
              onClick={() => {
                $activeCategory.set(i.id);
              }}
              className={
                activeCategory === i.id
                  ? "border cursor-pointer no-scrollbar border-[#92bbbb] flex w-24 min-w-24 items-center justify-center rounded-md px-4 py-2 text-center text-white bg-[#92bbbb] text-xs font-medium"
                  : "border cursor-pointer no-scrollbar border-[#92bbbb] flex w-24 min-w-24 items-center justify-center rounded-md px-4 py-2 text-center text-[#92bbbb] text-xs font-medium "
              }
              key={i.id}
            >
              {i.name}
            </div>
          ),
      )}
    </div>
  );
}

export default Categories;
