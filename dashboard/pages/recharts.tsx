import Layout from '../components/Layout'
import { getAllredcap } from '../data-provider/redcap';

const RechartsPage = () => (
  <Layout title="Recharts">
    <h1>Recharts</h1>
  </Layout>
)

export async function getStaticProps() {
  const data = await getAllredcap();
  return { props: { data } };
}

export default RechartsPage
