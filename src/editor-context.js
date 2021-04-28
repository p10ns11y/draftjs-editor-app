import * as React from 'react';
import { ContentState, EditorState, convertFromHTML } from 'draft-js';

const EditorContext = React.createContext();

function getInitialEditorState(markup) {
  if (!markup) {
    return EditorState.createEmpty();
  }

  const blocksFromHTML = convertFromHTML(markup);
  const initialEditorContent = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  return EditorState.createWithContent(initialEditorContent);
}

const noop = () => {};

export function EditorProvider({ children }) {
  const [
    [currentEditorState, setCurrentEditorState],
    setCurrentEditor,
  ] = React.useState([null, noop]);

  const changeCurrentEditor = React.useCallback(
    (editorState, setEditorState) => {
      setCurrentEditor([editorState, setEditorState]);
    },
    []
  );

  const editorContextValue = React.useMemo(
    () => ({
      currentEditor: [currentEditorState, setCurrentEditorState],
      changeCurrentEditor,
    }),
    [changeCurrentEditor, currentEditorState, setCurrentEditorState]
  );

  return (
    <EditorContext.Provider value={editorContextValue}>
      {children}
    </EditorContext.Provider>
  );
}

export function useCurrentEditor() {
  const editorContextValue = React.useContext(EditorContext);

  if (editorContextValue === undefined) {
    throw new Error(`useEditor must be used within a EditorProvider`);
  }

  return editorContextValue;
}

export function useNewRichTextEditor(initialEditorMarkup) {
  return React.useState(() => getInitialEditorState(initialEditorMarkup));
}
