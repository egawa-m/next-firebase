import Head from 'next/head'
import Layout from '../components/Layout.js'

export default () => (
  <Layout>
    <Head>
      <title>About</title>
      <meta name="description" content="this is about" />
    </Head>
    <p>This is the about page</p>
  </Layout>
)