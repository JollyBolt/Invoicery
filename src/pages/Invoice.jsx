import PageWrapper from '../hoc/PageWrapper'
import Heading from '../components/Heading'


const Invoice = () => {
  return (
    <div>
      <Heading name="Invoice"/>
    </div>
  )
}

export default PageWrapper(Invoice,'invoice') 