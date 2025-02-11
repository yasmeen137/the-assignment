import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <PacmanLoader size={30} color="#FFC0CB" loading={true} speedMultiplier={1} />
    </div>
  );
};

export default Loading;
