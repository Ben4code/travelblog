import React from "react"
import {Link} from 'gatsby'
import Layout from "../components/layout"
import Nav from "../components/nav/index"
import SEO from "../components/seo"
import Home from '../components/home/index'
import Featured from '../components/featured/index'
import Footer from '../components/footer/index'
import './index.css'


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Nav/>
    <Featured/>
    <Home/>
    <Link to="/blog" className="viewmore">View More</Link>
    <Footer/>
  </Layout>
)

export default IndexPage
