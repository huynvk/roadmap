import { ReactComponent as Bookmark } from '../icons/Bookmark.svg';
import { ReactComponent as Like } from '../icons/Like.svg';
import { ReactComponent as Star } from '../icons/Star.svg';
const { pipe } = require('ramda');

const generateId = (() => {
  let count = 0;
  return () => ++count;
})();

const toReactFlowStructure2 = (allRoots) => {
  const calY = (() => {
    let y = 0;
    return () => {
      y += 50;
      return y;
    };
  })();

  const recommendLevel = (() => {
    let i = 1;
    return () => {
      i = i < 4 ? i + 1 : 1;
      return i;
    };
  })();

  const buildConnectionNode = (fromNode, toNode) => {
    return {
      source: fromNode.id,
      target: toNode.id,
      id: `e${fromNode.id}-${toNode.id}`,
    };
  };

  const buildTree = (skill, parentNode) => {
    let nodes = [];

    const { id, name, skillType, description, reference, children, ...rest } =
      skill;

    const level = parentNode ? (parentNode.data.level || 1) + 1 : 1;
    const nodeData = {
      label: name,
      level,
      skillType,
      description,
      reference,
      // recommendLevel: recommendLevel(),
      ...rest,
    };

    const skillNode = {
      id,
      data: nodeData,
      position: { x: (level - 1) * 300, y: calY() },
    };
    nodes.push(skillNode);

    if (parentNode) {
      nodes.push(buildConnectionNode(parentNode, skillNode));
    }

    if (children && children.length > 0) {
      children.forEach((subSkill) => {
        const childNodes = buildTree(subSkill, skillNode);
        if (childNodes.length > 0) {
          nodes = nodes.concat(childNodes);
        }
      });
    } else {
      nodeData.recommendLevel = recommendLevel();
    }

    return nodes;
  };

  let allNodes = [];
  let prevRootNode = undefined;

  allRoots.forEach((rootNode) => {
    // Build root trees (root node + its children nodes)
    const tree = buildTree(rootNode);
    allNodes = allNodes.concat(tree);

    // Build connections among root notes
    if (tree.length > 0) {
      if (prevRootNode) {
        allNodes.push(buildConnectionNode(prevRootNode, tree[0]));
      }
      prevRootNode = tree[0];
    }
  });

  return allNodes;
};

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

const updateHandlerPositions = (data) => {
  return data.map((node, index) => {
    if (!node.data) {
      return node;
    }

    const newNode = {
      ...node,
      sourcePosition: node.data.level === 2 ? 'right' : undefined,
      targetPosition: node.data.level > 1 ? 'left' : undefined,
    };
    return newNode;
  });
};

const filter = (fn) => (data) => data.filter(fn);

const addStyle = (item, style) => {
  item.style = Object.assign({}, item.style, style);
};

const addRecommendations = (fn) => (data) => {
  const newData = [];

  data.forEach((exitingItem) => {
    const item = { ...exitingItem };

    switch (fn(item.data || {})) {
      case 1:
        addStyle(item, { background: '#fff4ee', borderColor: '#f49766' });
        item.data.label = (
          <div className='recommendation'>
            <Star /> {item.data.label}
          </div>
        );
        break;
      case 2:
        addStyle(item, { background: '#f0f5ff', borderColor: '#a1c0ff' });
        item.data.label = (
          <div className='recommendation'>
            <Like /> {item.data.label}
          </div>
        );
        break;
      case 3:
        addStyle(item, { background: '#fffae6', borderColor: '#fee060' });
        item.data.label = (
          <div className='recommendation'>
            <Bookmark /> {item.data.label}
          </div>
        );
        break;
      default:
        break;
    }

    newData.push(item);
  });
  return data;
};

export const buildGraphData = (filterFn, recommendFn) => (data) => {
  return pipe(
    filter(filterFn),
    toReactFlowStructure,
    addRecommendations(recommendFn),
    updateHandlerPositions
  )(data);
};

// const addMockRecommendationData = (data) => {
//   data.forEach((item) => {
//     item.recommendLevel = Math.random() * 3 + 1;
//   });
//   return data;
// };

export const buildGraphData2 = (filterFn, recommendFn) => (data) => {
  return pipe(
    filter(filterFn),
    // addMockRecommendationData,
    toReactFlowStructure2,
    addRecommendations(recommendFn),
    updateHandlerPositions
  )(data);
};
