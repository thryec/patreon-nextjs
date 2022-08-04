import Link from 'next/link'

interface ErrorModalProps {
  setErrorModal: (a: boolean) => void
  errorMessage: string | undefined
}

const Error = ({ setErrorModal, errorMessage }: ErrorModalProps) => {
  return (
    <div className="fixed left-0 top-0 flex items-center inset-0 z-50 outline-none">
      <div
        className="absolute bg-black opacity-50 inset-0 z-0"
        onClick={() => setErrorModal(false)}
      />
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white flex justify-center">
        <div className="text-xl text-center space-y-4">
          <span className="text-red-500">Error: {errorMessage}</span>
        </div>
      </div>
    </div>
  )
}

export default Error
