import PageWrapper from "../hoc/PageWrapper";
import Heading from '../components/Heading'

const Customers = () => {

  return (
    <div 
    >
      <Heading name="Customers"/>

    </div>
  );
};

export default PageWrapper(Customers,'customers');
