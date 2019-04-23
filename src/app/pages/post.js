import Layout from '../components/Layout.js'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'

const Post = (props) => (
  <Layout>
    <Head>
      <title>{props.item.snippet.title}</title>
      <meta name="description" content={`this is ${props.item.snippet.title}`} />
    </Head>
    <h1>{props.item.snippet.title}</h1>
    <p>{props.item.snippet.description.replace(/<[/]?p>/g, '')}</p>
    <img src={props.item.snippet.thumbnails.medium.url}/>
  </Layout>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const part = 'id,snippet,brandingSettings,contentDetails,invideoPromotion,statistics,topicDetails'
  const apiKey = 'AIzaSyB2W77PW-Geeat7_0sCzRBfN-KynEKWTcs' || 'AIzaSyCB9fA75gM_KIeGPl1HdS2J2TLN3CqLYDU'
  const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${id}&key=${apiKey}`)
  const item = await res.json()

  console.log(`Fetched show: ${item.items[0].snippet.title}`)

  return { item: item.items[0] }
}

export default Post