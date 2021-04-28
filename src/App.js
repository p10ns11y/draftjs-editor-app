// import 'draft-js/dist/Draft.css';
import * as React from 'react';
import './App.css';
import BlockStyleControls from './components/block-style-controls';
import InlineStyleControls from './components/inline-style-controls';
import RichTextEditor from './components/rich-text-editor';
import RandomContent from './components/random-content';

function RichEditorApp() {
  return (
    <div className="RichEditor-root">
      <div className="RichEditor-controls-container">
        <BlockStyleControls />
        <InlineStyleControls />
      </div>
      <RichTextEditor
        markup={
          '<p>Hello from Peram!</p>\n\n<h1>This is a header</h1>\n\n<blockquote>Awesome quote</blockquote>'
        }
      />
      <RandomContent />
      <RichTextEditor />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <RichEditorApp />
    </div>
  );
}

export default App;
