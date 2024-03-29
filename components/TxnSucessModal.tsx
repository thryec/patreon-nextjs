interface TxnSuccessModalProps {
  setTxnSuccessModal: (a: boolean) => void
  txHash: string | undefined
}

const TxnSuccess = ({ setTxnSuccessModal, txHash }: TxnSuccessModalProps) => {
  return (
    <div className="fixed left-0 top-0 flex items-center inset-0 z-50 outline-none text-xl">
      <div
        className="absolute bg-black opacity-50 inset-0 z-0"
        onClick={() => setTxnSuccessModal(false)}
      />
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white flex justify-center">
        <div>
          Success! View your transaction{' '}
          <a
            href={`https://polygonscan.com/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            <span
              className="underline cursor-pointer font-semibold"
              onClick={() => setTxnSuccessModal(false)}
            >
              here
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default TxnSuccess
