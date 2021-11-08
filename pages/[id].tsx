import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { ContractContext } from "context/Web3/contracts";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const IndexPage = () => {
  const router = useRouter();
  const context = useWeb3React<Web3Provider>();
  const { contract } = useContext(ContractContext);
  const { library, account, activate, active } = context;
  const endDate = 1638172800000; //Nov 29, 08.00.00 UTC
  const [countdown, setCountdown] = useState<number[]>([]);
  const [countdownActive, disableCountdown] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (countdownActive) {
      setInterval(function () {
        const now = new Date().getTime();

        const distance = endDate - now;
        if (distance < 0) {
          disableCountdown(false);
          setCountdown([0, 0, 0, 0]);
        }

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown([days, hours, minutes, seconds]);
      }, 1000);
    }
  }, []);

  return (
    <>
      {/* Desktop + Large Desktop */}
      <div className="hidden xl:flex flex-col w-full h-screen bg-primaryLight">
        <div className="mx-auto mt-8">
          <img src="/textLogo.png" className="h-14 w-64" />
        </div>
        <div className="w-9/12 mx-auto z-20 mt-40">
          <div className="flex flex-row justify-evenly">
            <div className="text-center">
              <h1 className="font-bold text-7xl leading-snug">
                {countdown[0]}
              </h1>
              <p className="text-3xl font-landing text-gray-800">Days</p>
            </div>
            <div className="text-center">
              <h1 className="font-bold text-7xl leading-snug">
                {countdown[1]}
              </h1>
              <p className="text-3xl font-landing text-gray-800">Hours</p>
            </div>
            <div className="text-center">
              <h1 className="font-bold text-7xl leading-snug">
                {countdown[2]}
              </h1>
              <p className="text-3xl font-landing text-gray-800">Minutes</p>
            </div>
            <div className="text-center">
              <h1 className="font-bold text-7xl leading-snug">
                {countdown[3]}
              </h1>
              <p className="text-3xl font-landing text-gray-800">Seconds</p>
            </div>
          </div>
          <h3 className="font-light text-gray-800 text-4xl pt-12 text-center">
            Coming soon...
          </h3>
        </div>
        <img
          src="/images/mobileBlueCat.svg"
          alt="catHandsUp"
          className="absolute right-40 bottom-30 w-3/12 2xl:bottom-80 z-10 2xl:w-3/12"
        />
        <img
          src="/images/Yellow_cat.png"
          alt="catYellow"
          className="absolute bottom-28 2xl:bottom-72 left-40 z-10 2xl:w-5/12"
        />
        <img
          src="/images/Background_ hill.svg"
          alt="bgHill"
          className="absolute bottom-0 w-full"
        />
      </div>
      {/* Mobile + Tablet */}
      <div className="w-full h-screen xl:hidden bg-primaryLight">
        <div className="w-full flex flex-row justify-center pt-12">
          <img src="/textLogo.png" className="h-14 w-64" />
        </div>
        <div className="w-9/12 mx-auto z-20 mt-10 md:mt-40">
          <div className="flex flex-col md:hidden">
            <div className="flex flex-row justify-evenly">
              <div className="text-center">
                <h1 className="font-bold text-7xl leading-snug">
                  {countdown[0]}
                </h1>
                <p className="text-3xl font-landing text-gray-800">Days</p>
              </div>
              <div className="text-center">
                <h1 className="font-bold text-7xl leading-snug">
                  {countdown[1]}
                </h1>
                <p className="text-3xl font-landing text-gray-800">Hours</p>
              </div>
            </div>
            <div className="flex flex-row justify-evenly">
              <div className="text-center">
                <h1 className="font-bold text-7xl leading-snug">
                  {countdown[2]}
                </h1>
                <p className="text-3xl font-landing text-gray-800">Minutes</p>
              </div>
              <div className="text-center">
                <h1 className="font-bold text-7xl leading-snug">
                  {countdown[3]}
                </h1>
                <p className="text-3xl font-landing text-gray-800">Seconds</p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-row justify-evenly">
            <div className="text-center">
              <h1 className="font-bold text-7xl leading-snug">
                {countdown[0]}
              </h1>
              <p className="text-3xl font-landing text-gray-800">Days</p>
            </div>
            <div className="text-center">
              <h1 className="font-bold text-7xl leading-snug">
                {countdown[1]}
              </h1>
              <p className="text-3xl font-landing text-gray-800">Hours</p>
            </div>
            <div className="text-center">
              <h1 className="font-bold text-7xl leading-snug">
                {countdown[2]}
              </h1>
              <p className="text-3xl font-landing text-gray-800">Minutes</p>
            </div>
            <div className="text-center">
              <h1 className="font-bold text-7xl leading-snug">
                {countdown[3]}
              </h1>
              <p className="text-3xl font-landing text-gray-800">Seconds</p>
            </div>
          </div>
          <h3 className="font-light text-gray-800 text-4xl pt-8 text-center">
            Coming soon...
          </h3>
        </div>
        <img
          src="/images/Yellow_cat.png"
          alt="catYellow"
          className="absolute bottom-6 lg:left-20 lg:w-6/12 z-10 "
        />
        <img
          src="/images/Background_ hill.svg"
          alt="bgHill"
          className="absolute bottom-0 w-full"
        />
      </div>
    </>
  );
};

export default IndexPage;
