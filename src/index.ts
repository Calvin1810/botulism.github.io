import * as Plot from "@observablehq/plot";
import * as d3 from "d3";

interface Player {
  name: string;
  team: string;
  usg_pct: number;
  ts_pct: number;
  playoff_mp: number;
  playoff_usg_pct: number;
  playoff_ts_pct: number;
  playoff_mpg: number;
}

interface Case {
  state: string;
  year: string;
  bot_type: string;
  toxin_type: string;
  count: string;
  region: string;
}

interface Pop {
  name: string;
  geography: string;
  year: string;
  population: string;
  percent_change: string;
  resident_pop: string;
  reps: string;
  rep_change: string;
  apportionment: string
}

async function main(): Promise<void> {
  // const res = await fetch("data/players_2023.json");
  // const data = (await res.json()) as Array<Player>;
  const data: Array<Case> = await d3.csv("data/Botulism_20240122.csv");
  const pop_data: Array<Pop> = await d3.csv("data/population.csv");

  const barchart = Plot.plot({
    inset: 8,
    grid: true,
    color: {
      legend: true,
      label: "Number of Cases",
      // type: "categorical",
      scheme: "OrRd"
    },
    x: {
      ticks: d3.range(1910, 2020, 10),
      tickFormat: d => d.toString().replace(",", "")
    },
    y: {
      label: "Number of Cases"
    },
    marks: [
      // Plot.barY(data, {x: "Year", y: "Count", fill: "Count"})
      Plot.barY(data, Plot.groupX({y: "count", fill: "count"}, {x: "Year", tip: true})),
      //Plot.line(pop_data_US, {x: "Year", y: "Population"}),
      Plot.ruleY([0])
    ]
  })

  document.querySelector("#plot")?.append(barchart);

  // const new_data = data.filter(d => d.year === "2010");

  // //console.log(data);
  // console.log(data[0].year);

  // const adjusted_data = new_data.map(d => {
  //   const popObj = pop_data.find(
  //     pd => pd.name === d.region && pd.year === d.year
  //   );
  //   return {...d, Count: Number(d.count) / (popObj ? Number(popObj.population) : 1)};
  // });

  // const region_chart = Plot.plot({
  //   inset: 8,
  //   grid: true,
  //   color: {
  //     legend: true,
  //     type: "categorical",
  //     scheme: "OrRd"
  //   },
  //   y: {
  //     label: "Total Cases Per Capita"
  //   },
  //   marks: [
  //     Plot.barY(new_data,
  //               Plot.groupX({y: "count"},
  //                           {x: "Region", fill: "BotType", sort: {x: "-y"}, tip: true})),
  //     Plot.ruleY([0])
  //   ]
  // });

  // document.querySelector("#plot")?.append(region_chart);

}

window.addEventListener("DOMContentLoaded", async (_evt) => {
  await main();
});
