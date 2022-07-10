import Link from 'next/link'

interface SuccessModalProps {
  setSuccessModal: (a: boolean) => void
  walletAddress: string | undefined
}

const Success = ({ setSuccessModal, walletAddress }: SuccessModalProps) => {
  return (
    <div className="fixed left-0 top-0 flex items-center inset-0 z-50 outline-none">
      <div className="absolute bg-black opacity-50 inset-0 z-0" />
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white flex justify-center">
        <div className="text-lg">
          Success! View your profile{' '}
          <Link href={`creator/${walletAddress}`} passHref>
            <span className="underline cursor-pointer">here</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Success
