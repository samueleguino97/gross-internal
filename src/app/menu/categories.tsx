"use client";
import { $activeCategory } from "@/stores/menu";
import { useStore } from "@nanostores/react";
import React from "react";

function Categories({ categs }: { categs: any[] }) {
  const activeCategory = useStore($activeCategory);
  const excludedCategories: number[] = [13, 4, 12];
  return (
    <div className="relative">
      <svg
        className="w-4 h-4 top-[50%] -translate-y-1/2 aspect-square absolute right-2 opacity-75 animate-pulse  "
        width="88"
        height="163"
        viewBox="0 0 88 163"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.5 6L82 81.5L6.5 157"
          stroke="#1E1E1E"
          stroke-width="32"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <div className="flex gap-2 px-7 py-2 overflow-auto relative ">
        {categs?.map(
          (i) =>
            !excludedCategories.includes(i.id) && (
              <div
                onClick={() => {
                  $activeCategory.set(i.id);
                }}
                className={
                  activeCategory === i.id
                    ? "border cursor-pointer no-scrollbar border-[#92bbbb] transition-all flex w-24 min-w-24 items-center justify-center rounded-md px-4 py-2 text-center text-white bg-[#92bbbb] text-xs font-medium"
                    : "border cursor-pointer no-scrollbar border-[#92bbbb] transition-all flex w-24 min-w-24 items-center justify-center rounded-md px-4 py-2 text-center text-[#92bbbb] text-xs font-medium "
                }
                key={i.id}
              >
                {i.name}
              </div>
            ),
        )}
      </div>
    </div>
  );
}

export default Categories;
