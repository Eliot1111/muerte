export type AppRoute = 'home' | 'reserve';

function getBasePath() {
  const baseUrl = import.meta.env.BASE_URL || '/';

  try {
    const { pathname } = new URL(baseUrl, window.location.origin);
    return pathname.endsWith('/') ? pathname : `${pathname}/`;
  } catch {
    return baseUrl.startsWith('/')
      ? baseUrl.endsWith('/')
        ? baseUrl
        : `${baseUrl}/`
      : '/';
  }
}

export function routePath(route: AppRoute) {
  const basePath = getBasePath();
  const rootPath = basePath === '/' ? '' : basePath.replace(/\/$/, '');

  if (route === 'reserve') {
    return `${rootPath}/reserve`;
  }

  return rootPath ? `${rootPath}/` : '/';
}

export function homeHashPath(hash?: string) {
  return `${routePath('home')}${hash ?? ''}`;
}

export function readRouteFromLocation(): AppRoute {
  const basePath = getBasePath();
  const basePathWithoutSlash = basePath.replace(/\/$/, '');
  const currentPath =
    basePathWithoutSlash && window.location.pathname === basePathWithoutSlash
      ? basePath
      : window.location.pathname;
  const appPath =
    basePath !== '/' && currentPath.startsWith(basePath)
      ? `/${currentPath.slice(basePath.length)}`
      : currentPath;
  const normalizedPath =
    appPath.length > 1 && appPath.endsWith('/') ? appPath.slice(0, -1) : appPath;

  return normalizedPath === '/reserve' ? 'reserve' : 'home';
}
