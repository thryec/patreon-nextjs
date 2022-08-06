import type { NextPage } from 'next'
import { useState } from 'react'
import { KOVAN_TESTNET_ADDRESS, CONTRACT_ABI } from '../constants'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import Loading from '../components/LoadingModal'
import RegisterSuccess from '../components/RegisterSucessModal'
import Error from '../components/ErrorModal'
import { create } from 'ipfs-http-client'
import { useContract, useSigner, useAccount, useConnect, chain } from 'wagmi'

const url: string | any = 'https://ipfs.infura.io:5001/api/v0'
const client = create(url)

type FormData = {
  name: string
  description: string
  walletAddress: string | undefined
  avatar: string
  twitter: string
  instagram: string
  youtube: string
  github: string
}

const Register: NextPage = () => {
  const [loadingModal, setLoadingModal] = useState<boolean>()
  const [registerSuccessModal, setRegisterSuccessModal] = useState<boolean>()
  const [errorModal, setErrorModal] = useState<boolean>()
  const [errorMessage, setErrorMessage] = useState<any>()
  const [imageURL, setImageURL] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      avatar:
        'https://ipfs.infura.io/ipfs/bafkrohcwcm5gxrmu4xps2gtdgq23giyhj2fy3ws7tbvbkooel33a',
    },
  })

  const { data: signer, isError, isLoading } = useSigner()
  const { connect, connectors } = useConnect({
    chainId: chain.optimism.id,
  })
  const { address } = useAccount()

  const contract = useContract({
    addressOrName: KOVAN_TESTNET_ADDRESS,
    contractInterface: CONTRACT_ABI,
    signerOrProvider: signer,
  })

  const onSubmit = async (data: any) => {
    if (!signer) {
      alert('Connect your wallet first!')
      return
    }
    data.walletAddress = address
    try {
      setLoadingModal(true)
      const { cid } = await client.add({ content: JSON.stringify(data) })
      const url = `https://ipfs.infura.io/ipfs/${cid}`
      const txn = await contract.addProfile(address, url)
      const receipt = await txn.wait()
      if (receipt) {
        setLoadingModal(false)
        setRegisterSuccessModal(true)
      }
    } catch (error: any) {
      console.log('error adding profile:', error)
      setLoadingModal(false)
      setErrorMessage(error.message)
      setErrorModal(true)
    }
  }

  const onFileUpload = async (e: any) => {
    const file = e.target.files[0]
    try {
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
    } catch (err) {
      console.error('Error uploading file: ', err)
    }
  }

  return (
    <div className="flex justify-center h-screen w-full ">
      <div>
        {loadingModal && <Loading setLoadingModal={setLoadingModal} />}
        {registerSuccessModal && (
          <RegisterSuccess
            setRegisterSuccessModal={setRegisterSuccessModal}
            walletAddress={address}
          />
        )}
        {errorModal && (
          <Error setErrorModal={setErrorModal} errorMessage={errorMessage} />
        )}
        <h1 className="text-5xl font-extrabold text-center mb-4">
          Join the community
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center text-lg">
            <div className="space-y-6 px-10 pt-8 rounded-xl w-screen max-w-sm">
              <div>
                <label className="tracking-wider font-semibold mb-2 block">
                  Profile Picture
                </label>
                {imageURL ? (
                  <div className="flex justify-center">
                    <label className="mt-2">
                      <Image
                        src={imageURL}
                        width="150x"
                        height="150x"
                        alt="profile"
                        className="rounded-full block hover:opacity-75 cursor-pointer"
                      />
                      <input
                        type="file"
                        accept=".jpeg,.jpg,.png,.gif"
                        {...register('avatar')}
                        onChange={onFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full mt-2">
                    <label className="flex flex-col border-2 border-slate-300 border-dashed w-full rounded-lg h-32 group">
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
                        <p className="pt-1 tracking-wider">select photo</p>
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
                <label className="block mb-1 font-semibold ">Name</label>
                <input
                  type="text"
                  className="border border-slate-300 outline-none rounded-md w-full mt-2 px-4 py-2"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <div className="text-pink-500">
                    Please do not leave this field blank
                  </div>
                )}
              </div>
              <div>
                <label className="block mb-1 font-semibold ">Description</label>
                <textarea
                  className="border border-slate-300 outline-none rounded-md w-full mt-2 px-4 py-2 h-40"
                  {...register('description', { required: true })}
                />
                {errors.name && (
                  <div className="text-pink-500">
                    Please do not leave this field blank
                  </div>
                )}
              </div>
            </div>
            <div className="px-10 pt-8 rounded-xl w-screen max-w-sm place-content-evenly">
              <div className="space-y-6">
                <div>
                  <label className="block mb-1 font-semibold ">Twitter</label>
                  <input
                    type="text"
                    className="border border-slate-300 outline-none rounded-md w-full mt-2 px-4 py-2"
                    {...register('twitter')}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold ">Instagram</label>
                  <input
                    type="text"
                    className="border border-slate-300 outline-none rounded-md w-full mt-2 px-4 py-2"
                    {...register('instagram')}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold ">YouTube</label>
                  <input
                    type="text"
                    className="border border-slate-300 outline-none rounded-md w-full mt-2 px-4 py-2"
                    {...register('youtube')}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold ">GitHub</label>
                  <input
                    type="text"
                    className="border border-slate-300 outline-none rounded-md w-full mt-2 px-4 py-2"
                    {...register('github')}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="bg-violet-500 py-2 px-8 rounded-lg text-2xl text-white font-bold"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
