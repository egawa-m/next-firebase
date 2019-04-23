import React, { Component } from 'react'
import Layout from '../components/Layout.js'
import Link from 'next/link'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import css from '../static/scss/pages/list.scss'

class List extends Component {
  static async getInitialProps(context) {
    try {
      const part = 'id,snippet'
      const channelId = 'UCgMPP6RRjktV7krOfyUewqw,UCZf__ehlCEBPop-_sldpBUQ,UCibEhpu5HP45-w7Bq1ZIulw,UCFTVNLC7ysej-sD5lkLqNGA,UCQi67q4kGdmnJaRzX81uK5g,UCutJqz56653xV2wwSvut_hQ,UCX1xppLvuj03ubLio8jslyA,UCljYHFazflmGaDr5Lo90KmA,UCpOjLndjOqMoffA-fr8cbKA,UCHhXSfCzQYAAFkpdxr7QsaA'
      const apiKey = 'AIzaSyB2W77PW-Geeat7_0sCzRBfN-KynEKWTcs' || 'AIzaSyCB9fA75gM_KIeGPl1HdS2J2TLN3CqLYDU'
      const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=${part}&id=${channelId}&key=${apiKey}`)
      const data = await res.json()
      console.log(`Show data fetched. Count: ${data.items.length}`)
      return {
        items: data.items
      }
    } catch (e) {
      console.error(e)
      return {
        items: []
      }
    }
  }

  render() {
    return (
      <Layout>
        <Head>
          <title>List</title>
          <meta name="description" content="this is list" />
        </Head>
        <h1 className={css.title}>YouTube</h1>
        <ul className={css.list}>
          {this.props.items.map((item) => (
            <li key={item.id}>
              <Link as={`/p/${item.id}`} href={`/post?id=${item.id}`}>
                <a>
                  <div className={css.thumbnail}><img src={require(`../static/img/noimage.png`)} alt=""/></div>
                  <span className={css.text}>{item.snippet.title}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    )
  }
}

export default List