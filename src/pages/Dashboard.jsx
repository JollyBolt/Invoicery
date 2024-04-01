import React from 'react'
import PageWrapper from '../hoc/PageWrapper'
import Heading from '../components/Heading'

const Dashboard = () => {
  return (
    <div>
      <Heading name="Dashboard"/>
    </div>
  )
}

export default PageWrapper( Dashboard ,'dashboard')