import React from 'react';
import Layout from '../components/layout';
import Nav from '../components/nav/index';
import SEO from '../components/seo'
import './contact.css'

const Contact = () => (
    <Layout>
        <SEO title="Contact" description="Contact the owner of the blog." />
        <Nav />
        <div className="contact__header"></div>
            <div className="contact__section">
                <div className="contact__form">
                    <h1>Contact</h1>
                    <form method="post" action="/thanks" name="contact" data-netlify="true" netlify-honeypot='bot'>
                    <input type="hidden" name="form-name" value="contact"/>
                    <div className="field__hidden">
                        <label>Don't fill this out, human </label>
                        <input name="bot" />
                    </div>

                    <div className="field">
                        <label>Name</label>
                        <input name="name" type="text"/>
                    </div>

                    <div className="field">
                        <label>Email</label>
                        <input name="email" type="email"/>
                    </div>

                    <div className="field">
                        <label>Message</label>
                        <textarea name="message" row="6"></textarea>
                    </div>
                    <div className="submit">
                        <button type="submit" className="btn__med">Send</button>
                    </div>
                    </form>
                </div>
            </div>
    </Layout>
)

export default Contact;