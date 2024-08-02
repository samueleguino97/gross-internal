"use client";
import React, { useEffect } from "react";

import { Julius_Sans_One } from "next/font/google";
import Script from "next/script";
import { Button, Input } from "@headlessui/react";
import Image from "next/image";
import clsx from "clsx";
import { handleRewardForm } from "./check";
import { useFormState, useFormStatus } from "react-dom";
const julius = Julius_Sans_One({ subsets: ["latin"], weight: ["400"] });
const initialState = {
  message: "",
  success: true,
};

function RewardsPage() {
  const [reviewed, setReviewed] = React.useState(false);

  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(handleRewardForm, initialState);
  useEffect(() => {
    if (state?.success && state.message === "Gracias por tu reseña!") {
      localStorage.setItem("reviewed", "true");
    }
    if (!state?.success) {
      (window as any).turnstile.reset(".cf-turnstile");
    }
  }, [state]);
  const [alreadyReviewed, setAlreadyReviewed] = React.useState(false);
  useEffect(() => {
    const reviewed = localStorage.getItem("reviewed");
    if (reviewed === "true") {
      setAlreadyReviewed(true);
    }
  }, []);
  if ((state?.message && state?.success) || alreadyReviewed) {
    return (
      <div className="p-4 container mx-auto">
        <Image
          height={48}
          className="block mb-4 mx-auto "
          src={"/logo.svg"}
          alt="logo"
          width={127}
        />
        <h1 className="text-xl" style={julius.style}>
          Gracias por tu reseña!
        </h1>
        <h1 className="text-xl" style={julius.style}>
          Nos ayuda a mejorar la cafetería para que sea más útil para todos.
        </h1>
      </div>
    );
  }
  return (
    <div className="p-4 container mx-auto">
      <Image
        height={48}
        className="block mb-4 mx-auto "
        src={"/logo.svg"}
        alt="logo"
        width={127}
      />
      <h1 className="text-xl" style={julius.style}>
        Obten un cafe de regalo llenando tu informacion y dejandonos una reseña
      </h1>
      <form action={formAction} className="flex flex-col mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            className="px-4 py-2 border border-gray-200 focus:outline-offset-2 focus:outline-sky-300 "
            required
            name="name"
            placeholder="Nombre Completo"
          />
          <Input
            required
            className="px-4 py-2 border border-gray-200 focus:outline-offset-2 focus:outline-sky-300 "
            name="email"
            placeholder="Email"
            type="email"
          />
          <Input
            required
            className="px-4 py-2 border border-gray-200 focus:outline-offset-2 focus:outline-sky-300 "
            name="phone"
            type="tel"
            placeholder="Telefono (sin el 591)"
          />
          <div className="flex items-center gap-2">
            <label>Fecha de Nacimiento</label>
            <Input
              required
              className="px-4 flex-1 py-2 border border-gray-200 focus:outline-offset-2 focus:outline-sky-300 "
              name="birthday"
              type="date"
              placeholder="Fecha de Nacimiento"
            />
          </div>
        </div>
        <div className="py-6 ">
          {reviewed ? (
            <div style={julius.style} className="text-sm">
              <p>Gracias por tu reseña!</p>
              <p>
                No olvides mandar tus datos para poder obtener un cafe de regalo
              </p>
            </div>
          ) : (
            <label
              onClick={() =>
                window.open("https://g.page/r/CW0oXTeULzszEBM/review", "_blank")
              }
              className={clsx(
                " border rounded-md  w-full cursor-pointer flex items-center justify-center py-2 px-4",
                {
                  "border-[#92bbbb] text-white ": reviewed,
                  "border-[#d97b52]": !reviewed,
                },
              )}
            >
              {reviewed ? "Gracias!" : "Dejar Reseña"}
              <input
                disabled={reviewed}
                type="checkbox"
                className="hidden"
                checked={reviewed}
                onChange={() => setReviewed(true)}
              />
            </label>
          )}
        </div>
        {state?.message && state?.success === false && (
          <div className="py-2 px-2 border border-red-300 rounded-md">
            {state?.message}
          </div>
        )}
        <div
          className="cf-turnstile"
          data-sitekey="0x4AAAAAAAgUrruQ95eNgKTC"
        ></div>
        <Button
          disabled={!reviewed || pending}
          type="submit"
          className="border cursor-pointer no-scrollbar border-[#92bbbb] transition-all flex w-24 min-w-24 items-center justify-center rounded-md px-4 py-2 text-center text-white bg-[#92bbbb]  text-xs font-medium disabled:opacity-40 disabled:bg-orange-400"
        >
          Enviar
        </Button>
      </form>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
    </div>
  );
}

export default RewardsPage;
