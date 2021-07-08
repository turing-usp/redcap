import Layout from '../components/Layout'
import { getAllredcap } from '../data-provider/redcap';

const D3Page = () => (
  <Layout title="D3js">
    <h1>D3js</h1>
  </Layout>
)

export async function getStaticProps() {
  const data = await getAllredcap();
  return { props: { data } };
}

export default D3Page
