import React from "react";

const Stats = ({ title = "", number = 0, icon }) => {
  return (
    <div className="col-span-2 flex flex-col gap-3 rounded-rounded bg-background p-5 py-8">
      <div className="flex items-center justify-between text-base">
        <p className="font-light uppercase text-foreground">{title}</p>
        <p className="font-numbers text-2xl text-primary">{icon}</p>
      </div>
      <span className="flex h-full items-center font-numbers text-5xl font-semibold text-primary">
        {title == "Total Revenue" ? number.toLocaleString("en-IN") : number}
      </span>
    </div>
  )
}

export default Stats;
