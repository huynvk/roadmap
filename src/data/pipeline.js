const { pipe } = require('ramda');

const generateId = (() => {
  let count = 0;
  return () => ++count;
})();

const toReactFlowStructure = (data) => {
  const mappings = {};
  let y = 0;

  const calY = () => {
    y += 50;
    return y;
  };

  let lastCategoryNode = undefined;

  data.forEach(({ category, item, subItem, skillType, style, ...rest }) => {
    let detailedNode = undefined;

    if (category && !mappings[category]) {
      const categoryNode = {
        data: {
          label: category,
          level: 1,
          skillType,
        },
        position: { x: 100, y: calY() },
        id: generateId(),
      };
      mappings[category] = categoryNode;

      if (lastCategoryNode) {
        const linkId = `e${lastCategoryNode.id}-${categoryNode.id}`;

        mappings[linkId] = {
          source: lastCategoryNode.id,
          target: categoryNode.id,
          id: linkId,
        };
      }
      lastCategoryNode = categoryNode;
      detailedNode = categoryNode;
    }
    if (item && !mappings[`${category}-${item}`]) {
      const categoryNode = mappings[category];
      const itemNode = {
        data: {
          label: item,
          level: 2,
          skillType,
        },
        id: generateId(),
        position: { x: 300, y: calY() },
      };
      const linkId = `e${categoryNode.id}-${itemNode.id}`;

      mappings[`${category}-${item}`] = itemNode;
      mappings[linkId] = {
        source: categoryNode.id,
        target: itemNode.id,
        id: linkId,
      };
      detailedNode = itemNode;
    }

    if (subItem) {
      const itemNode = mappings[`${category}-${item}`];
      const subItemNode = {
        data: {
          label: subItem,
          level: 3,
          skillType,
        },
        id: generateId(),
        position: { x: 600, y: calY() },
      };
      const linkId = `e${itemNode.id}-${subItemNode.id}`;

      mappings[subItem] = subItemNode;
      mappings[linkId] = {
        source: itemNode.id,
        target: subItemNode.id,
        id: linkId,
      };
      detailedNode = subItemNode;
    }

    detailedNode.style = style;
    Object.assign(detailedNode.data, rest);
  });
  return Object.values(mappings).sort((a, b) => {
    const yA = (a.position || { y: 0 }).y;
    const yB = (b.position || { y: 0 }).y;
    return yA - yB;
  });
};

const addStylings = (data) => {
  return data.map((node, index) => {
    if (!node.data) {
      return node;
    }

    const newNode = {
      ...node,
      type: index === 1 ? 'input' : undefined,
      sourcePosition: node.data.level === 2 ? 'right' : undefined,
      targetPosition: node.data.level > 1 ? 'left' : undefined,
    };
    addStyle(newNode, { width: 200 });
    return newNode;
  });
};

const filter = (fn) => (data) => data.filter(fn);

const addStyle = (item, style) => {
  item.style = Object.assign({}, item.style, style);
};

const addRecommendations = (fn) => (data) => {
  data.forEach((item) => {
    switch (fn(item)) {
      case '3':
        addStyle(item, { background: '#b7e1cd' });
        break;
      case '2':
        addStyle(item, { background: '#7ad391' });
        break;
      case '1':
        addStyle(item, { background: '#34a853' });
        break;
      default:
        break;
    }
  });
  return data;
};

const buildGraphData = (filterFn, recommendFn) => (data) => {
  return pipe(
    filter(filterFn),
    addRecommendations(recommendFn),
    toReactFlowStructure,
    addStylings
  )(data);
};

module.exports = {
  buildGraphData,
};
