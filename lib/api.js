const API_URL = "https://bettermonday.org/graphql";

export async function getHomePageContent() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        page(id: "index", idType: URI) {
          slug
          title
          metaIndex {
            metaWhat
            metaIndex
          }
          meta {
            metaDescription
          }
        }
      }`
    }),
  });
   
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const json = await res.json();
  return json.data;
  
  //return res.json();
}

export async function getPostPhotocomma() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        post(id: "photocomma", idType: URI) {
          title
          slug
          content
          excerpt
          meta {
            fieldGroupName
            metaDescription
          }
          workItems {
            additionalField
            additionalInfoTitle
            captionItemImage
            captionItemImage01
            captionItemImage02
            captionItemImage03
            captionItemImage04
            captionItemImage05
            fieldGroupName
            itemSubtitle
            linkExternalSite
            listViewInfo
            itemImage01 {
              srcSet
              sourceUrl
              uri
            }
            itemImage02 {
              srcSet
              sourceUrl
              uri
            }
            itemImage03 {
              srcSet
              sourceUrl
              uri
            }
            itemImage04 {
              srcSet
              sourceUrl
              uri
            }
            itemImage05 {
              srcSet
              sourceUrl
              uri
            }
            itemImageFront {
              srcSet
              sourceUrl
              uri
            }
          }
        }
      }`
    }),
  });
   
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const json = await res.json();
  return json.data;
  
  //return res.json();
}

export async function getPostSkandan() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        post(id: "skandan-music", idType: URI) {
          title
          slug
          content
          excerpt
          meta {
            fieldGroupName
            metaDescription
          }
          workItems {
            additionalField
            additionalInfoTitle
            captionItemImage
            captionItemImage01
            captionItemImage02
            captionItemImage03
            captionItemImage04
            captionItemImage05
            fieldGroupName
            itemSubtitle
            linkExternalSite
            listViewInfo
            itemImage01 {
              srcSet
              sourceUrl
              uri
            }
            itemImage02 {
              srcSet
              sourceUrl
              uri
            }
            itemImage03 {
              srcSet
              sourceUrl
              uri
            }
            itemImage04 {
              srcSet
              sourceUrl
              uri
            }
            itemImage05 {
              srcSet
              sourceUrl
              uri
            }
            itemImageFront {
              srcSet
              sourceUrl
              uri
            }
          }
        }
      }`
    }),
  });
   
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const json = await res.json();
  return json.data;
  
  //return res.json();
}

export async function getFooter() {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        post(id: "footer-content", idType: URI) {
          title
          slug
          content
        }
      }`
    }),
  });
   
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const json = await res.json();
  return json.data;
  
  //return res.json();
}

export const getPostBySlug = async (slug) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{
        post(id: "${slug}", idType: URI) {
          title
          slug
          content
          excerpt
          databaseId
          featuredImage {
            node {
              guid
              sourceUrl
              srcSet
            }
          }
          categories {
            nodes {
              slug
            }
          }
          meta {
            metaDescription
          }
          workItems {
            additionalField
            additionalInfoTitle
            captionItemImage
            captionItemImage01
            captionItemImage02
            captionItemImage03
            captionItemImage04
            captionItemImage05
            fieldGroupName
            itemImage01 {
              srcSet
              sourceUrl
              uri
              title
            }
            itemImage02 {
              srcSet
              sourceUrl
              uri
              title
            }
            itemImage03 {
              srcSet
              sourceUrl
              title
              uri
            }
            itemImage04 {
              srcSet
              sourceUrl
              title
              uri
            }
            itemImage05 {
              srcSet
              sourceUrl
              title
              uri
            }
            itemImageFront {
              srcSet
              sourceUrl
              title
              uri
            }
            itemSubtitle
            linkExternalSite
            listViewInfo
          }
        }
      }`,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const json = await res.json();
  return json.data;
};

export const getWorkPosts = async () => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{
        posts(where: {status: PUBLISH, categoryName: "work"}) {
          nodes {
            databaseId
            title
            excerpt
            content
            featuredImage {
              node {
                sourceUrl
                srcSet
                uri
              }
            }
            workItems {
              additionalInfoTitle
              additionalField
              itemSubtitle
              linkExternalSite
              listViewInfo
              captionItemImage
              captionItemImage01
              captionItemImage02
              captionItemImage03
              captionItemImage04
              captionItemImage05
              fieldGroupName
              itemImageFront {
                sourceUrl
                srcSet
              }
              itemImage01 {
                sourceUrl
                srcSet
              }
              itemImage02 {
                sourceUrl
                srcSet
              }
              itemImage03 {
                sourceUrl
                srcSet
              }
              itemImage04 {
                sourceUrl
                srcSet
              }
              itemImage05 {
                sourceUrl
                srcSet
              }
            }
          }
        }
      }`,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const json = await res.json();
  return json.data;
};
