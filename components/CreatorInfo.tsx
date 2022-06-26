import { useState } from "react";
import ContributeModal from "./ContributeModal";

const CreatorInfo = () => {
  const [contributeModal, setContributeModal] = useState<boolean>();

  return (
    <div className="border-2 rounded-lg border-slate-200 p-5">
      <div className="text-xl font-bold">Creator Address</div>
      <button
        className="bg-gradient-to-r from-pink-500 to-yellow-500  py-2 px-4 rounded-lg text-white font-bold"
        onClick={() => setContributeModal(true)}
      >
        Send ETH
      </button>
      {contributeModal && (
        <ContributeModal setContributeModal={setContributeModal} />
      )}
    </div>
  );
};

export default CreatorInfo;
