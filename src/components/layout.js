/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 700,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
            backgroundColor: `#f3df49`,
          }}
        >
          <main>{children}</main>
        </div>
        <footer
          style={{
            marginTop: `4em`,
            padding: `2em`,
            background: `#2e2e2c`,
            color: `#fff`,
            fontSize: `0.8em`,
            textAlign: `center`,
          }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a
            style={{
              color: `#fff`,
              opacity: 0.75,
              "&:hover": {
                opacity: 1,
              },
            }}
            href="https://www.gatsbyjs.org"
          >
            Gatsby
          </a>
        </footer>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
