import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ContractContext } from "context/Web3/contracts";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function thanksPage(): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  return (
    <div className="w-full h-screen bg-primaryLight overflow-hidden">
      <div className="w-full flex flex-row justify-center pt-8">
        <img src="/textLogo.png" className="h-10 w-54" />
      </div>
      <div className="w-full text-center mt-14 md:mt-48 lg:mt-96 xl:mt-14 2xl:mt-80 z-20">
        <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-medium w-full lg:w-1/2 text-center mx-auto">
          All done!
        </h1>
        <div className="mx-auto w-10/12 lg:w-1/2 lg:mt-4 justify-center flex">
          <div className="z-20">
            <p className="mt-4 text-xl lg:text-2xl 2xl:text-3xl font-light z-10">
              We will send you xPOP on your prefered network. Be sure to join
              our Liquidity Event on{" "}
              <span className="font-normal">Nov. 29</span>. Afterwards you will
              be able to convert your xPOP into POP.
            </p>
            <p className="text-xl lg:text-2xl 2xl:text-3xl font-light text-center mt-4">
              Join our community on
              <a
                className="font-normal cursor-pointer ml-2"
                href="https://discord.gg/RN4VGqPDwX"
                target="_blank"
              >
                Discord
              </a>{" "}
              or follow us on
              <a
                className="font-normal cursor-pointer ml-1"
                href="https://twitter.com/popcorn_DAO"
                target="_blank"
              >
                Twitter
              </a>{" "}
              for more information!
            </p>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center">
        <img
          src="/images/astronautCat-svg.svg"
          alt="astronautCat"
          className="absolute top-0 z-20 2xl:top-10"
        />
      </div>
      <img
        src="/images/moonDetails.svg"
        alt="moonDetails"
        className="absolute bottom-0 z-10 w-full"
      />
      <img
        src="/images/moon.svg"
        alt="moon"
        className="absolute bottom-0 -z-10 w-full"
      />
    </div>
  );
}
