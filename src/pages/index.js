import React from "react"

import Layout from "../components/layout"
import Nav from "../components/nav/index"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Nav/>
  </Layout>
)

export default IndexPage