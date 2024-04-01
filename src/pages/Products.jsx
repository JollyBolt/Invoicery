import Heading from '../components/Heading'
import PageWrapper from '../hoc/PageWrapper'

const Products = () => {
  return (
    <div>
      <Heading name="Products"/>
    </div>
  )
}

export default PageWrapper(Products,'products')