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
    cache: 'no-store',
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
    cache: 'no-store',
    body: JSON.stringify({
      query:`{
        page(id: "about", idType: URI) {
          id
          title
          uri
          nextoverviewmeta {
            nextMeta1
            nextmeta02
            nextmeta03
          }
        }
      }`
    }),
  });
   
  if (!res || !res.ok) {
    return { posts: { nodes: [] } };
  }

  const json = await res.json();
  return json.data ?? { posts: { nodes: [] } };
}
