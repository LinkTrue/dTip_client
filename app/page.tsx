"use client"
// import Image from "next/image";
import { useSteps, Steps } from '../context/StepsContext';

import Step1 from '../components/steps/S1Main';
import Step2 from '../components/steps/S2Username';
import Step3 from '../components/steps/S3Web2Items';
import Step4 from '../components/steps/S4Web3Items';
import Step5 from '../components/steps/S5Preview';

export default function Home() {
  const { currentStep } = useSteps();

  return (
    <div className="">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        {/* <h1>{currentStep}</h1> */}

        {currentStep === Steps.Main && (
            <Step1 />
        )}

        {currentStep === Steps.Username && (
          <Step2 />
        )}
        {currentStep === Steps.Web2Addresses && (
          <Step3 />
        )}

        {currentStep === Steps.Web3Addresses && (
          <Step4 />
        )}

        {currentStep === Steps.Preview &&
          <Step5 />
        }

        <br />
      </main >
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/miladtsx?tab=repositories&q=linktrue&type=&language=&sort="
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <i className="fa-brands fa-github"></i>
          </span>
          Explore source code
        </a>
      </footer>
    </div >
  );
}
