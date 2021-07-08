import Layout from '../components/Layout'
import { getAllredcap } from '../data-provider/redcap';

const PlotilyPage = () => (
  <Layout title="plotily">
    <h1>plotily</h1>
  </Layout>
)

export async function getStaticProps() {
  const data = await getAllredcap();
  return { props: { data } };
}

export default PlotilyPage
