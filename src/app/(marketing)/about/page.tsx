'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import Head from 'next/head'

import axios from 'axios'

type ImageUrls = {
  url: string
}

export default function Home() {
  const [inputText, setInputText] = useState('a cat sitting on a couch')
  const [imageSize, setImageSize] = useState('256x256')
  const [numImages, setNumImages] = useState(1)
  const [imageURLs, setImageURLs] = useState<ImageUrls[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
          model: 'image-alpha-001',
          prompt: inputText,
          size: imageSize,
          num_images: Number(numImages),
          response_format: 'url',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
          },
        },
      )
      if (response.data && response.data.data) {
        console.log('🚀 ~ file: page.tsx:40 ~ handleSubmit ~ response.data.data:', response.data.data)
        setImageURLs(response.data.data)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageSize(event.target.value)
  }

  if (loading) {
    return (
      <div className="flex justify-center" aria-label="読み込み中">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>画像生成アプリ</title>
        <meta name="description" content="AI が画像を生成します" />
      </Head>

      <h1 className="m-5 text-2xl font-bold leading-3 text-gray-900">画像生成アプリ</h1>

      <div className="mx-4 my-2 flex-auto rounded-md bg-white p-4 shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <div className="w-1/2 py-2 pr-4">
              <h2 className="block text-sm font-medium leading-6 text-gray-900">
                生成したい画像の内容（英語：例 dog sleeping bed）：
              </h2>
              <textarea
                rows={4}
                className="block w-full rounded-md border-0 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                value={inputText}
                onChange={(event) => setInputText(event.target.value)}
              />
            </div>

            <div className="w-1/2 py-2 pl-4">
              <div>
                <h2 className="block text-sm font-medium leading-6 text-gray-900">画像の数（1 - 10指定）:</h2>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={numImages}
                  onChange={(event) => setNumImages(Number(event.target.value))}
                  className="block w-1/6 rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="mt-4">
                <h2 className="block text-sm font-medium leading-6 text-gray-900">画像サイズ:</h2>
                <div className="flex text-sm font-medium leading-6 text-gray-900">
                  <label className="mr-3">
                    <input
                      type="radio"
                      name="imagesize"
                      value="256x256"
                      checked={imageSize === '256x256'}
                      onChange={handleChange}
                    />
                    256x256
                  </label>

                  <label className="mr-3">
                    <input type="radio" name="imagesize" value="512x512" onChange={handleChange} />
                    512x512
                  </label>

                  <label className="mr-3">
                    <input type="radio" name="imagesize" value="1024x1024" onChange={handleChange} />
                    1024x1024
                  </label>
                </div>
              </div>
            </div>

            <div className="py-3">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                画像を生成する
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mx-4 my-2 flex-auto rounded-md bg-white p-4 shadow">
        <h2 className="block text-sm font-medium leading-6 text-gray-900">生成結果：</h2>
        {imageURLs.length > 0 && (
          <div className="flex">
            {imageURLs.map((item, index) => (
              <div className="mr-2" key={index}>
                <img src={item.url} alt={`generated image ${index}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
