const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Run graphql queries
  const result = await graphql(`
    {
      allContentfulBlog( sort: {fields: [createdAt], order: DESC}, filter: {node_locale: {eq: "en-US"}}) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }

  `)

    // Run travel graphql queries
  const travelResult = await graphql(`
  {
    allContentfulBlog(
      sort: {fields: [createdAt], order: DESC}, 
      filter: {
        node_locale: {eq: "en-US"}, 
        category: {elemMatch: {title: {eq: "Travel"}}}
      }
    )   
    {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`)

  // Run guide graphql queries
  const guideResult = await graphql(`
  {
    allContentfulBlog(
      sort: {fields: [createdAt], order: DESC}, 
      filter: {
        node_locale: {eq: "en-US"}, 
        category: {elemMatch: {title: {eq: "Guide"}}}
      }
    )   
    {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`)

// Run opinion graphql queries
const opinionResult = await graphql(`
{
  allContentfulBlog(
    sort: {fields: [createdAt], order: DESC}, 
    filter: {
      node_locale: {eq: "en-US"}, 
      category: {elemMatch: {title: {eq: "Opinion"}}}
    }
  )   
  {
    edges {
      node {
        id
        slug
      }
    }
  }
}
`)

// Run tech graphql queries
const techResult = await graphql(`
{
  allContentfulBlog(
    sort: {fields: [createdAt], order: DESC}, 
    filter: {
      node_locale: {eq: "en-US"}, 
      category: {elemMatch: {title: {eq: "Tech"}}}
    }
  )   
  {
    edges {
      node {
        id
        slug
      }
    }
  }
}
`)

  
      if (result.errors) {
        throw result.errors
      }

      //Create blog page 
      const blogTemplate = path.resolve('./src/templates/blog.js');
      result.data.allContentfulBlog.edges.forEach(({ node }) => {
        createPage({
          path: `/blog/${node.slug}`,
          component: blogTemplate,
          context: {
            id: node.id
          }
        })
      });


      //Create pagination for blog page
      const archiveTemplate = path.resolve('./src/templates/archive.js');
      const blogs = result.data.allContentfulBlog.edges;
      const blogsPerPage = 9;
      const numPages = Math.ceil(blogs.length / blogsPerPage);

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/blog` : `/blog/${i + 1}`,
          component: archiveTemplate,
          context: {
            limit: blogsPerPage,
            skip: i * blogsPerPage,
            numPages,
            currentPage: i + 1
          }
        })
      })


      //Create pagination for travel page
      const travelTemplate = path.resolve('./src/templates/travel.js');
      const travelPosts = travelResult.data.allContentfulBlog.edges;
      const travelPostsPerPage = 9;
      const numTravelPostPage = Math.ceil(travelPosts.length / travelPostsPerPage);

      Array.from({ length: numTravelPostPage }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/category/travel` : `/category/travel/${i + 1}`,
          component: travelTemplate,
          context: {
            limit: travelPostsPerPage,
            skip: i * travelPostsPerPage,
            numPages: numTravelPostPage,
            currentPage: i + 1
          }
        })
      })

      //Create pagination for guide page
      const guideTemplate = path.resolve('./src/templates/guide.js');
      const guidePosts = guideResult.data.allContentfulBlog.edges;
      const guidePostsPerPage = 9;
      const numguidePostPage = Math.ceil(guidePosts.length / guidePostsPerPage);

      Array.from({ length: numguidePostPage }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/category/guide` : `/category/guide/${i + 1}`,
          component: guideTemplate,
          context: {
            limit: guidePostsPerPage,
            skip: i * guidePostsPerPage,
            numPages: numguidePostPage,
            currentPage: i + 1
          }
        })
      })


      //Create pagination for opinion page
      const opinionTemplate = path.resolve('./src/templates/opinion.js');
      const opinionPosts = opinionResult.data.allContentfulBlog.edges;
      const opinionPostsPerPage = 9;
      const numopinionPostPage = Math.ceil(opinionPosts.length / opinionPostsPerPage);

      Array.from({ length: numopinionPostPage }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/category/opinion` : `/category/opinion/${i + 1}`,
          component: opinionTemplate,
          context: {
            limit: opinionPostsPerPage,
            skip: i * opinionPostsPerPage,
            numPages: numopinionPostPage,
            currentPage: i + 1
          }
        })
      })

      //Create pagination for tech page
      const techTemplate = path.resolve('./src/templates/tech.js');
      const techPosts = techResult.data.allContentfulBlog.edges;
      const techPostsPerPage = 9;
      const numtechPostPage = Math.ceil(techPosts.length / techPostsPerPage);

      Array.from({ length: numtechPostPage }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/category/tech` : `/category/tech/${i + 1}`,
          component: techTemplate,
          context: {
            limit: techPostsPerPage,
            skip: i * techPostsPerPage,
            numPages: numtechPostPage,
            currentPage: i + 1
          }
        })
      })
}
