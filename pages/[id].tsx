import { Web3Provider } from "@ethersproject/providers";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "context/Web3/connectors";
import { ContractContext } from "context/Web3/contracts";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

enum Step {
  Network,
  Adress,
}

enum Network {
  Polygon,
  Arbitrum,
}

async function checkCode(
  supabase: SupabaseClient,
  code: string
): Promise<boolean> {
  const codes = await supabase.from("Lisbon").select("code");
  console.log(codes);
  //return codes.includes(code);
  return true;
}

const IndexPage = () => {
  const router = useRouter();
  const context = useWeb3React<Web3Provider>();
  const { contract } = useContext(ContractContext);
  const { library, account, activate, active } = context;
  const endDate = 1636549200000; //Nov 10, 13.00.00 UTC
  const [countdown, setCountdown] = useState<number[]>([]);
  const [countdownActive, disableCountdown] = useState<boolean>(true);
  const [step, setStep] = useState<Step>(Step.Network);
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  const [preferedNetwork, setPreferedNetwork] = useState<Network>();
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (!router?.query?.id || !supabase) {
      return;
    }
  }, [router?.query, supabase]);

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
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setCountdown([hours, minutes, seconds]);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (!account) {
      return;
    }
    addAirdropRecipient();
  }, [account]);

  async function addAirdropRecipient(): Promise<void> {
    console.log(account);
    try {
      await supabase.from("Lisbon").insert([
        {
          network: preferedNetwork,
          address: account ? account : address,
          code: router.query.id as string,
        },
      ]);
    } catch (error) {
      console.log("error", error);
    }
    router.push("/thanks");
  }

  return (
    <>
      {/* Desktop + Large Desktop */}
      <div className="hidden xl:flex flex-col w-full h-screen overflow-hidden bg-primaryLight">
        <div className="mx-auto mt-8">
          <img src="/textLogo.png" className="h-14 w-64" />
        </div>
        <div className="w-9/12 mx-auto z-20 mt-40">
          <h3 className="font-light text-gray-800 text-4xl pb-12 text-center">
            Coming soon...
          </h3>
          <div className="flex flex-row justify-evenly">
            <div className="text-center">
              <h1 className="font-medium text-4xl leading-snug">
                {countdown[0]}
              </h1>
              <p className="text-2xl font-landing text-gray-800">Hours</p>
            </div>
            <div className="text-center">
              <h1 className="font-medium text-4xl leading-snug">
                {countdown[1]}
              </h1>
              <p className="text-2xl font-landing text-gray-800">Minutes</p>
            </div>
            <div className="text-center">
              <h1 className="font-medium text-4xl leading-snug">
                {countdown[2]}
              </h1>
              <p className="text-2xl font-landing text-gray-800">Seconds</p>
            </div>
          </div>
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
      <div className="w-full h-screen xl:hidden bg-primaryLight font-landing">
        <div className="w-full flex flex-row justify-center pt-8">
          <img src="/textLogo.png" className="h-10 w-54" />
        </div>
        <div className="w-10/12 mx-auto z-40 mt-14 md:mt-40">
          <h3 className="w-full relative mx-auto font-light text-gray-800 text-4xl text-center z-20">
            Airdrop registration open until
          </h3>
          <div className="flex flex-row justify-evenly mt-6">
            <div className="text-center">
              <h1 className="font-medium text-4xl leading-snug">
                {countdown[0]}
              </h1>
              <p className="text-2xl font-light text-gray-800">Hours</p>
            </div>
            <div className="text-center">
              <h1 className="font-medium text-4xl leading-snug">
                {countdown[1]}
              </h1>
              <p className="text-2xl font-light text-gray-800">Minutes</p>
            </div>
            <div className="text-center">
              <h1 className="font-medium text-4xl leading-snug">
                {countdown[2]}
              </h1>
              <p className="text-2xl font-light text-gray-800">Seconds</p>
            </div>
          </div>
          <h3 className="text-center text-2xl font-light pb-2 pt-18">
            {step === Step.Network ? "Choose Network" : "Register for Airdrop"}
          </h3>
          {step === Step.Network ? (
            <div className="mx-auto w-full flex flex-row items-center">
              <button
                className="relative w-full py-3 px-3 mr-2 z-20 flex flex-row items-center justify-center rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setPreferedNetwork(Network.Polygon);
                  setStep(Step.Adress);
                }}
              >
                <p className="text-xl font-medium text-white">Polygon</p>
              </button>
              <button
                className="relative w-full py-3 px-3 ml-2 z-20 flex flex-row items-center justify-center rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setPreferedNetwork(Network.Arbitrum);
                  setStep(Step.Adress);
                }}
              >
                <p className="text-xl font-medium text-white">Arbitrum</p>
              </button>
            </div>
          ) : (
            <>
              <div className="mx-auto shadow-lg bg-white rounded-xl py-2 px-2 w-full flex flex-row items-center justify-between">
                <input
                  type="text"
                  name="address"
                  className="w-10/12 p-2 text-base mx-2 text-gray-900"
                  placeholder="ethereum address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="clear">
                  <input
                    type="submit"
                    value="Register"
                    name="submit"
                    className="font-medium text-base bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 cursor-pointer"
                    readOnly
                    onClick={() => addAirdropRecipient()}
                  />
                </div>
              </div>
              <h3 className="text-center text-lg font-light pt-3 pb-2">Or</h3>
              <button
                className="relative w-full py-3 px-3 z-20 flex flex-row items-center justify-center rounded-lg cursor-pointer bg-blue-600 hover:bg-blue-700"
                onClick={() => activate(connectors.Injected)}
              >
                <p className="text-xl font-medium text-white">Connect Wallet</p>
              </button>
            </>
          )}
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