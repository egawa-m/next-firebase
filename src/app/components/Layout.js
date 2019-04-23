import React, { Component } from 'react'
import Header from './Header'
import Footer from './Footer'
import css from '../static/scss/components/layout.scss'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      siteName: 'Next',
      fixedWrapper: false
    }
    this.wrapper = React.createRef()
  }

  fixedWrapper(state) {
    this.setState({fixedWrapper: state})
    if (state) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.wrapper.current.style.top = -scrollTop + 'px'
    } else {
      let scrollTop = -parseInt(this.wrapper.current.style.top)
      this.wrapper.current.style.top = ''
      setTimeout(() => {
        window.scrollTo(0, scrollTop)
      }, 0)
    }
  }

  render() {
    const fixed = this.state.fixedWrapper ? ' ' + css.fixed : ''
    return (
      <div ref={this.wrapper} className={css.layout + fixed}>
        <Header siteName={this.state.siteName} fixedFunc={(e) => {this.fixedWrapper(e)}} />
        <main className={css.main}>
          {this.props.children}
        </main>
        <Footer />
      </div>
    )
  }
}

export default Layout