'use client'

import { useEffect, useState } from "react"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const getImageInfo = (imageUrl?: string): [string, string, string] => {
  if (imageUrl) {
    const url = new URL(imageUrl);
    const str = url.pathname.split('/')

    const urlParams = new URLSearchParams(url.search);
    const title = urlParams.get('text') || ''

    return [title, str[2], str[3]]
  }

  return ['Blog Title', '000', 'ffffff']
}

export default function ImagePlaceHolder({url, onChange}: { url?: string, onChange: (title: string, url: string) => void}) {
  const [existTitle, exitBgColor, exitTextColor] = getImageInfo(url)
  const [title, setTitle] = useState(existTitle)
  const [textColor, setTextColor] = useState(exitTextColor)
  const [bgColor, setBgColor] = useState(exitBgColor)
  const imageUrl = `https://placehold.co/600x400/${bgColor}/${textColor}?text=${title}`

  useEffect(() => {
    onChange(title, imageUrl)
  }, [title, textColor, bgColor])

  return (
    <>
      <Field>
        <FieldLabel htmlFor="text-title">
          Title
        </FieldLabel>
        <Input
          id="text-title"
          placeholder="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>
      <FieldGroup className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="text-color">
            Text Color
          </FieldLabel>
          <Input
            id="text-color"
            placeholder="color"
            required
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="bg-color">
            Background Color
          </FieldLabel>
          <Input
            id="bg-color"
            placeholder="color"
            required
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </Field>
      </FieldGroup>

      <Field>
        <FieldLabel htmlFor="text-color">
          Image
        </FieldLabel>
        <img className="mx-auto" src={imageUrl} />
      </Field>
    </>
  )
}
