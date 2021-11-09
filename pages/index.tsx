import { Web3Provider } from "@ethersproject/providers";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { useWeb3React } from "@web3-react/core";
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

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      router.replace(window.location.pathname);
    }
  }, [router.pathname]);

  useEffect(() => {
    router.push("https://popcorn.network/")
  }, []);


  
  return <div className=""></div>;
};

export default IndexPage;
