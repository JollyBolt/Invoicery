import React from "react"

function Skeleton() {
  return (
    <div className="grid w-full grid-cols-8 gap-4">

      <div className="skeleton col-span-2 h-[120px] rounded-rounded"></div>
      <div className="skeleton col-span-2 rounded-rounded"></div>
      <div className="skeleton col-span-2 rounded-rounded"></div>
      <div className="skeleton col-span-2 rounded-rounded"></div>

<div className="col-span-8 ro skeleton rounded-rounded h-[300px]"></div>
<div className="col-span-5 skeleton rounded-rounded h-[300px]"></div>
<div className="col-span-3 skeleton rounded-rounded h-[300px]"></div>
    </div>
  )
}

export default Skeleton
