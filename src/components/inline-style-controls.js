import 'draft-js/dist/Draft.css';
import { RichUtils } from 'draft-js';
import { useCurrentEditor } from '../editor-context';
import StyleButton from './style-button';

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

export default function InlineStyleControls() {
  const {
    currentEditor: [editorState, setEditorState],
    changeCurrentEditor,
  } = useCurrentEditor();

  if (!editorState) {
    return null;
  }

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={(inlineStyle) => {
            const newEditorState = RichUtils.toggleInlineStyle(
              editorState,
              inlineStyle
            );
            setEditorState(newEditorState);
            changeCurrentEditor(newEditorState, setEditorState);
          }}
          style={type.style}
        />
      ))}
    </div>
  );
}
