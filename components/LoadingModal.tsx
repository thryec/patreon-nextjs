import Spinner from './Spinner'

interface LoadingModalProps {
  setLoadingModal: (a: boolean) => void
}

const Loading = (props: LoadingModalProps) => {
  return (
    <div className="fixed left-0 top-0 flex items-center inset-0 z-50 outline-none">
      <div className="absolute bg-black opacity-50 inset-0 z-0" />
      <div className="w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white flex justify-center">
        <Spinner />
      </div>
    </div>
  )
}

export default Loading
