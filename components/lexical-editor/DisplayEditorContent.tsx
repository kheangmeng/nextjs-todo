import React from 'react';
import { useLexicalToHtml } from '@/components/lexical-editor/useLexicalToHtml';

export function DisplayContent ({ jsonContent, ...props }: React.ComponentProps<"div"> & { jsonContent: string }) {
    const html = useLexicalToHtml(jsonContent);

    return (
      <div dangerouslySetInnerHTML={{ __html: html }} {...props} />
    );
  }
