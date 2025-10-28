'use client'

import React from 'react';
import { useLexicalToHtml } from '@/components/lexical-editor/useLexicalFormat';
import { isValidJSON } from '@/lib/utils';

export function DisplayEditorContent ({ jsonContent, ...props }: React.ComponentProps<"div"> & { jsonContent: string }) {
    const html = isValidJSON(jsonContent) ? useLexicalToHtml(jsonContent) : jsonContent

    return (
      <div dangerouslySetInnerHTML={{ __html: html }} {...props} />
    );
  }
