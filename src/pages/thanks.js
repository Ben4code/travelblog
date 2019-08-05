import React from 'react';
import Layout from '../components/layout';
import Nav from '../components/nav/index';
import SEO from '../components/seo'
import './contact.css'

const Thanks = () => (
    <Layout>
        <SEO title="Thank you page" description="Thank you for your feedback." />
        <Nav />
        <div className="conatct__header"></div>
        <div className="contact__thanks">
            <h1>Thank you! I'll be in touch with you soon.</h1>
        </div>
    </Layout>
)

export default Thanks;