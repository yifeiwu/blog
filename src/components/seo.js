/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, title, children }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              linkedIn
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta
        name="google-site-verification"
        content="9i8guQbcNxuh2qqwvV4eGCAworXyrws4DzUJmAIgtVg"
      />
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="linkedIn:card" content="summary" />
      <meta
        name="linkedIn:creator"
        content={site.siteMetadata?.social?.linkedIn || ``}
      />
      <meta name="linkedIn:title" content={title} />
      <meta name="linkedIn:description" content={metaDescription} />
      {children}
    </>
  )
}

export default Seo
