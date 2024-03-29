import React from 'react';
import { graphql, navigate, Link } from 'gatsby';
import { window } from 'browser-monads';
import Layout from '../components/layout';
import Nav from '../components/nav/index';
import SEO from '../components/seo'
import '../components/home/home.css'
import './archive.css'
import headerImage from '../images/general-header-image.jpg'


const Tech = (props) => {
    const blogContent = props.data.allContentfulBlog
    const { currentPage, numPages } = props.pageContext;
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 ? '/category/tech' : `category/tech/${currentPage - 1}`;
    const nextPage = `/category/tech/${currentPage + 1}`

    
    

    return (
        <Layout>
            <SEO title="Blog" keywords={['tech', 'tech blog', 'tech photography']} />
            <Nav />

            <header>
                <div className="archive__section">
                    <div className="archive_hero" style={{ background: `url(${headerImage})` }}></div>
                    <div className="archive__nav">
                        <Link to="/blog" className={window.location.href.indexOf('/blog') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>All</Link>
                        <Link to="category/travel" className={window.location.href.indexOf('category/travel') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Travel</Link>
                        <Link to="category/guide" className={window.location.href.indexOf('category/guide') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Guide</Link>
                        <Link to="category/opinion" className={window.location.href.indexOf('category/opinion') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Opinion</Link>
                        <Link to="category/tech" className={window.location.href.indexOf('category/tech') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Tech</Link>
                    </div>
                </div>
            </header>
            <div className="feed">
                {blogContent.edges.map(edge => (
                    <div key={edge.node.id} className="card"
                        style={{
                            backgroundImage: `linear-gradient(
                            to bottom,
                            rgba(10,10,10, 0) 0%,
                            rgba(10,10,10, 0) 50%,
                            rgba(10,10,10, 0.7) 100%),
                            url(${edge.node.featuredImage.fluid.src})`
                        }}
                        onClick={() => navigate(`/blog/${edge.node.slug}`)}
                    >
                        {edge.node.category.map(category => (
                            <p key={category.id} className="card__category">{category.title}</p>
                        ))}
                        <p className="card__title">{edge.node.tItle}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <div className="pagination__item">
                    {!isFirst && (<Link to={prevPage} rel='prev'> <div className="arrow__back"></div> </Link>)}
                </div>

                <div className="pagination__item">
                    {!isLast && (<Link to={nextPage} rel='next'> <div className="arrow__next"></div> </Link>)}
                </div>
            </div>
        </Layout>

    )
}

export default Tech;

export const pageQuery = graphql`
    query TechQuery ($skip: Int!, $limit: Int!){
        allContentfulBlog(
            sort:{ fields: [createdAt], order: DESC }
            filter: {
                node_locale: {eq: "en-US"}, 
                category: {elemMatch: {title: {eq: "Tech"}}}
            }
            skip: $skip
            limit: $limit
        ){
            edges{
                node{
                    id
                    slug
                    tItle
                    createdAt
                    category{
                        title
                        id
                    }
                    featuredImage {
                        fluid(maxWidth: 1200, quality: 85){
                            src
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
    }
`
