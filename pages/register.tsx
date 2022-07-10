import type { NextPage } from 'next'
import { useState } from 'react'
import path from 'path'
import { promises as fs } from 'fs'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import Loading from '../components/LoadingModal'
import Success from '../components/SuccessModal'
import { create } from 'ipfs-http-client'
import { useContract, useSigner, useAccount } from 'wagmi'

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

const Register: NextPage = ({ CONTRACT_ABI, TESTNET_ADDRESS }: any) => {
  const [loadingModal, setLoadingModal] = useState<boolean>()
  const [successModal, setSuccessModal] = useState<boolean>(true)

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
  const { address } = useAccount()

  const contract = useContract({
    addressOrName: TESTNET_ADDRESS,
    contractInterface: CONTRACT_ABI,
    signerOrProvider: signer,
  })

  const onSubmit = async (data: any) => {
    if (!signer) {
      alert('Please Connect Wallet')
      return
    }
    data.walletAddress = address
    try {
      setLoadingModal(true)
      const { cid } = await client.add({ content: JSON.stringify(data) })
      const url = `https://ipfs.infura.io/ipfs/${cid}`
      console.log('address: ', address, 'url: ', url)
      const txn = await contract.addProfile(address, url)
      const receipt = await txn.wait()
      console.log('txn', receipt)
      setLoadingModal(false)
    } catch (err) {
      console.log('error adding profile:', err)
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
    <div className="flex justify-center items-center w-full mt-4 mb-32">
      {loadingModal && <Loading setLoadingModal={setLoadingModal} />}
      {successModal && (
        <Success setSuccessModal={setSuccessModal} walletAddress={address} />
      )}

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

export const getStaticProps = async () => {
  let TESTNET_ADDRESS
  let CONTRACT_ABI
  let props = {}

  const abiDirectory = path.join(
    process.cwd(),
    '../patreon-foundry/out/Patreon.sol'
  )
  const abiFile = path.join(abiDirectory, 'Patreon.json')
  const abiDetails = await fs.readFile(abiFile, 'utf8')
  CONTRACT_ABI = JSON.parse(abiDetails.toString())
  const addressDirectory = path.join(
    process.cwd(),
    '../patreon-foundry/broadcast/Patreon.s.sol/69'
  )
  const addressFile = path.join(addressDirectory, 'run-latest.json')
  const addressDetails = await fs.readFile(addressFile, 'utf8')
  TESTNET_ADDRESS = JSON.parse(addressDetails.toString())

  props = {
    ...props,
    CONTRACT_ABI: CONTRACT_ABI.abi,
    TESTNET_ADDRESS: TESTNET_ADDRESS.transactions[0].contractAddress,
  }

  return {
    props,
  }
}
