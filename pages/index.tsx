import type { NextPage } from "next";
import CreatorInfo from "../components/CreatorInfo";
import { shortenAddress } from "../helpers";
import { creators } from "../creators";

const Home: NextPage = () => {
  console.log("creators: ", creators);
  return (
    <div className="flex justify-center h-screen">
      <div>
        <CreatorInfo />
      </div>
    </div>
  );
};

export default Home;
