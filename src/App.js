import React, { useState } from 'react';
import ReactFlow, { ReactFlowProvider, Controls } from 'react-flow-renderer';
import { buildGraphData } from './data/pipeline';
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

const App = () => {
  const [selection, setSelection] = useState('Junior FE');

  const filter = filterMappings[selection] || ((e) => true);
  const buildData = buildGraphData(filter, filter);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '800vw',
          margin: '0 auto',
        }}
      >
        <div>
          {options.map((v, i) => (
            <button key={i} onClick={() => setSelection(v)}>
              {v}
            </button>
          ))}
          {selection}
        </div>
        <div
          style={{
            border: '1px solid black',
            flex: 1,
          }}
        >
          <ReactFlowProvider>
            <Controls />
            <ReactFlow
              panOnScroll
              panOnScrollMode='vertical'
              elements={buildData(parsedData)}
            />
          </ReactFlowProvider>
        </div>
      </div>
    </>
  );
};

export default App;
