import { Julius_Sans_One } from "next/font/google";
import Image from "next/image";

const julius = Julius_Sans_One({ subsets: ["latin"], weight: ["400"] });
async function getProducts() {
  const res = await fetch("https://menu.gross.cafe//api", {
    cache: "no-store",
  });
  const prods: {
    name: string;
    list_price: number;
    description_self_order: string;
    pos_categ_ids: string[];
    code: string;
  }[] = await res.json();

  //filter repeated names
  const uniqueProds = prods.filter((prod, index) => {
    return (
      prods.findIndex((p) => p.name === prod.name) === index &&
      prod.code !== "DISC"
    );
  });
  return uniqueProds;
}
async function getCategories() {
  const res = await fetch("https://menu.gross.cafe/api/categories", {
    cache: "no-store",
  });
  const categs: { id: string; name: string; code: string }[] = await res.json();
  return categs;
}
export default async function Home() {
  const prods = await getProducts();
  const categs = await getCategories();

  return (
    <main className=" bg-[#123d51] grid  md:gap-4 min-h-screen  text-white">
      <Image
        height={200}
        className="block mx-auto mt-10 mb-4"
        src={"/logo.svg"}
        alt="logo"
        width={200}
      />
      {categs?.map(
        (i, index) =>
          prods.filter(
            (p) =>
              p.pos_categ_ids.includes(i.id) &&
              p.list_price !== 0 &&
              p.list_price !== 1,
          ).length > 0 && (
            <div
              key={i.name}
              className={
                index % 2 === 0
                  ? "px-4 bg-[#123d51] py-4"
                  : "px-4 py-4 text-[#123d51] bg-white"
              }
            >
              <div className="py-2 w-full text-4xl " style={julius.style}>
                {i.name}
              </div>
              <div className=" p-2 grid gap-4 md:grid-cols-2">
                {prods
                  .filter(
                    (p) =>
                      p.pos_categ_ids.includes(i.id) &&
                      p.list_price !== 0 &&
                      p.list_price !== 1,
                  )
                  .map((i) => (
                    <div key={i.name}>
                      <div className="flex items-center">
                        <span className="w-60 text-2xl"> {i.name}</span>{" "}
                        <span className="font-bold text-2xl">
                          {i.list_price}Bs.
                        </span>
                      </div>
                      <div className="  text-xl text-gray-400">
                        {i.description_self_order ? (
                          <p
                            dangerouslySetInnerHTML={{
                              __html: i.description_self_order,
                            }}
                          ></p>
                        ) : null}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ),
      )}
    </main>
  );
}
