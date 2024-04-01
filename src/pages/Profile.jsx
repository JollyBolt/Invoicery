import Heading from '../components/Heading'
import PageWrapper from '../hoc/PageWrapper'

const Profile = () => {
  return (
    <div>
      <Heading name="Profile"/>
    </div>
  )
}

export default PageWrapper( Profile ,'profile' )