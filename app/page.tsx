"use client";
import Image from "next/image";
import { useSteps, Steps } from "../context/StepsContext";

import Step1 from "../components/steps/S1Main";
import Step2 from "../components/steps/S2Username";
import Step3 from "../components/steps/S3Web2Items";
import Step4 from "../components/steps/S4Web3Items";
import Step5 from "../components/steps/S5Preview";

export default function Home() {
  const { currentStep } = useSteps();

  return (
    <div className="flex flex-col"> {/* Use flex and set minimum height to screen height */}
      <main
        className="flex-grow flex flex-col justify-center p-8 min-h-screen"

      >
        {currentStep === Steps.Main && <Step1 />}
        {currentStep === Steps.Username && <Step2 />}
        {currentStep === Steps.Web2Addresses && <Step3 />}
        {currentStep === Steps.Web3Addresses && <Step4 />}
        {currentStep === Steps.Preview && <Step5 />}
      </main>

      <footer className="flex flex-col justify-center items-center space-y-4 pt-2">
        <hr className="border w-full" />
        <div className="flex items-center justify-center gap-2">
          Built with
          <Image
            title="built with passion"
            src={"/icons/tech/h.svg"}
            width={21}
            height={21}
            alt="heart icon"
          />
          <p>using</p>
          <Image
            title="built on github"
            src={"/icons/tech/gh.svg"}
            width={21}
            height={21}
            alt="github icon"
          />
          <Image
            title="built with nextjs"
            src={"/icons/tech/nj.svg"}
            width={21}
            height={21}
            alt="nextjs icon"
          />
          <Image
            title="built with solidity"
            src={"/icons/tech/solidity.svg"}
            width={21}
            height={21}
            alt="solidity icon"
          />
          <Image
            title="built with hardhat"
            src={"/icons/tech/hh.svg"}
            width={21}
            height={21}
            alt="hardhat icon"
          />
          <p>on</p>
          <Image
            title="built with optimism"
            src={"/icons/chains/op.svg"}
            width={21}
            height={21}
            alt="optimism blockchain icon"
          />
        </div>
      </footer>

      <div className="p-4">
        <a
          className="flex justify-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/miladtsx?tab=repositories&q=linktrue&type=&language=&sort="
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <i className="fa-brands fa-github text-xs"></i>
          </span>
          Explore source code
        </a>
      </div>
    </div>
  );
}
