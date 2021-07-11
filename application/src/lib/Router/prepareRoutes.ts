export interface PreparedRoute {
  path: string;
  params: string[];
  importPath: string;
}

const preparedRouting = (arr: string[]): PreparedRoute[] => {
  return arr.map((item) => {
    const dynamicParts = [...item.matchAll(/\[(.*?)\]/g)].map((item) => ({
      without: item[1],
      within: item[0],
    }));
    let currentString = item;
    const params: string[] = [];

    dynamicParts.map(({ within, without }) => {
      currentString = currentString.replace(within, `:${without}`);
      params.push(without);
    });
    currentString = currentString.replace('routes', '');

    const pos = currentString.search(/\/index./);

    if (pos !== -1) {
      return {
        path: currentString.slice(0, pos),
        params,
        importPath: item,
      };
    }

    return {
      path: currentString.replace(/\.(js|ts)/, ''),
      params,
      importPath: item,
    };
  });
};

export default preparedRouting;
