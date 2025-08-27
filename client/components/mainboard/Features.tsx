"use client";

import React from "react";
import MaxWidthContainer from "../layouts/MaxWidthContainer";
import {
  Cctv,
  LocateFixed,
  FireExtinguisher,
  BellRing,
} from "lucide-react";
import { motion } from "framer-motion";

type Props = {};

const allFeatures = [
  {
    icon: Cctv,
    title: "Real-time Accident Detection",
    description:
      "Real-time accident detection using advanced deep learning (CNN) on CCTV camera video.",
  },
  {
    icon: LocateFixed,
    title: "Location Identification",
    description:
      "Integrated location services pinpoint accident locations, vital for swift emergency response.",
  },
  {
    icon: FireExtinguisher,
    title: "Emergency Alert Generation",
    description:
      "Post-accident detection, the system sends rapid emergency alerts to authorities with location information for prompt response.",
  },
  {
    icon: BellRing,
    title: "Integration with Communication Channels",
    description:
      "Integrated with SMS, the system sends video links notifying traffic authorities for coordinated accident response.",
  },
];

export default function Features({}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <MaxWidthContainer className="py-10">
        <h2
          className="text-center font-bold text-2xl sm:text-3xl md:text-4xl pb-8"
          style={{ color: "#1E3A8A" }}
        >
          Our Selected Features
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                className="group space-y-3 rounded-md border p-5 transition-all duration-200 ease-out"
                style={{
                  backgroundColor: "#F0EFEF",
                  borderColor: "#F0EFEF",
                  color: "#1E3A8A",
                }}
              >
                <div className="text-3xl text-center transform transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110">
                  <Icon className="w-12 h-12 mx-auto" />
                </div>

                <h2 className="text-xl font-bold text-center">{feature.title}</h2>
                <p className="text-center text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </MaxWidthContainer>
    </motion.section>
  );
}
