import 'draft-js/dist/Draft.css';
import * as React from 'react';
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js';
import '../App.css'; // TODO: move styles to this scope
import { useCurrentEditor, useNewRichTextEditor } from '../editor-context';

export default function RichTextEditor({ markup }) {
  const { changeCurrentEditor } = useCurrentEditor();
  const [editorState, setEditorState] = useNewRichTextEditor(markup);
  const editor = React.useRef(null);

  const focus = () => {
    if (editor.current) {
      editor.current.focus();
    }
  };

  const handleKeyCommand = React.useCallback(
    (command, editorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return 'handled';
      }
      return 'not-handled';
    },
    [setEditorState]
  );

  const mapKeyToEditorCommand = React.useCallback(
    (e) => {
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
    },
    [editorState, setEditorState]
  );

  const handleOnChange = React.useCallback(
    (newEditorState) => {
      setEditorState(newEditorState);
      changeCurrentEditor([newEditorState, setEditorState]);
    },
    [changeCurrentEditor, setEditorState]
  );

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = 'RichEditor-editor';
  let contentState = editorState?.getCurrentContent();
  if (!contentState || !contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  return (
    <div className={className} onClick={focus}>
      <Editor
        blockStyleFn={getBlockStyle}
        customStyleMap={styleMap}
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={mapKeyToEditorCommand}
        onChange={handleOnChange}
        // onFocus={() => changeCurrentEditor([editorState, setEditorState])}
        // onBlur={() => setFocused(false)}
        placeholder="Type here..."
        ref={editor}
        spellCheck={true}
      />
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
