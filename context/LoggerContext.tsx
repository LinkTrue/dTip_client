//context/LoggerContext.tsx
"use client"
import React, { createContext, useContext } from 'react';
import { ILogger, useLoggerService } from '@/hooks/useLogger';

const LoggerContext = createContext<ILogger | null>(null);

export const LoggerProvider = ({ children }: { children: React.ReactNode }) => {
    const logger = useLoggerService();

    return (
        <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>
    );
};

export const useLogger = () => {
    const context = useContext(LoggerContext);
    if (!context) {
        throw new Error('useLogger must be used within LoggerProvider');
    }
    return context;
};
