import Head from 'next/head'
import Layout from '../components/Layout.js'

export default () => (
  <Layout>
    <Head>
      <title>Home</title>
      <meta name="description" content="this is home" />
    </Head>
    <p>Hello Next.js</p>
  </Layout>
)