"use server";
import * as xmlrpc from "xmlrpc";
function getOdooProducts() {
  return new Promise((resolve) => {
    const url = "http://grosscafe.cloudpepper.site/";
    const db = "grosscafe.cloudpepper.site";
    const username = "admin";
    const password = "370649f740d18ffe470811c1bc2ae75278beb29c";
    const client = xmlrpc.createClient(`${url}/xmlrpc/2/common`);
    const models = xmlrpc.createClient(`${url}/xmlrpc/2/object`);

    client.methodCall(
      "authenticate",
      [db, username, password, ""],
      (err, val) => {
        if (err) {
          console.log(err);
        }
        const userId = val;
        models.methodCall(
          "execute_kw",
          [
            db,
            userId,
            password,
            "product.template",
            "search_read",
            [[["available_in_pos", "=", true]]],
            {
              fields: [
                "name",
                "list_price",
                "description_self_order",
                "pos_categ_ids",
                "default_code",
                "image_1024",
              ],
            },
          ],
          (err, val: any[]) => {
            if (err) {
              console.log(err);
            }
            const uniqueProds = val.filter((prod, index: number) => {
              return (
                val.findIndex((p) => p.name === prod.name) === index &&
                !prod.name?.toLowerCase().includes("promo")
              );
            });
            return resolve(uniqueProds as any[]);
          },
        );
      },
    );
  });
}
function getOdooCategories() {
  return new Promise((resolve) => {
    const url = "http://grosscafe.cloudpepper.site/";
    const db = "grosscafe.cloudpepper.site";
    const username = "admin";
    const password = "370649f740d18ffe470811c1bc2ae75278beb29c";
    const client = xmlrpc.createClient(`${url}/xmlrpc/2/common`);
    const models = xmlrpc.createClient(`${url}/xmlrpc/2/object`);

    client.methodCall(
      "authenticate",
      [db, username, password, ""],
      (err, val) => {
        if (err) {
          console.log(err);
        }
        const userId = val;
        models.methodCall(
          "execute_kw",
          [
            db,
            userId,
            password,
            "pos.category",
            "search_read",
            [[]],
            {
              fields: ["id", "name"],
            },
          ],
          (err, val: any[]) => {
            if (err) {
              console.log(err);
            }
            return resolve(val as any[]);
          },
        );
      },
    );
  });
}
export async function getProducts() {
  const prods = await getOdooProducts();
  return prods as any[];
}
export async function getCategories() {
  const categs = await getOdooCategories();
  return categs as any[];
}
