import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function Mr_Ms_Mrs({ selected, setSelected }) {
  const TOGGLE_CLASSES =
    "font-medium flex items-center justify-center cursor-pointer w-[50px] px-3 text-lg transition-colors relative z-10"
  return (
    <div className="flex h-[55px] w-2/5 flex-nowrap">
      <div className="border-1 relative flex w-fit items-center justify-between rounded-rounded border border-gray-300">
        <p
          className={`${TOGGLE_CLASSES} ${
            selected === "Mr" ? "text-white" : "text-slate-400"
          }`}
          onClick={() => {
            setSelected("Mr")
          }}
        >
          <span className="relative z-10">Mr</span>
        </p>
        <p
          className={`${TOGGLE_CLASSES} ${
            selected === "Ms" ? "text-white" : "text-slate-400"
          }`}
          onClick={() => {
            setSelected("Ms")
          }}
        >
          <span>Ms</span>
        </p>
        <p
          className={`${TOGGLE_CLASSES} ${
            selected === "Mrs" ? "text-white" : "text-slate-400"
          }`}
          onClick={() => {
            setSelected("Mrs")
          }}
        >
          <span className="relative z-10">Mrs</span>
        </p>
        <div
          className={`absolute inset-0 z-0 flex ${
            selected === "Mrs"
              ? "justify-end"
              : selected === "Mr"
                ? "justify-start"
                : "justify-center"
          }`}
        >
          <motion.span
            layout
            transition={{
              ease: "easeOut",
            }}
            className={`h-full w-1/3 transition-[border-radius] duration-700 ${selected === "Mrs" ? "rounded-r-rounded" : selected === "Mr" ? "rounded-l-rounded" : ""} bg-primary`}
          />
        </div>
      </div>
    </div>
  )
}

export default Mr_Ms_Mrs
