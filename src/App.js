import React, { useMemo, useState } from 'react';
import ReactFlow, { ReactFlowProvider, Controls } from 'react-flow-renderer';
import { isEmpty } from 'ramda';
import { buildGraphData } from './data/pipeline';
import styled from 'styled-components';
import Header from './Header';
import Legend from './Legend';
import Details from './Detail';
import { useLocation } from 'react-router-dom';
import { getFilterFromUrl, getLabelFromURL } from './route';

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

  const filter = useMemo(() => getFilterFromUrl(location), [location]);
  const elements = useMemo(() => {
    const buildData = buildGraphData(filter, filter);

    return buildData(parsedData);
  }, [filter]);

  return (
    <Root>
      <Header />
      <Legend title={label} />
      <GraphContainer>
        {!isEmpty(selectedNode) && (
          <Details
            recommendation={filter(selectedNode.data)}
            details={selectedNode.data}
          />
        )}
        <ReactFlowProvider>
          <Controls />
          <ReactFlow
            onElementClick={(event, element) => selectNode(element)}
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
