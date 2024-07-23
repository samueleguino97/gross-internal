import { getSalesReport, getProducts } from "@/funcs/odoo";

import { MostSoldProductsChart } from "../comps";
async function Products() {
  const sales = await getSalesReport();
  const prods = await getProducts();
  const productCounts = sales.reduce((acc, sale) => {
    const productId = sale.product_tmpl_id;
    if (!acc[productId]) {
      acc[productId] = 0;
    }
    acc[productId]++;
    return acc;
  }, {});

  // Convert to array and sort by count
  const sortedProducts = Object.entries(productCounts)
    .map(([product_tmpl_id, count]) => ({
      product_tmpl_id,
      count: count as number,
    }))
    .sort((a, b) => b.count - a.count);
  console.log(sortedProducts);
  return (
    <div>
      <h2>Most Sold Products</h2>
      <MostSoldProductsChart data={sortedProducts} />
    </div>
  );
}

export default Products;
