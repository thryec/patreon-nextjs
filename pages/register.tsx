import type { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { create } from 'ipfs-http-client'
import { validateAddress } from '../helpers'

const url: string | any = 'https://ipfs.infura.io:5001/api/v0'
const client = create(url)

type FormData = {
  name: string
  description: string
  walletAddress: string
  avatar: string
}

const Register: NextPage = () => {
  const [imageURL, setImageURL] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({})

  const onSubmit = async (data: any) => {}

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
        <div>
          <div className="px-10 pt-8 rounded-xl w-screen max-w-sm">
            <div className="space-y-6">
              <div>
                <label className="block mb-1 ">Name</label>
                <input
                  type="text"
                  className="border border-slate-200 outline-none rounded-md w-full mt-2 px-4 py-2"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <div className="">Please do not leave this field blank</div>
                )}
              </div>
              <div>
                <label className="block mb-1 ">Wallet Address</label>
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
                    <div className="">Please enter a valid wallet address</div>
                  )}
              </div>
              <div className="">
                <label className=" tracking-wider">
                  Upload Profile Picture
                </label>
                {imageURL ? (
                  <img src={imageURL} width="400px" height="400px" />
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
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
