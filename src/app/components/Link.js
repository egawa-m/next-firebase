import { withRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = ({ router, children, as, href, ...props }) => {
  const child = Children.only(children)

  let className = child.props.className || null
  if ((router.asPath === href || router.asPath === as || (router.asPath.indexOf('/p/') !== -1 && href.indexOf('/list') !== -1)) && props.activeClassName) {
    className = `${className !== null ? className : ''} ${props.activeClassName}`.trim()
  }

  delete props.activeClassName

  return <Link {...props} href={href} as={as}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)