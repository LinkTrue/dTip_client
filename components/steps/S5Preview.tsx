import { useSteps } from '@/context/StepsContext';
import Preview from '@/components/Preview';
import { useContractMethods } from '@/hooks/useContractMethods';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useState } from 'react';
import { useLoggerService } from '../../hooks/useLogger';

const S5Preview = () => {
    const { prevStep } = useSteps();
    const { publish } = useContractMethods();
    const { logException } = useLoggerService();
    const { userProfile } = useGlobalState();
    const [isPublishing, setIsPublishing] = useState(false)

    const handlePublish = async () => {

        try {
            // Create keys and filter out empty strings
            const keys: string[] = [
                ...userProfile.web2Items.map(i => i.iconUrl).filter(item => item.length > 0),
                ...userProfile.web3Items.map(i => i.icon).filter(item => item.length > 0)
            ];

            // Create values and filter out empty strings
            const values: string[] = [
                ...userProfile.web2Items.map(i => i.fullURL).filter(item => item.length > 0),
                ...userProfile.web3Items.map(i => i.walletAddress).filter(item => item.length > 0)
            ];

            // Ensure both arrays have matching lengths
            if (keys.length !== values.length) {
                throw new Error('Mismatched keys and values');
            }

            setIsPublishing(true);
            publish(userProfile.username, keys, values).then(() => {
                window.location.href += `/${userProfile.username}`
            }).catch((err) => {
                logException(err);
            }).finally(() => {
                setIsPublishing(false)
            })
        } catch (error) {
            console.error('Publish failed', error);
        }
    };

    return (
        <div>
            <h1 className="font-bold mb-2 pt-8">Preview of your profile:</h1>
            <div className='p-4'>
                <Preview isPreview={true} />
            </div>
            <p className='text-left mt-10'>All good?</p>
            <br />
            <br />
            <p>
                PUBLISH now to make it <strong>permanently yours</strong>!
            </p>

            <div className='m-8'>
                <hr className='m-4 border-t-2 dark:border-gray-600' />
                <div className="flex justify-between gap-4 mt-9">
                    <button
                        className="rounded-full 
               border border-solid border-transparent 
               transition-colors 
               flex items-center justify-center 
               bg-gray-200 
               text-background gap-2 
               hover:bg-black 
               dark:hover:bg-[#ccc] 
               text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        type="button"
                        onClick={prevStep}
                    >
                        {"<"}
                    </button>

                    <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center 
          bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#10bdbd] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                        type="button"
                        disabled={isPublishing}
                        onClick={handlePublish}
                    >
                        {isPublishing ?
                            (<div className="spinner"></div>)
                            : "Mint now!"
                        }
                    </button>
                </div>
            </div>

        </div>
    );
};

export default S5Preview;
