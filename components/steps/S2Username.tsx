"use client"
import { useSteps } from '@/context/StepsContext'
import { useGlobalState } from "@/context/GlobalStateContext";
import { useContractMethods } from '@/hooks/useContractMethods';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const S2Username = () => {

    const { prevStep, nextStep } = useSteps();
    const {
        userProfile,
        updateUsername,
        userNameOK,
        setUserNameOK,
        userNameCheckOK,
        setUserNameCheckOK,
        usernameError,
        setUsernameError
    } = useGlobalState();
    const { isUsernameAvailable } = useContractMethods();

    const [isChecking, setIsChecking] = useState(false);
    const [isUsernameError, setIsUsernameError] = useState(false);

    // Handle input change for user information (step 1)
    function handleUserInfoChange(e: React.ChangeEvent<HTMLInputElement>) {
        const validateUsername = (username: string) => {
            const lowercaseEnglishPattern = /^[a-z\s]+$/; // Allows lowercase letters and spaces
            return lowercaseEnglishPattern.test(username);
        };

        const { name: usernameInput, value } = e.target;
        if (usernameInput === 'username') {
            const _usernameValue = value.trim();

            if (!validateUsername(_usernameValue)) {
                setUsernameError('Only lowercase a to z English letters.');
                setUserNameOK(false);
            } else if (_usernameValue.length < 3 || _usernameValue.length > 30) {
                setUsernameError('Username must be between 3 to 30 characters.');
                setUserNameOK(false);
            } else {
                setUsernameError('');
                setUserNameOK(true);
            }
            updateUsername(_usernameValue);
            setUserNameCheckOK(false);
            setIsUsernameError(false);
        }
    };

    const handleUsernameCheck = async () => {
        if (isChecking) return;
        setIsChecking(true);
        isUsernameAvailable(userProfile.username).then((res) => {
            if (!!res) {
                setUserNameCheckOK(true);
                nextStep();
            } else {
                console.debug(res);
            }
        }).catch(err => {
            setIsUsernameError(true);
            toast.error(err.message)
        }).finally(() => {
            setIsChecking(false);
        })
    };

    useEffect(() => { });

    return (
        <div className='flex flex-col gap-4 text-center'>
            <h2 className="mb-3 lg:text-4xl md:text-2xl">Choose your unique brand name</h2>
            <div className="flex-column items-center p-1 m-20">
                <Input
                    className={`
                     
                    ${userNameCheckOK && 'border-4 border-green-500 focus:outline-none focus:border-green-700'}
                    ${isUsernameError && 'border-4 border-red-500 focus:outline-none focus:red-green-700'}
                    
                    `}
                    type="text"
                    name="username"
                    value={userProfile.username ?? ''}
                    onChange={handleUserInfoChange}
                    placeholder="input username"
                    required
                    tabIndex={1}
                    autoFocus={true}
                />
                {usernameError &&
                    <p className="text-sm text-red-500">{usernameError}</p>
                }
            </div>

            <div className="flex justify-between gap-4 mt-9">
                <button
                    className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                    type="button"
                    onClick={prevStep}
                    tabIndex={4}
                >
                    {"<"}
                </button>

                {userNameOK && !userNameCheckOK ?
                    <button
                        onClick={handleUsernameCheck}
                        disabled={!userNameOK || isChecking}
                        className={`
                            btn-small rounded-full py-2 px-4 
                            ${userNameOK ? "bg-blue-500 text-white" : "bg-gray-400 text-gray-700"}
                            `}
                        tabIndex={2}
                    >
                        {isChecking ? 'Checking ...' :
                            'Check'
                        }
                    </button>
                    : userNameCheckOK ?
                        <button
                            disabled={!userNameCheckOK}
                            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center 
          bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] 
          text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                            type="button"
                            onClick={nextStep}
                            tabIndex={3}
                        >
                            {">"}
                        </button>
                        : <></>
                }
            </div>
        </div>
    );
};

export default S2Username;