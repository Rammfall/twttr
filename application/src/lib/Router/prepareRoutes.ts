export interface PreparedRoute {
  path: string;
  params: string[];
  importPath: string;
}

const preparedRouting = (routes: string[]): PreparedRoute[] => routes.map((route) => {
  const dynamicParts = [...route.matchAll(/\[(.*?)\]/g)].map((item) => ({
    without: item[1],
    within: item[0],
  }));
  let currentString = route;

  const params = dynamicParts.map(({ within, without }) => {
    currentString = currentString.replace(within, `:${without}`);
    return without;
  });
  currentString = currentString.replace('routes', '');

  const pos = currentString.search(/\/index./);

  if (pos !== -1) {
    return {
      path: currentString.slice(0, pos),
      params,
      importPath: route,
    };
  }

  return {
    path: currentString.replace(/\.(js|ts)/, ''),
    params,
    importPath: route,
  };
});

export default preparedRouting;
