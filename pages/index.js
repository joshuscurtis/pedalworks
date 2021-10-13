import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr';
import axios from 'axios';
import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react'

var resp = {"content": "If anyone acknowledges that Jesus is the Son of God, God lives in them and they in God.", "ref": "1 John 4:15 (NIV)"}


function Barcode() {
  const [sku, setSKU] = useState("YQBY7I61SB")
  const API_URL = 'api/barcode?sku=' + sku;
  var { data, error } = useSWR(API_URL, fetcher);

  async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
  




  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setSKU(e.target.value);
    }
  }

  if (error) return <a className={styles.card}><h3>Failed to load</h3><input type="text" name="sku" onKeyDown={handleKeyDown}/></a>;
  if (!data) return <a className={styles.card}><h3>Loading...</h3><input type="text" name="sku" onKeyDown={handleKeyDown}/></a>;
  
  return (
    <a className={styles.card}>
        <h3>Barcode Hunter &rarr;</h3>
        <input type="text" name="sku" onKeyDown={handleKeyDown} />
        <a className={styles.card}>
          <h3>Data</h3>
          <p><strong>Name: </strong> {data.title}</p>
          <p><strong>Barcode: </strong> {data.barcode}</p>
          <p><strong>SKU: </strong> {data.sku}</p>
        </a>
    </a>
  )
}

function getVerse() {
  const API_URL = 'api/bible';
  var { data, error } = useSWR(API_URL, fetcher);

  async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }
}

export default function Home() {

  const [updateData, setUpdateData] = useState("loading");

  useEffect(() => {
    console.log("useEffect");
    async function fetchData() {
      const request2 = await axios.get('api/bible');
      setUpdateData(request2);
      console.log("updateData");
      console.log(updateData);
      return request2;
    }
    fetchData();
  }, [updateData]);


  if (updateData !== 'loading') (
    <div>
      <h1 className={styles.title}> {updateData.content}  </h1>
      <h2 className={styles.title}> {updateData.ref}  </h2>
    </div>
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <Barcode/>

      

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
