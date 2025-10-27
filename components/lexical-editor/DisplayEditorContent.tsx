'use client'

import React from 'react';
import { useLexicalToHtml } from '@/components/lexical-editor/useLexicalFormat';

export function DisplayEditorContent ({ jsonContent, ...props }: React.ComponentProps<"div"> & { jsonContent: string }) {
    const html = useLexicalToHtml(jsonContent);

    return (
      <div dangerouslySetInnerHTML={{ __html: html }} {...props} />
    );
  }
