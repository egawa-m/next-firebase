import React, { Component } from 'react'
import Router from 'next/router'
import Link from './Link'
import '../static/scss/base.scss'
import css from '../static/scss/components/header.scss'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false,
      fixed: false
    }
    this.nav = React.createRef()
    this.drawerClick = this.drawerClick.bind(this)
    this.fixedNav = this.fixedNav.bind(this)
  }

  componentDidMount() {
    this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    this.navPos = this.nav.current.getBoundingClientRect().top + this.scrollTop
    window.addEventListener('scroll', this.fixedNav, true)
    window.addEventListener('load', this.fixedNav, true)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixedNav, true)
    window.removeEventListener('load', this.fixedNav, true)
  }

  fixedNav() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop >= this.navPos) {
      this.setState({
        fixed: true
      })
    } else {
      this.setState({
        fixed: false
      })
    }
  }

  drawerClick(e) {
    this.setState({
      toggle: !this.state.toggle
    })
    if (!this.state.toggle) {
      this.props.fixedFunc(true)
    } else {
      this.props.fixedFunc(false)
    }
  }

  render() {
    const toggle = this.state.toggle ? ' ' + css.open : ''
    const fixed = this.state.fixed ? ' ' + css.fixed : ''
    return (
      <header className={css.header}>
        <h1 className={css.heading}>{this.props.siteName}</h1>
        <div className={css.drawer + toggle} onClick={this.drawerClick}>
          <span className={css.burgar}>
            <span className={css.patty}></span>
          </span>
        </div>
        {this.state.toggle ? <div className={css.overlay} onClick={this.drawerClick}></div> : null}
        <nav ref={this.nav} className={css.nav + fixed + toggle}>
          <ul className={css.list}>
            <li>
              <Link activeClassName={css.current} href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link activeClassName={css.current} href="/about">
                <a>About</a>
              </Link>
            </li>
            <li>
              <Link activeClassName={css.current} href="/list">
                <a>List</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header