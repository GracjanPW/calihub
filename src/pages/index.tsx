import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/index.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Head from "next/head";
import InstagramIcon from "@/components/icons/InstagramIcon";

export default function Home() {
  return (
    <>
      <Head>
        <title>Calihub - Everything Calisthenics </title>
        <meta
          name="description"
          content="Looking to take up calisthenics training or you are a beginner looking to improve? 
                  At Calihub you will find everything you need to start your journey and progress through the skill tree. 
                  We offer resources ranging from calsithenics related blogs, tutorials, workout plans and many more to come."
        />
      </Head>
      <main className="w-full">
        <Navbar />
        <section className={styles.background + " relative"}>
          <div className="h-full w-full bg-black bg-opacity-70">
            <div className="-translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute text-white w-fit rounded-r-md font-bold text-nowrap text-center font-sans transition">
              <h1 className="text-red-600 italic text-5xl">Calisthenics</h1>
              <h2 className="italic text-4xl">In One Place</h2>

              <br />
              <ul className="text-md italic border-2 border-red-700 p-2 rounded-md space-y-2 bg-black bg-opacity-20">
                <li>Blogs</li>

                <li>Tutorials</li>

                <li>Workout plans</li>
              </ul>
            </div>
          </div>
          <div className="absolute bottom-0 bg-red-800 h-10 text-center flex flex-col justify-center text-xxl font-bold text-white w-full">
            <p>
              Follow Us On <a href="#">Instagram</a>
            </p>
          </div>
        </section>

        <section className=" text-white">
          <div className="w-full p-8 text-center">
            <h1 className="text-3xl font-bold bg-red-800 py-3 rounded-t-md my-2">
              About
            </h1>
            <div className="border-red-800 border-2 rounded-b-md p-6 text-2xl font-medium">
              <p>
                Looking to take up calisthenics training or you are a beginner
                looking to improve? At Calihub you will find everything you need
                to start your journey and progress through the skill tree. We
                offer resources ranging from calsithenics related blogs,
                tutorials, workout plans and many more to come.
              </p>
            </div>
            <br />

            <h1 className="text-3xl font-bold bg-red-800 py-3 rounded-md my-2">
              The Team
            </h1>
            <div className="border-red-800 border-2 rounded-sm p-4 text-lg">
              <div className="background"></div>
            </div>
            <h1 className="text-3xl font-bold bg-red-800 py-3 rounded-md my-2">
              Socials and Contact
            </h1>
            <div className="border-red-800 border-2 rounded-sm p-4 text-lg">
              <InstagramIcon/>

            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
