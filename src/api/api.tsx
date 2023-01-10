const apiBaseUrl = 'https://s.livesport.services';

const assetBaseUrl = 'https://www.livesport.cz';

export const apiRoutes = {
  search: (filter: string, query: string): string =>
    `${apiBaseUrl}/api/v2/search?${prepareSearchQueryParams(filter, query)}`,
};

export const assetRoutes = {
  image: (path: string): string => `${assetBaseUrl}/res/image/data/${path}`,
};

const prepareSearchQueryParams = (filter: string, query: string): string => {
  return new URLSearchParams({
    'type-ids': filter,
    'project-type-id': '1',
    'project-id': '602',
    'lang-id': '1',
    q: query,
    'sport-ids': '1,2,3,4,5,6,7,8,9',
  }).toString();
};
