import React from 'react'

const PageWrapper = (Component,idName) =>function HOC(props) {
    return (
      <section 
      id={idName}
      className=' w-full px-20 py-10 min-h-[100dvh] bg-white'
      >
          <Component {...props}/>
      </section>
    )
}

export default PageWrapper