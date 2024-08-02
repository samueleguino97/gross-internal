import React from "react";

function Page() {
  return (
    <div>
      <h1>Pedir Presupuesto</h1>
      <form className="flex flex-col">
        <div className="border border-gray-300 rounded-xl py-2 px-4">
          <label>
            Costo
            <input type="number" />
          </label>
          <label>
            Razon
            <textarea />
          </label>
        </div>
      </form>
    </div>
  );
}

export default Page;
