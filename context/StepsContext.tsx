"use client"
import { createContext, useState, ReactNode, useContext } from 'react';

// Define the type for your state
interface StepsContextType {
    currentStep: Steps;
    nextStep: () => void;
    prevStep: () => void;
    setStep: (step: Steps) => void;
}

export enum Steps {
    Main = 0,
    Username = 1,
    Web2Addresses = 2,
    Web3Addresses = 3,
    Preview = 4,
    // Add more steps as needed
}

// Create the context
const StepsContext = createContext<StepsContextType | undefined>(undefined);

// Provide the context to the app
export const StepsProvider = ({ children }: { children: ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<Steps>(Steps.Main);

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);
    const setStep = (step: number) => setCurrentStep(step);

    return (
        <StepsContext.Provider value={{ currentStep, nextStep, prevStep, setStep }}>
            {children}
        </StepsContext.Provider>
    );
};

// Custom hook to use the context
export const useSteps = () => {
    const context = useContext(StepsContext);
    if (!context) {
        throw new Error('useSteps must be used within a StepsProvider');
    }
    return context;
};
