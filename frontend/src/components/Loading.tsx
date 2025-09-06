import { ClipLoader } from "react-spinners";

function Loading() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <ClipLoader color="#0B62FF" />
    </div>
  );
}

export default Loading;
