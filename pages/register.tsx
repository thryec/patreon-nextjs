import type { NextPage } from 'next'
import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { create } from 'ipfs-http-client'
import { validateAddress } from '../helpers'

// socials: twitter, instagram, github, mirror, youtube, lenster, radicle, opensea, fxhash

const url: string | any = 'https://ipfs.infura.io:5001/api/v0'
const client = create(url)

type FormData = {
  name: string
  description: string
  walletAddress: string
  avatar: string
  twitter: string
  instagram: string
  youtube: string
  github: string
}

const Register: NextPage = () => {
  const [imageURL, setImageURL] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({})

  const onSubmit = async (data: any) => {
    console.log('data: ', data)
    try {
      console.log('adding profile data to ipfs...')
      const { cid } = await client.add({ content: JSON.stringify(data) })
      const url = `https://ipfs.infura.io/ipfs/${cid}`
      console.log('url: ', url)
    } catch (err) {
      console.log(err)
    }
  }

  const onFileUpload = async (e: any) => {
    const file = e.target.files[0]
    try {
      console.log(`adding ${file.name} to ipfs....`)
      const { cid } = await client.add(
        { content: file },
        {
          cidVersion: 1,
          hashAlg: 'sha3-224',
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${cid}`
      console.log('url: ', url)
      setImageURL(url)
      setValue('avatar', url)
      // https://ipfs.infura.io/ipfs/bafybeibzskkckk5p5e7b67ja3hbxieya64ii2el63grnapm3k3l2rncuum
      // https://ipfs.infura.io/ipfs/bafybohb6aonpga2pjp3zlnlybejlnti5qnletves7y65gkq4i3sa
    } catch (e) {
      console.error('Error uploading file: ', e)
    }
  }

  return (
    <div className="flex justify-center items-center w-full mt-4 mb-32">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-10 pt-8 rounded-xl w-screen max-w-sm">
          <div className="space-y-6">
            <div>
              <label className="tracking-wider">Profile Picture</label>
              {imageURL ? (
                <div>
                  <Image
                    src={imageURL}
                    width="200px"
                    height="200px"
                    alt="profile"
                  />
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png,.gif"
                    {...register('avatar')}
                    onChange={onFileUpload}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full mt-2">
                  <label className="flex flex-col border-2 border-dashed w-full rounded-lg h-32 group">
                    <div className="flex flex-col items-center justify-center pt-7 cursor-pointer">
                      <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="rgb(203 213 225)"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="lowercase pt-1 tracking-wider">
                        Select photo
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpeg,.jpg,.png,.gif"
                      {...register('avatar')}
                      onChange={onFileUpload}
                    />
                  </label>
                </div>
              )}
            </div>
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                className="border border-slate-200 outline-none rounded-md w-full mt-2 px-4 py-2"
                {...register('name', { required: true })}
              />
              {errors.name && (
                <div className="text-pink-500">
                  Please do not leave this field blank
                </div>
              )}
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                className="border border-slate-200 outline-none rounded-md w-full mt-2 px-4 py-2"
                {...register('description', { required: true })}
              />
              {errors.name && (
                <div className="text-pink-500">
                  Please do not leave this field blank
                </div>
              )}
            </div>
            <div>
              <label className="block mb-1">Wallet Address</label>
              <input
                type="text"
                id="walletAddress"
                className="border border-slate-200 outline-none rounded-md w-full mt-2 px-4 py-2"
                {...register('walletAddress', {
                  required: true,
                  validate: validateAddress,
                })}
              />
              {errors.walletAddress &&
                errors.walletAddress.type === 'validate' && (
                  <div className="text-pink-500">
                    Please enter a valid wallet address
                  </div>
                )}
            </div>
            <div>
              <label className="block mb-1">Twitter</label>
              <input
                type="text"
                className="border border-slate-200 outline-none rounded-md w-full mt-2 px-4 py-2"
                {...register('twitter')}
              />
            </div>
            <div>
              <label className="block mb-1">Instagram</label>
              <input
                type="text"
                className="border border-slate-200 outline-none rounded-md w-full mt-2 px-4 py-2"
                {...register('instagram')}
              />
            </div>
            <div>
              <label className="block mb-1">YouTube</label>
              <input
                type="text"
                className="border border-slate-200 outline-none rounded-md w-full mt-2 px-4 py-2"
                {...register('youtube')}
              />
            </div>
            <div>
              <label className="block mb-1">GitHub</label>
              <input
                type="text"
                className="border border-slate-200 outline-none rounded-md w-full mt-2 px-4 py-2"
                {...register('github')}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-pink-400 py-2 px-4 rounded-lg text-white font-bold"
                type="submit"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
