import Layout from '../components/Layout'
import { getAllredcap } from '../data-provider/redcap';
// import Plot from 'react-plotly.js';
import { Disease } from '../interfaces';
import { count, objToDf } from '../util/agregator';

type Props = {
  data: Disease[]
}

const PlotilyPage = ({data}: Props) => {
  const counter = data.map(d => d.ecog).filter(e => e != "").reduce(count, {})
  const df = objToDf(counter)
  return (
    <Layout title="plotily">
      <h1>Plotily</h1>
      <div>Não consegui nem rodar o exemplo</div>
      {/* <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
          { type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 320, height: 240, title: 'A Fancy Plot' }} /> */}
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getAllredcap();
  return { props: { data } };
}

export default PlotilyPage
