import * as React from 'react';
import { ContentState, EditorState, convertFromHTML } from 'draft-js';

const EditorContext = React.createContext();

// Legacy contract data
const sampleMarkup =
  '<p>Hello from Peram!</p>\n\n<h1>This is a header</h1>\n\n<blockquote>Awesome quote</blockquote>';

const blocksFromHTML = convertFromHTML(sampleMarkup);
const initialEditorState = ContentState.createFromBlockArray(
  blocksFromHTML.contentBlocks,
  blocksFromHTML.entityMap
);

export function EditorProvider({ children }) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(initialEditorState)
  );

  return (
    <EditorContext.Provider value={[editorState, setEditorState]}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const editorContextValue = React.useContext(EditorContext);

  if (editorContextValue === undefined) {
    throw new Error(`useEditor must be used within a EditorProvider`);
  }

  return editorContextValue;
}
