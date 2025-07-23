import createCache from '@emotion/cache';

const isBrowser = typeof document !== 'undefined';

// 在客户端，你可以把它们留在head中
// 在服务器端，你需要把它们移到styles中处理
function createEmotionCache() {
  let insertionPoint;

  if (isBrowser) {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    );
    insertionPoint = emotionInsertionPoint ?? undefined;
  }

  return createCache({
    key: 'mui-style',
    insertionPoint,
    // 为了解决hydration问题，在开发模式下禁用speedy
    speedy: process.env.NODE_ENV === 'production',
  });
}

export { createEmotionCache };
