// hooks/useLogger.ts
import { useCallback } from 'react';

export interface ILogger {
    log: (message: string) => void;
    logException: (exception: any) => void;
    error: (message: string) => void;
    info: (message: string) => void;
}

export const useLoggerService = (): ILogger => {
    const log = useCallback((message: string) => {
        console.log(`Log: ${message}`);
    }, []);

    const error = useCallback((message: string) => {
        console.error(`Error: ${message}`);
    }, []);

    const info = useCallback((message: string) => {
        console.info(`Info: ${message}`);
    }, []);

    const logException = useCallback((exception: any) => {
        console.error(exception);
    }, []);

    return {
        log,
        logException,
        error,
        info,
    };
};
