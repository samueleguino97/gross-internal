import { getSalesReport } from "@/funcs/odoo";
import React from "react";
import { SalesByHourChart, SalesByDayChart } from "./comps";
const Page = async (props: {}) => {
  const sales = await getSalesReport();
  const salesByHour = Array(24).fill(0);
  const salesByDay: any = {};
  sales.forEach((sale) => {
    const date = new Date(sale.date);

    date.setHours(date.getHours() - 4);
    const hour = date.getHours();

    const day = date.toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format

    // Increment the sales count for the hour
    salesByHour[hour]++;

    // Increment the sales count for the day
    if (!salesByDay[day]) {
      salesByDay[day] = 0;
    }
    salesByDay[day]++;
  });

  // Convert salesByDay to arrays for Chart.js
  const days = Object.keys(salesByDay);
  const daySales = Object.values(salesByDay);
  return (
    <div>
      <h2>Sales by Hour</h2>
      <SalesByHourChart data={salesByHour} />
      <h2>Sales by Day</h2>
      <SalesByDayChart days={days} daySales={daySales} />
    </div>
  );
};
export default Page;
