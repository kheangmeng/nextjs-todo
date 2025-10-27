'use client'

import { useState, useEffect} from 'react';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { createEditor, LexicalNode } from 'lexical';

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

export function useHtmlToLexical(htmlContent: string) {
  const [lexicalJson, setLexicalJson] = useState<Array<LexicalNode>>();

  useEffect(() => {
    if (htmlContent) {
      const editor = createEditor();

      editor.update(() => {
        const parser = new DOMParser();
        const textHtmlMimeType = 'text/html';
        const dom = parser.parseFromString(htmlContent, textHtmlMimeType);

        const nodes = $generateNodesFromDOM(editor, dom);
        setLexicalJson(nodes)
      });
    }
  }, [htmlContent]);

  return [lexicalJson];
}
