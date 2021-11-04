import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import Navbar from "components/NavBar";
import { ContractContext } from "context/Web3/contracts";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const ErrorPage = () => {
  const router = useRouter();
  const context = useWeb3React<Web3Provider>();
  const { contract } = useContext(ContractContext);
  const { library, account, activate, active } = context;

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (!account || !contract) {
      return;
    }
    if (true) {
      router.push("/claim");
    } else {
      router.push("/error");
    }
  }, [account]);

  return (
    <div className="w-full h-screen bg-primaryLight overflow-hidden">
      <Navbar />
      <div className="w-full text-center mt-14 z-20">
        <h1 className="text-5xl font-medium w-1/2 text-center mx-auto">
          Congratulations!
        </h1>
        <div className="mx-auto w-1/2 justify-center flex">
          <div className="z-20">
            <p className="mt-8 text-2xl font-light z-10">
              You are eligible to claim:
            </p>
            <div className="mt-4 px-8 py-4 border border-gray-800 rounded-lg bg-primaryLight">
              <p className="text-6xl font-medium">10.000 POP</p>
            </div>
            <button className="w-full mt-8 py-3 px-3 z-20 flex flex-row items-center justify-center rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700">
              <p className="text-xl font-medium text-white">
                Claim
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center">
        <img
          src="/images/popcorn.svg"
          alt="popcorn"
          className="absolute -top-100 z-10"
        />
        <img
          src="/images/astronautCat.svg"
          alt="astronautCat"
          className="absolute top-0 z-20"
        />
      </div>
      <img
        src="/images/moonDetails.svg"
        alt="moonDetails"
        className="absolute bottom-0 z-10"
      />
      <img
        src="/images/moon.svg"
        alt="moon"
        className="absolute bottom-0 -z-10"
      />
    </div>
  );
};

export default ErrorPage;