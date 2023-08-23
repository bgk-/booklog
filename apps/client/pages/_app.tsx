import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import './styles.css';
import { useState } from 'react';
import { ModalsProvider } from '@mantine/modals';
import { BookModal } from '@booklog/client/components/server';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>Booklog</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            primaryColor: 'cyan',
            primaryShade: 6,
            colors: {
              dark: [
                '#d5d7e0',
                '#acaebf',
                '#8c8fa3',
                '#666980',
                '#4d4f66',
                '#34354a',
                '#2b2c3d',
                '#2b2c3d',
                '#2b2c3d',
                '#2b2c3d',
              ],
            },
          }}
        >
          <ModalsProvider modals={{ createOrUpdate: BookModal }}>
            <Component {...pageProps} />
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
