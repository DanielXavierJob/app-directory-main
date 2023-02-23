'use client'
import ThemeButton from '#/components/theme/themeConsumer';
import '#/styles/globals.css';
import { GlobalNav } from '#/ui/GlobalNav';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import ResponsiveAppBar from '#/components/navbar';
import PersistentDrawerLeft from '#/components/navbar/drawer';
import Windows from '#/components/tabs/windows';

export const ColorModeContext = React.createContext({ toggleColorMode: () => { }, color: 'light' });

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = React.useState<any>('light');
  React.useEffect(() => {
    if (localStorage.getItem('theme')) {
      setMode(localStorage.getItem('theme'))
    }
  }, [])
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: any) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      color: mode
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );


  return (
    <html lang="pt-br" className={theme.palette.mode}>
      <head />
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body className="overflow-y-scroll dark:bg-gray-1100 bg-[url('/25101.jpg')] dark:bg-[url('/grid.svg')]">
            <PersistentDrawerLeft>
              <Windows>
                    <div className="rounded-lg bg-white dark:bg-black p-3.5 lg:p-6">{children}</div>
              </Windows>

              {/* <div className="lg:pl-100">
                <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:py-8 lg:px-8">
                  <div className="rounded-lg dark:bg-vc-border-gradient p-px shadow-lg shadow-black/20">
                  </div>

                  <div className="rounded-lg dark:bg-vc-border-gradient p-px shadow-lg shadow-black/20">
                    <div className="rounded-lg bg-white dark:bg-black">
                      <Byline />
                    </div>
                  </div>
                </div>
              </div> */}
            </PersistentDrawerLeft>
          </body>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </html>
  );
}

function Byline() {
  return (
    <div className="flex items-center justify-between gap-x-4 p-3.5 lg:px-5 lg:py-3">
      <div className="flex items-center gap-x-1.5">
        <div className="text-sm text-gray-400">By</div>
        <a href="https://github.com/DanielXavierJob" title="Github Profile DanielXavierJob">
          <div className="w-100 text-gray-400 dark:text-gray-100 hover:text-gray-800 dark:hover:text-gray-50">
            Daniel Xavier
          </div>
        </a>
      </div>

      <div className="text-sm text-gray-400">
        <a
          href="https://github.com/vercel/app-playground"
          target="_blank" rel="noreferrer"
        >
          1.0.0
        </a>
      </div>
    </div>
  );
}

export default RootLayout