'use client'

import React, {createContext, useMemo, useState, useContext, useEffect} from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import cache from "@/app/services/cache";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

const getInitialMode = () => {
    const savedMode = cache.get('theme');
    return savedMode ? JSON.parse(savedMode) : 'light';
};

const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                const newMode = mode === 'dark' ? 'light' : 'dark';
                setMode(newMode);
                cache.set('theme', JSON.stringify(newMode));
            },
        }),
        [mode],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#03615E',
                        dark: '#8bb14b',
                    },
                    secondary: {
                        main: '#0D99FF',
                        dark: '#156a64',
                    },
                    tertiary: {
                        main: '#A1DA97',
                        dark: '#0c6070',
                    },
                },
            }),
        [mode],
    );

    useEffect(() => {
        const savedMode = cache.get('theme');
        if (savedMode) {
            setMode(JSON.parse(savedMode));
        }
    }, []);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ColorModeProvider;
