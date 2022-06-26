import type { NextPage } from "next";
import CreatorInfo from "../components/CreatorInfo";

const Home: NextPage = () => {
  return (
    <div className="flex justify-center h-screen">
      <div>
        <CreatorInfo />
      </div>
    </div>
  );
};

export default Home;
