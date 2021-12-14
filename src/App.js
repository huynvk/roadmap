import React, { useMemo, useState } from 'react';
import ReactFlow, { ReactFlowProvider, Controls } from 'react-flow-renderer';
import { isEmpty } from 'ramda';
import { buildGraphData } from './data/pipeline';
import styled from 'styled-components';
import Header from './Header';
import Legend from './Legend';
import Details from './Detail';

const parsedData = require('./data/parsed-data.json');

const filterMappings = {
  'Junior FE': (v) => v.feJunior,
  'Mid FE': (v) => v.feMid,
  'Senior FE': (v) => v.feSenior,
  'Junior BE': (v) => v.beJunior,
  'Mid BE': (v) => v.beMid,
  'Senior BE': (v) => v.beSenior,
  'Junior Fullstack': (v) => v.fsJunior,
  'Mid Fullstack': (v) => v.fsMid,
  'Senior Fullstack': (v) => v.fsSenior,
  'Junior DevOps': (v) => v.doJunior,
  'Mid DevOps': (v) => v.doMid,
  'Senior DevOps': (v) => v.doSenior,
  'Junior QC': (v) => v.qcJunior,
  'Mid QC': (v) => v.qcMid,
  'Senior QC': (v) => v.qcSenior,
};

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
  const [selection, setSelection] = useState('Junior FE');
  const [selectedNode, selectNode] = useState({});

  const filter = useMemo(
    () => filterMappings[selection] || ((e) => true),
    [selection]
  );

  const elements = useMemo(() => {
    const buildData = buildGraphData(filter, filter);

    return buildData(parsedData);
  }, [filter]);

  return (
    <Root>
      <Header />
      <Legend title={selection} />
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
          />
        </ReactFlowProvider>
      </GraphContainer>
    </Root>
  );
};

export default App;
