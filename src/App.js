import 'draft-js/dist/Draft.css';
import * as React from 'react';
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js';
import './App.css';
import { useEditor } from './editor-context';
import BlockStyleControls from './components/block-style-controls';
import InlineStyleControls from './components/inline-style-controls';
import RandomContent from './components/random-content';

function RichEditor(props) {
  const [editorState, setEditorState] = useEditor();
  const editor = React.useRef(null);

  const focus = () => {
    if (editor.current) editor.current.focus();
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const mapKeyToEditorCommand = (e) => {
    switch (e.keyCode) {
      case 9: // TAB
        const newEditorState = RichUtils.onTab(
          e,
          editorState,
          4 /* maxDepth */
        );
        if (newEditorState !== editorState) {
          setEditorState(newEditorState);
        }
        return null;
      default:
        getDefaultKeyBinding(e);
    }
    return getDefaultKeyBinding(e);
  };

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  return (
    <div className="RichEditor-root">
      <div className="RichEditor-controls-container">
        <BlockStyleControls
          editorState={editorState}
          onToggle={(blockType) => {
            const newState = RichUtils.toggleBlockType(editorState, blockType);
            setEditorState(newState);
          }}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={(inlineStyle) => {
            const newState = RichUtils.toggleInlineStyle(
              editorState,
              inlineStyle
            );
            setEditorState(newState);
          }}
        />
      </div>
      <RandomContent />
      <div className={className} onClick={focus}>
        <Editor
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={mapKeyToEditorCommand}
          onChange={setEditorState}
          placeholder="Type here..."
          ref={editor}
          spellCheck={true}
        />
      </div>
    </div>
  );
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}

function App() {
  return (
    <div className="App">
      <RichEditor />
    </div>
  );
}

export default App;
