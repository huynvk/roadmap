import React, { useMemo, useState } from 'react';
import ReactFlow, { ReactFlowProvider, Controls } from 'react-flow-renderer';
import { isEmpty } from 'ramda';
import { buildGraphData, buildGraphData2 } from './data/pipeline';
import styled from 'styled-components';
import Header from './Header';
import Legend from './Legend';
import Details from './Detail';
import { useLocation } from 'react-router-dom';
import { getFilterFromUrl, getLabelFromURL } from './route';
import { useGet } from 'restful-react';

const parsedData = require('./data/parsed-data.json');

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
`;

const GraphContainer = styled.div`
  position: relative;
  flex: 1;
  background: #fffffe;

  .react-flow__node {
    background: #ffffff;
    border-color: #cdd1d6;
    color: #091e42;
    width: 200px;

    svg {
      float: left;
    }
  }

  .react-flow__handle {
    width: 0px;
    height: 0px;
  }
`;

const App = () => {
  const [selectedNode, selectNode] = useState({});
  const location = useLocation().pathname;
  const label = getLabelFromURL(location);
  const userId = 'USR_ddfec5c2-8532-434d-93';

  const { data, loading } = useGet({ path: `/skills/tree` });
  const { data: userSkillsData, loading: loadingUserSkills } = useGet({
    path: `/users/${userId}/skills`,
  });

  const filter = useMemo(() => getFilterFromUrl(location), [location]);

  const elements = useMemo(() => {
    if (loading) {
      return [];
    }
    const buildData2 = buildGraphData2(
      (nodes) => nodes,
      // filter
      (nodeData) => nodeData.recommendLevel
    );
    const elements = buildData2(data);

    return elements;
  }, [loading, data, filter]);

  const getUserSkill = (skillId) => {
    if (loadingUserSkills) {
      return {};
    }
    return userSkillsData.find((e) => e.skillId === skillId);
  };

  return (
    <Root>
      <Header />
      <Legend title={label} />
      <GraphContainer>
        {!isEmpty(selectedNode) && (
          <Details
            userId={userId}
            skillId={selectedNode.id}
            recommendation={filter(selectedNode.data)}
            details={selectedNode.data}
            userSkill={getUserSkill(selectedNode.id)}
          />
        )}
        <ReactFlowProvider>
          <Controls />
          <ReactFlow
            onElementClick={(event, element) => {
              selectNode(element);
              console.log('select node', element);
            }}
            panOnScroll
            panOnScrollMode='vertical'
            elements={elements}
            onPaneClick={() => selectNode({})}
          />
        </ReactFlowProvider>
      </GraphContainer>
    </Root>
  );
};

export default App;
