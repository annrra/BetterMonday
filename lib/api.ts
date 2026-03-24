const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Timeout in ms for WordPress API calls. Prevents hanging and "Connection closed" when hosting is slow. */
const FETCH_TIMEOUT_MS = 10_000;

async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
): Promise<Response | null> {
  const { timeout = FETCH_TIMEOUT_MS, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return res;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.error('[api] Request timeout:', url);
    } else {
      console.error('[api] Request failed:', err);
    }
    return null;
  } finally {
    clearTimeout(id);
  }
}

export async function getMediaRollContent() {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    //cache: 'no-store',
    body: JSON.stringify({
      query:`{
        page(id: "mediaclips", idType: URI) {
          mediaroll {
            motionitem01 {
              node {
                file
                filePath
                fileSize
                mediaItemId
                mediaItemUrl
                guid
              }
            }
            motionitem02 {
              node {
                file
                filePath
                fileSize
                guid
                mediaItemId
                mediaItemUrl
              }
            }
            motionitem03 {
              node {
                file
                filePath
                fileSize
                guid
                mediaItemId
                mediaItemUrl
              }
            }
            motionitem04 {
              node {
                file
                filePath
                fileSize
                guid
                mediaItemId
                mediaItemUrl
              }
            }
            motionitem05 {
              node {
                file
                filePath
                fileSize
                guid
                mediaItemId
                mediaItemUrl
              }
            }
            motionitem06 {
              node {
                file
                filePath
                fileSize
                guid
                mediaItemId
                mediaItemUrl
              }
            }
            motionitem07 {
              node {
                file
                filePath
                fileSize
                guid
                mediaItemId
                mediaItemUrl
              }
            }
            motionitem08 {
              node {
                file
                filePath
                fileSize
                guid
                mediaItemId
                mediaItemUrl
              }
            }
          }
          guid
        }
      }`
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getOverviewContent() {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    //cache: 'no-store',
    body: JSON.stringify({
      query:`{
        page(id: "about", idType: URI) {
          nextoverview01 {
            nextoverviewheading01
            nextoverviewmeta01
          }
          nextoverview02 {
            nextoverviewheading02
            nextoverviewmeta02
          }
          nextoverview03 {
            nextoverviewheading03
            nextoverviewmeta03
          }
          nextoverview04 {
            nextoverviewheading04
            nextoverviewmeta04
          }
        }
      }`
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getPhotocommaPreview() {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    //cache: 'no-store',
    body: JSON.stringify({
      query:`{
        page(id: "photocommapreview", idType: URI) {
          nextphotocommapreview {
            nextphotocommapreview01 {
              node {
                file
                filePath
                fileSize
                guid
                mediaItemId
                mediaItemUrl
              }
            }
            nextphotocommapreview02 {
              node {
                file
                filePath
                fileSize
                guid
                mediaItemId
                mediaItemUrl
              }
            }
            nextphotocommapreview03 {
              node {
                file
                filePath
                fileSize
                guid
                mediaItemId
                mediaItemUrl
              }
            }
            nextphotocommapreview04 {
              node {
                file
                filePath
                fileSize
                guid
                mediaItemId
                mediaItemUrl
              }
            }
            nextphotocommapreview05 {
              node {
                file
                filePath
                fileSize
                guid
                mediaItemId
                mediaItemUrl
              }
            }
          }
        }
      }`
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getShowCaseList() {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    //cache: 'no-store',
    body: JSON.stringify({
      query:`{
        posts(
          where: {status: PUBLISH, categoryName: "work", orderby: {field: DATE, order: DESC}}
        ) {
          nodes {
            nextshowcaselist {
              nextshowcasetitle
              nextshowcaseheading
              nextshowcasemeta
              nextshowcasedescription
              nextshowcasetag01
              nextshowcasetag02
              nextshowcasetag03
              nextshowcasetag04
              nextshowcasetag05
              nextshowcasepreview {
                node {
                  file
                  filePath
                  fileSize
                  guid
                  mediaItemUrl
                  mediaItemId
                  mediaType
                  mimeType
                }
              }
            }
            uri
            postId
            link
            guid
          }
        }
      }`
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getShowCaseItem(slug: string) {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return { posts: { nodes: [] } };
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    //cache: 'no-store',
    body: JSON.stringify({
      query:`{
        post(id: "${slug}", idType: SLUG) {
          guid
          id
          title
          slug
          status
          uri
          content
          excerpt
          categories(where: {name: "work"}) {
            nodes {
              name
              slug
            }
          }
          featuredImage {
            node {
              filePath
              file
              guid
              title
              uri
            }
          }
          nextshowcaseitem {
            nextShowcaseItemFeaturedImage {
              node {
                file
                filePath
                fileSize
                guid
                altText
                title
                uri
              }
            }
            nextShowcaseItemIconFigure {
              node {
                file
                filePath
                fileSize
                guid
                altText
                title
                uri
              }
            }
            nextShowcaseItemHeading
            nextShowcaseItemSubheading
            nextShowcaseItemDescription
            nextShowcaseItemTag01
            nextShowcaseItemTag02
            nextShowcaseItemTag03
            nextShowcaseItemTag04
            nextShowcaseItemTag05
            nextShowcaseItemLinktext
            nextShowcaseItemLinkurl
            nextShowcaseItemMedia01 {
              node {
                file
                filePath
                fileSize
                guid
                altText
                title
                uri
              }
            }
            nextShowcaseItemBonusHeading
            nextShowcaseItemBonusInfo
            nextShowcaseItemMedia02 {
              node {
                file
                filePath
                fileSize
                guid
                altText
                title
                uri
              }
            }
            nextShowcaseItemMedia03 {
              node {
                file
                filePath
                fileSize
                guid
                altText
                title
                uri
              }
            }
            nextShowcaseItemMedia04 {
              node {
                file
                filePath
                fileSize
                guid
                altText
                title
                uri
              }
            }
            nextShowcaseItemMedia05 {
              node {
                file
                filePath
                fileSize
                guid
                altText
                title
                uri
              }
            }
            nextShowcaseItemCaption01
            nextShowcaseItemMedia06 {
              node {
                file
                filePath
                fileSize
                guid
                altText
                title
                uri
              }
            }
            nextShowcaseItemCaption02
            nextShowcaseItemMedia07 {
              node {
                file
                filePath
                fileSize
                guid
                altText
                title
                uri
              }
            }
            nextShowcaseItemCaption03
            nextShowcaseItemMedia08 {
              node {
                file
                filePath
                fileSize
                guid
                altText
                title
                uri
              }
            }
          }
        }
      }`
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}

export async function getMetaBySlug(slug: string) {
	if (!API_URL) {
    console.error('API_URL is not defined.');
    return null;
  }

  const res = await fetchWithTimeout(API_URL, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query:`{
        post(id: "${slug}", idType: SLUG) {
          title
          excerpt
          uri
          slug
          status
          categories(where: {name: "work"}) {
            nodes {
              name
              slug
            }
          }
          meta {
            metaTitle
            metaDescription
            metaOpengraphimage {
              node {
                sourceUrl
                srcSet
                uri
              }
            }
          }
        }
      }`
    }),
    next: { revalidate: 60 },
  });
   
  if (!res || !res.ok) {
    return null;
  }

  const json = await res.json();
  return json.data ?? null;
}
