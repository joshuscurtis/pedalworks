import Head from "next/head";
import styles from "../styles/Verse.module.css";
import useSWR from "swr";
import axios from "axios";
import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";

var data = {
  content:
    "If anyone acknowledges that Jesus is the Son of God, God lives in them and they in God.",
  ref: "1 John 4:15 (NIV)",
};

function Barcode() {
  const [sku, setSKU] = useState("YQBY7I61SB");
  const API_URL = "api/barcode?sku=" + sku;
  var { data, error } = useSWR(API_URL, fetcher);

  async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setSKU(e.target.value);
    }
  }

  if (error)
    return (
      <a className={styles.card}>
        <h3>Failed to load</h3>
        <input type="text" name="sku" onKeyDown={handleKeyDown} />
      </a>
    );
  if (!data)
    return (
      <a className={styles.card}>
        <h3>Loading...</h3>
        <input type="text" name="sku" onKeyDown={handleKeyDown} />
      </a>
    );

  return (
    <a className={styles.card}>
      <h3>Barcode Hunter &rarr;</h3>
      <input type="text" name="sku" onKeyDown={handleKeyDown} />
      <a className={styles.card}>
        <h3>Data</h3>
        <p>
          <strong>Name: </strong> {data.title}
        </p>
        <p>
          <strong>Barcode: </strong> {data.barcode}
        </p>
        <p>
          <strong>SKU: </strong> {data.sku}
        </p>
      </a>
    </a>
  );
}

function getVerse() {
  const API_URL = "api/bible";
  var { data, error } = useSWR(API_URL, fetcher);

  async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();

    return json;
  }
}

export default function Verse() {
  var loading = {
    content:
      "If anyone acknowledges that Jesus is the Son of God, God lives in them and they in God.",
    ref: "1 John 4:15 (NIV)",
  };
  const [updateData, setUpdateData] = useState(loading);
  const [verseArray, setVerseArray] = useState(loading.content.split(" "));
  const [verseArrayMix, setVerseArrayMix] = useState(shuffle(loading.content.split(" ")));
  const [input, setInput] = useState("");
  const [hide, setHide] = useState(true);
  const [mix, setMix] = useState(true);

  useEffect(() => {
    console.log("useEffect");
    async function fetchData() {
      const request2 = await axios.get("api/bible");
      setUpdateData(request2.data);
      setVerseArray(request2.data.content.split(" "));
      setVerseArrayMix(shuffle(request2.data.content.split(" ")))
      console.log(verseArray);
      console.log(updateData);
      return request2;
    }
    fetchData();
  }, []);
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


  if (updateData !== "loading")
    return (
      <div>
       <div className={styles.words}> {hide && verseArray.map((word) => <a className={styles.word}>{word + " "}</a>)}  </div>
        <div className={styles.words}> {mix && verseArrayMix.map((word) => <a className={styles.word}>{word + " "}</a>)} </div>

        <p></p>
        <textarea className={styles.textarea} onChange={(e) => setInput(e.target.value)}>
        </textarea>
        <p> {updateData.ref} </p>
        {updateData.content.toLowerCase() == input.toLowerCase() && <h1>You got it right!</h1>}
        <button onClick={(e) => setHide(!hide)}>
          {hide && "Hide"}
          {!hide && "Unhide"}
        </button>
        <button onClick={(e) => setMix(!mix)}>
          {mix && "Mix"}
          {!mix && "Unmix"}
        </button>
      </div>
    );

  if (updateData == "loading")
    return (<h1>Loading...</h1>);
}
