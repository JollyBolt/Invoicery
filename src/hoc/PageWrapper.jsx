import React from 'react'

const PageWrapper = (Component,idName) =>function HOC(props) {
    return (
      <section 
      id={idName}
      className=' w-full px-5 py-5 min-h-[100dvh] '
      >
          <Component {...props}/>
      </section>
    )
}

export default PageWrapper