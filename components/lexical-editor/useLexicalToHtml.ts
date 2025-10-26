import { useState, useEffect} from 'react';
import { $generateHtmlFromNodes } from '@lexical/html';
import { createEditor } from 'lexical';

export function useLexicalToHtml(lexicalJson: string) {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (lexicalJson) {
      const editor = createEditor();
      editor.setEditorState(editor.parseEditorState(lexicalJson));

      editor.update(() => {
        const html = $generateHtmlFromNodes(editor);
        setHtmlContent(html);
      });
    }
  }, [lexicalJson]);

  return htmlContent;
}
