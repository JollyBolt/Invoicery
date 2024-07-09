import React from "react";

const Stats = ({ title = "", number = 0, icon }) => {
  return (
    <div className="col-span-2 flex flex-col rounded-rounded bg-white p-5 py-8">
      <div className="flex items-center justify-between text-base">
        <p className="font-light uppercase">{title}</p>
        <p className="font-numbers text-2xl text-primary">{icon}</p>
      </div>
      <span className="flex h-full items-center font-numbers text-6xl font-semibold text-primary">
        {title == "Total Revenue" ? number.toLocaleString() : number}
      </span>
    </div>
  )
}

export default Stats;
