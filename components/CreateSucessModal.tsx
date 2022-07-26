interface CreateSuccessModalProps {
  setCreateSuccessModal: (a: boolean) => void
  txHash: string | undefined
}

const CreateSuccess = ({
  setCreateSuccessModal,
  txHash,
}: CreateSuccessModalProps) => {
  return (
    <div className="fixed left-0 top-0 flex items-center inset-0 z-50 outline-none">
      <div
        className="absolute bg-black opacity-50 inset-0 z-0"
        onClick={() => setCreateSuccessModal(false)}
      />
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white flex justify-center">
        <div className="text-lg">
          Success! View your transaction{' '}
          <a
            href={`https://kovan-optimistic.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            <span
              className="underline cursor-pointer font-semibold"
              onClick={() => setCreateSuccessModal(false)}
            >
              here
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CreateSuccess
