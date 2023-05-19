import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Homepage from '@/component/homepage'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Fonehub</title>
        <meta name="mobile" content="Get best mobile phone" />
        <meta name="smart phone" content="smart phone get smart phone " />
        <meta name="fonehub" content="get mobile smart phone in fonehub" />
         <meta name="gattilo phone" content="ramro phone haru paune site" />
         <meta name="ramro phone " content="best phone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Homepage/>
      </div>
    </>
  )
}
