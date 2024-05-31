import React from 'react'

const ProductField = ({index,name,hsncode,price,currentPage}) => {
    return (
        <div
            className={`h-14 overflow-hidden border-sate-400 border-b`}
        >
            <div
                className={`w-full h-full flex flex-nowrap items-center justify-between py-2 px-5 border-x font-light`}
            >
                <h3 className=" capitalize w-1/4 font-light ">{index}</h3>
                <h3 className=" capitalize w-1/4 font-light ">{name}</h3>
                <h4 className="  w-1/4">{hsncode}</h4>
                <h4 className=" w-1/4">{price}</h4>
            </div>
        </div>
    )
}

export default ProductField