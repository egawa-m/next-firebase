import React, { Component } from 'react'
import Layout from '../components/Layout.js'

export default class Error extends Component {
  static getInitialProps({res, err}) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode }
  }

  render() {
    return (
      <Layout>
        <p>
          {this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : 'An error occured on client'
          }
        </p>
      </Layout>
    )
  }
}