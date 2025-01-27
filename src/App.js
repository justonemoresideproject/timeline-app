import logo from './logo.svg';
import './App.css';

import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

function initDiagram() {
  const diagram = new go.Diagram(
    {
      'undoManager.isEnabled': true,
      'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'light blue' },
      model: new go.GraphLinksModel(
        {
          linkKeyProperty: 'key'
        }
      )
    }
  )

  diagram.nodeTemplate = new go.Node('Auto')
  .bindTwoWay('location', 'loc', go.Point.parse, go.Point.stringify)
  .add(
    new go.Shape('RoundedRectangle',
      { name: 'SHAPE', fill: 'white', strokeWidth: 0 })
      .bind('fill', 'color'), 
      new go.TextBlock({ margin: 8, editable: true }) // some room around the text
      .bindTwoWay('text')
  );

  return diagram;
}

function handleModelChanges(changes) {
  console.log(`Model Changes: ${changes}`)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ReactDiagram
          initDiagram={initDiagram}
          divClassName='diagram-component'
          nodeDataArray={[
            { key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0'},
            { key: 1, text: 'Beta', color: 'orange', loc: '150 0'},
            { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150'},
            { key: 3, text: 'Delta', color: 'pink', loc: '150 150'}
          ]}
          linkDataArray={[
            { key: -1, from:0 , to: 1 },
            { key: -2, from:0, to: 2 },
            { key: -3, from: 1, to: 1 },
            { key: -4, from: 2, to: 3 },
            { key: -5, from: 3, to: 0 }
          ]}
          onModelChange={handleModelChanges}
          />
        <script src="go-debug.js"></script>
      </header>
    </div>
  );
}

export default App;
