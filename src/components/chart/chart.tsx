import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export const dataset = [
  {
    "jus de tangawizi": 59,
    "jus de mangue": 57,
    "jus de bissap": 86,
    "jus de tondolo": 21,
    month: "Jan",
  },
  {
    "jus de tangawizi": 50,
    "jus de mangue": 52,
    "jus de bissap": 78,
    "jus de tondolo": 28,
    month: "Feb",
  },
  {
    "jus de tangawizi": 47,
    "jus de mangue": 53,
    "jus de bissap": 106,
    "jus de tondolo": 41,
    month: "Mar",
  },
  {
    "jus de tangawizi": 54,
    "jus de mangue": 56,
    "jus de bissap": 92,
    "jus de tondolo": 73,
    month: "Apr",
  },
  {
    "jus de tangawizi": 57,
    "jus de mangue": 69,
    "jus de bissap": 92,
    "jus de tondolo": 99,
    month: "May",
  },
  {
    "jus de tangawizi": 60,
    "jus de mangue": 63,
    "jus de bissap": 103,
    "jus de tondolo": 144,
    month: "June",
  },
  {
    "jus de tangawizi": 59,
    "jus de mangue": 60,
    "jus de bissap": 105,
    "jus de tondolo": 319,
    month: "July",
  },
  {
    "jus de tangawizi": 65,
    "jus de mangue": 60,
    "jus de bissap": 106,
    "jus de tondolo": 249,
    month: "Aug",
  },
  {
    "jus de tangawizi": 51,
    "jus de mangue": 51,
    "jus de bissap": 95,
    "jus de tondolo": 131,
    month: "Sept",
  },
  {
    "jus de tangawizi": 60,
    "jus de mangue": 65,
    "jus de bissap": 97,
    "jus de tondolo": 55,
    month: "Oct",
  },
  {
    "jus de tangawizi": 67,
    "jus de mangue": 64,
    "jus de bissap": 76,
    "jus de tondolo": 48,
    month: "Nov",
  },
  {
    "jus de tangawizi": 61,
    "jus de mangue": 70,
    "jus de bissap": 103,
    "jus de tondolo": 25,
    month: "Dec",
  },
];

export function valueFormatter(value: number | null) {
  return `${value}`;
}

const chartSetting = {
  height: 400,
  sx: {
    width: "100%",
  },
};

export default function BarsDataset() {
  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        {
          dataKey: "jus de tangawizi",
          label: "jus de tangawizi",
          valueFormatter,
        },
        { dataKey: "jus de mangue", label: "jus de mangue", valueFormatter },
        { dataKey: "jus de bissap", label: "jus de bissap", valueFormatter },
        { dataKey: "jus de tondolo", label: "jus de tondolo", valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
