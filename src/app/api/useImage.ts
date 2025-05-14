import { Dispatch, SetStateAction } from 'react'

import axios from 'axios'
import { useMutation } from 'react-query'

type ImageUrls = {
  url: string
}

type Props = {
  setImageURLs: Dispatch<SetStateAction<ImageUrls[]>>
}

type Field = {
  prompt: string
  size: string
  num_images: number
}

const postImage = async (field: Field) => {
  const response = await axios.post(
    'https://api.openai.com/v1/images/generations',
    {
      model: 'image-alpha-001',
      response_format: 'url',
      ...field,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
      },
    },
  )
}

export const usePostImagesOpenAI = ({ setImageURLs }: Props) => {
  const result = useMutation({
    mutationFn: (field) => postImage(field)
  })
}
