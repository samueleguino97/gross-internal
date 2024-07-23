"use client";
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const SalesByHourChart = ({ data }: { data: any[] }) => {
  const chartData = data.map((count, hour) => ({
    hour: `${hour}:00`,
    sales: count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const SalesByDayChart = ({
  days,
  daySales,
}: {
  days: any[];
  daySales: any[];
}) => {
  const chartData = days.map((day, index) => ({ day, sales: daySales[index] }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};
export const MostSoldProductsChart = ({ data }: { data: any[] }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="product_tmpl_id" width={200} />

        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
