export const routes = [
  {
    url: '/frontend/junior',
    category: 'Front End',
    subCategory: 'Junior',
    filter: (v) => v.feJunior,
  },
  {
    url: '/frontend/mid',
    category: 'Front End',
    subCategory: 'Mid Level',
    filter: (v) => v.feMid,
  },
  {
    url: '/frontend/senior',
    category: 'Front End',
    subCategory: 'Senior',
    filter: (v) => v.feSenior,
  },
  {
    url: '/backend/junior',
    category: 'Back End',
    subCategory: 'Junior',
    filter: (v) => v.beJunior,
  },
  {
    url: '/backend/mid',
    category: 'Back End',
    subCategory: 'Mid Level',
    filter: (v) => v.beMid,
  },
  {
    url: '/backend/senior',
    category: 'Back End',
    subCategory: 'Senior',
    filter: (v) => v.beSenior,
  },
  {
    url: '/fullstack/junior',
    category: 'Full Stack',
    subCategory: 'Junior',
    filter: (v) => v.fsJunior,
  },
  {
    url: '/fullstack/mid',
    category: 'Full Stack',
    subCategory: 'Mid Level',
    filter: (v) => v.fsMid,
  },
  {
    url: '/fullstack/senior',
    category: 'Full Stack',
    subCategory: 'Senior',
    filter: (v) => v.fsSenior,
  },
  {
    url: '/devops/junior',
    category: 'DevOps',
    subCategory: 'Junior',
    filter: (v) => v.doJunior,
  },
  {
    url: '/devops/mid',
    category: 'DevOps',
    subCategory: 'Mid Level',
    filter: (v) => v.doMid,
  },
  {
    url: '/devops/senior',
    category: 'DevOps',
    subCategory: 'Senior',
    filter: (v) => v.doSenior,
  },
  {
    url: '/qc/junior',
    category: 'QC',
    subCategory: 'Junior',
    filter: (v) => v.qcJunior,
  },
  {
    url: '/qc/mid',
    category: 'QC',
    subCategory: 'Mid Level',
    filter: (v) => v.qcMid,
  },
  {
    url: '/qc/senior',
    category: 'QC',
    subCategory: 'Senior',
    filter: (v) => v.qcSenior,
  },
];

export const routeGroups = routes.reduce((dict, route) => {
  if (!dict[route.category]) {
    dict[route.category] = [route];
  } else {
    dict[route.category].push(route);
  }

  return dict;
}, {});

export const getLabelFromURL = (url) => {
  const route = routes.find((e) => e.url === url);
  if (route) {
    return `${route.subCategory} ${route.category}`;
  }

  return undefined;
};

export const getFilterFromUrl = (url) => {
  const route = routes.find((e) => e.url === url);
  if (route) {
    return route.filter;
  }

  return (e) => true;
};
