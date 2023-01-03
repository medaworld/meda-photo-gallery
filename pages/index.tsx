import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';

import MyLogo from '/public/favicon.svg';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>MEDA.photo</title>
        <meta name="description" content="Welcome to MEDA.world" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={MyLogo.src} />
      </Head>
      <main className={styles.main}>
        <h1>Hello World</h1>
      </main>
    </>
  );
}