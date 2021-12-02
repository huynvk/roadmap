import React, { useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  MiniMap,
} from 'react-flow-renderer';
import { isEmpty } from 'ramda';
import { buildGraphData } from './data/pipeline';
import styled from 'styled-components';
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

const options = Object.keys(filterMappings);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
`;

const Button = styled.a`
  padding: 10px;
  border: 1px solid ${(props) => (props.isSelected ? 'orange' : '#fff')};
  background: ${(props) => (props.isSelected ? 'orange' : '#fff')};
  cursor: default;

  &:hover {
    color: ${(props) => (props.isSelected ? 'notset' : 'orange')};
  }
`;

const ButtonBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-self: stretch;
`;

const GraphContainer = styled.div`
  border: 1px solid black;
  position: relative;
  flex: 1;
  margin: 10px;
`;

const DetailContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${(props) => (props.isSoft ? '#f5ddb8' : '#b8e3f5')};
  padding: 20px;
  width: 200px;
  min-height: 300px;
  border-radius: 10px;
  z-index: 99;
`;

const Details = ({ title, details, recommendLevel }) => {
  const recommendation = {
    1: 'Highly recommended',
    2: 'Recommended',
    3: 'Nice to have',
  }[recommendLevel];

  return (
    <DetailContainer isSoft={details.skillType === 'Soft Skills'}>
      <h3 className='title'>{details.label}</h3>
      {details.skillType && (
        <div className='skillType'>({details.skillType})</div>
      )}
      {recommendation && (
        <h5>
          {recommendation} for {title}
        </h5>
      )}
      <h6>Description</h6>
      {details.description
        ? details.description.split('\n').map((e, i) => <p key={i}>{e}</p>)
        : 'N/A'}

      <h6>References</h6>
      {details.reference
        ? details.reference.split('\n').map((e, i) => <p key={i}>{e}</p>)
        : 'N/A'}
    </DetailContainer>
  );
};

const App = () => {
  const [selection, setSelection] = useState('Junior FE');
  const [selectedNode, selectNode] = useState({});

  const filter = filterMappings[selection] || ((e) => true);
  const buildData = buildGraphData(filter, filter);

  return (
    <Container>
      <ButtonBar>
        {options.map((v, i) => (
          <Button
            key={i}
            isSelected={v === selection}
            onClick={() => setSelection(v)}
          >
            {v}
          </Button>
        ))}
      </ButtonBar>
      <GraphContainer
        style={{
          border: '1px solid black',
          flex: 1,
          margin: '10px',
        }}
      >
        {!isEmpty(selectedNode) && (
          <Details
            title={selection}
            details={selectedNode.data || {}}
            recommendLevel={filter(selectedNode.data || {})}
          />
        )}
        <ReactFlowProvider>
          <Controls />
          <ReactFlow
            onElementClick={(event, element) => selectNode(element)}
            panOnScroll
            panOnScrollMode='vertical'
            elements={buildData(parsedData)}
          />
        </ReactFlowProvider>
      </GraphContainer>
    </Container>
  );
};

export default App;
