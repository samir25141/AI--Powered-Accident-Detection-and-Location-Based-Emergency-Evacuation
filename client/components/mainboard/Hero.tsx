"use client";

import React from "react";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {};

export default function Hero({}: Props) {
  return (
    <section className="relative mt-16 mb-12 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/video/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Centered Foreground content */}
      <MaxWidthContainer>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-3xl text-center bg-white/20 backdrop-blur-md backdrop-saturate-150 p-10 rounded-2xl border border-white/30 shadow-xl space-y-6 mt-[-50px]" // ← moved up
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-md text-balance">
            Enhanced AI for Guardian Location and Evacuation
          </h1>
          <p className="text-lg text-white/90 leading-relaxed text-balance">
            A CNN-based intelligent monitoring system that continuously analyzes CCTV footage for accident detection and promptly notifies the relevant authorities to ensure rapid emergency response and rescue operations.
          </p>
          <Link
            href={"#model-test"}
            className="inline-block rounded-full bg-blue-900 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg"
          >
            Test Your Video
          </Link>
        </motion.div>
      </MaxWidthContainer>
    </section>
  );
}
