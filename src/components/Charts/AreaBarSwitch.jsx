import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function AreaBarSwitch({ chart, setChart, style }) {
  const TOGGLE_CLASSES =
    "font-medium flex items-center cursor-pointer px-3 md:pl-3 md:pr-3.5 text-lg py-2 md:py-1.5 transition-colors relative z-10"

  return (
    <div className={`flex flex-nowrap ${style}`}>
      <div className="border-1 relative flex w-fit items-center rounded-rounded border border-placeholderText">
        <p
          className={`${TOGGLE_CLASSES} ${
            chart === "area" ? "text-white" : "text-placeholderText"
          }`}
          onClick={() => {
            if (chart !== "area") {
              setChart("area")
            }
          }}
        >
          <span className="relative z-10 select-none">Area</span>
        </p>
        <p
          className={`${TOGGLE_CLASSES} ${
            chart === "bar" ? "text-white" : "text-placeholderText"
          }`}
          onClick={() => {
            if (chart !== "bar") {
              setChart("bar")
            }
          }}
        >
          <span className="relative z-10 select-none">Bar</span>
        </p>
        <div
          className={`absolute inset-0 z-0 flex ${
            chart === "bar" ? "justify-end" : "justify-start"
          }`}
        >
          <motion.span
            layout
            transition={{
              ease: "easeOut",
            }}
            className={`h-full w-1/2 transition-[border-radius] duration-700 ${chart === "bar" ? "rounded-r-rounded" : "rounded-l-rounded"} bg-primary`}
          />
        </div>
      </div>
    </div>
  )
}

export default AreaBarSwitch
