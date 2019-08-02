import React from "react"
import Layout from "../components/layout"
import Nav from "../components/nav/index"
import SEO from "../components/seo"
import Featured from '../components/featured/index'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Nav/>
    <Featured/>
  </Layout>
)

export default IndexPage
