import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Layout from '../components/Layout'
import { getAllredcap } from '../data-provider/redcap';
import { Disease } from '../interfaces';
import { count, objToDf } from '../util/agregator';

type Props = {
  data: Disease[]
}

const RechartsPage = ({data}: Props) => {
  const counter = data.map(d => d.ecog).filter(e => e != "").reduce(count, {})
  const df = objToDf(counter)
  return (
    <Layout title="Recharts">
      <h1>Recharts</h1>
      <ResponsiveContainer width={500} height={300}>
        <BarChart
          width={500}
          height={300}
          data={df}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" name="Quantidade ECOG" fill="#c93e3e" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getAllredcap();
  return { props: { data } };
}

export default RechartsPage
