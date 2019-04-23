import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  // static getInitialProps({ renderPage }) {
  //   const { html, head, errorHtml, chunks } = renderPage()
  //   const styles = flush()
  //   return { html, head, errorHtml, chunks, styles }
  // }
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  // static async getInitialProps(ctx) {
  //   // const { html, head } = ctx.renderPage()
  //   // const styles = flush()
  //   // const initialProps = await Document.getInitialProps(ctx)
  //   // return { ...initialProps, html, head, styles }

  //   const originalRenderPage = ctx.renderPage
  //   const styles = flush()
  //   ctx.renderPage = () =>
  //     originalRenderPage({
  //       // useful for wrapping the whole react tree
  //       enhanceApp: App => App,
  //       // useful for wrapping in a per-page basis
  //       enhanceComponent: Component => Component, html, head, styles
  //     })

  //   // Run the parent `getInitialProps` using `ctx` that now includes our custom `renderPage`
  //   const initialProps = await Document.getInitialProps(ctx)

  //   return initialProps
  // }

  render() {
    return (
      <html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link rel="shortcut icon" href={require(`../static/favicon.ico`)} type="image/x-icon"></link>
          {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}