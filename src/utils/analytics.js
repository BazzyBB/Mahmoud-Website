// Shared by page views and interaction events; authentication visits stay private.
export function isPrivateAnalyticsVisit(location) {
  return location.pathname.startsWith('/admin') || /(?:invite_token|recovery_token|confirmation_token|access_token|email_change_token)=/.test(location.hash || '');
}

export function createPageViewTracker(send) {
  let previousPath = null;
  return (location, title) => {
    if (isPrivateAnalyticsVisit(location)) {
      previousPath = null;
      return false;
    }
    const path = location.pathname + location.search;
    if (previousPath === path) return false;
    send('event', 'page_view', {
      page_path: path,
      page_title: title,
      page_location: location.origin + path,
    });
    previousPath = path;
    return true;
  };
}
