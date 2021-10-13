import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import axios from "axios";
import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import Verse from "../parts/verse";


export default function Home() {
              return(
                <div className={styles.main}>
                  <h1>Memory Verse of the Day</h1>
                  <div className={styles.card}>
                    <Verse></Verse>
                  </div>
              </div>

              );
}
