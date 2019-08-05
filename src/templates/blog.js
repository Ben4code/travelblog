import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Nav from '../components/nav/index'
import SEO from '../components/seo'
import './blog.css'

export const query = graphql`
    query BlogTemplate($id: String!){
        contentfulBlog(id: {eq: $id}){
            tItle
            id
            slug
            content{
                childMarkdownRemark {
                    html
                }
            }
            seoTitle
            seoDescription
            seoAuthor
            seoKeywords
            seoImage {
                fluid(maxWidth: 1200, quality: 100){
                    ...GatsbyContentfulFluid
                    src
                }
            }
            featuredImage {
                fluid(maxWidth: 1200, quality: 100){
                    ...GatsbyContentfulFluid
                    src
                }
            }
        }
    }
`

const Blog = ({ data }) => {
    console.log({ data });
    return (
        <div>
            <Layout>
                <SEO title={data.contentfulBlog.seoTitle}
                    description={data.contentfulBlog.seoDescrioption}
                    keywords={data.contentfulBlog.seoKeywords} />
                <Nav />
                <div className="blog__header">
                    <div className="blog__hero" style={{ backgroundImage: `url(${data.contentfulBlog.featuredImage.fluid.src})` }}></div>
                    <div className="blog__info">
                        <h1 className="blog__title">{data.contentfulBlog.tItle}</h1>
                    </div>
                </div>

                <div className="blog__wrapper">
                    <div className="blog__content">
                        <div dangerouslySetInnerHTML={{ __html: `${data.contentfulBlog.content.childMarkdownRemark.html}`}}></div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}
export default Blog;