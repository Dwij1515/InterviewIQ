import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsShieldCheck
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';

function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()
  return (
    <div className='min-h-screen bg-[#f8fafc] bg-radial-[circle_at_top_right,_var(--tw-gradient-stops)] from-emerald-50/50 via-[#f8fafc] to-[#f8fafc] flex flex-col text-slate-800'>
      <Navbar />

      <div className='flex-1 px-6 py-20 relative overflow-hidden'>
        {/* Soft Background Blur Blobs */}
        <div className='absolute top-20 right-[-10%] w-96 h-96 bg-emerald-200/20 rounded-full filter blur-3xl' />
        <div className='absolute bottom-10 left-[-10%] w-96 h-96 bg-teal-100/20 rounded-full filter blur-3xl' />

        <div className='max-w-6xl mx-auto relative z-10'>

          {/* CHIP */}
          <div className='flex justify-center mb-8'>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white/80 backdrop-blur-md border border-emerald-100 text-emerald-700 text-xs md:text-sm px-5 py-2.5 rounded-full flex items-center gap-2.5 shadow-sm font-semibold'
            >
              <HiSparkles size={16} className="text-emerald-500 animate-pulse" />
              AI-Powered Suite for Smart Career Growth
            </motion.div>
          </div>

          {/* HERO */}
          <div className='text-center mb-32'>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-4xl md:text-7xl font-extrabold leading-tight tracking-tight max-w-4xl mx-auto text-slate-900'
            >
              Accelerate Your Career with <br className='hidden md:inline' />
              <span className='bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent px-1'>
                AI Intelligence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className='text-slate-500 mt-6 max-w-2xl mx-auto text-md md:text-xl leading-relaxed'
            >
              Practice high-fidelity mock interviews, optimize your resume keywords for ATS scanners, and monitor your score statistics using our interactive dashboard.
            </motion.p>

            <div className='flex flex-wrap justify-center gap-4 mt-12'>
              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/interview")
                }}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className='bg-black text-white px-10 py-4 rounded-full font-semibold hover:opacity-90 transition shadow-lg shadow-black/10 cursor-pointer'
              >
                Start AI Interview
              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/ats-analyzer")
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className='bg-white text-slate-800 border border-slate-200 px-10 py-4 rounded-full font-semibold hover:bg-slate-50 hover:border-slate-300 transition shadow-sm cursor-pointer'
              >
                Resume ATS Scan
              </motion.button>

              <motion.button
                onClick={() => {
                  if (!userData) {
                    setShowAuth(true)
                    return;
                  }
                  navigate("/history")
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className='bg-emerald-50/80 backdrop-blur-md text-emerald-800 border border-emerald-100 px-8 py-4 rounded-full font-semibold hover:bg-emerald-100 transition shadow-sm cursor-pointer'
              >
                Analytics Hub
              </motion.button>
            </div>
          </div>

          {/* THREE STEPS */}
          <div className='mb-36'>
            <div className='flex flex-col md:flex-row justify-center items-center gap-10'>
              {
                [
                  {
                    icon: <BsRobot size={24} />,
                    step: "STEP 1",
                    title: "ATS Resume Optimization",
                    desc: "Analyze your resume compatibility against target job descriptions instantly."
                  },
                  {
                    icon: <BsMic size={24} />,
                    step: "STEP 2",
                    title: "Voice-Controlled Mocking",
                    desc: "Conduct verbal interview simulators with realistic follow-up question loops."
                  },
                  {
                    icon: <BsClock size={24} />,
                    step: "STEP 3",
                    title: "Advanced Analytics Charts",
                    desc: "Assess performance scores, communication clarity, and correctness trends."
                  }
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 + index * 0.15 }}
                    whileHover={{ scale: 1.05 }}
                    className={`
                      relative bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 
                      hover:border-emerald-400 p-8 w-80 max-w-[95%] shadow-sm hover:shadow-xl 
                      transition-all duration-300
                    `}
                  >
                    <div className='absolute -top-7 left-8 bg-white border border-emerald-100 text-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md'>
                      {item.icon}
                    </div>
                    <div className='pt-8'>
                      <div className='text-[10px] text-emerald-600 font-bold mb-1.5 tracking-wider'>{item.step}</div>
                      <h3 className='font-bold mb-3 text-slate-800 text-lg leading-snug'>{item.title}</h3>
                      <p className='text-sm text-slate-500 leading-relaxed'>{item.desc}</p>
                    </div>
                  </motion.div>
                ))
              }
            </div>
          </div>

          {/* CAPABILITIES */}
          <div className='mb-32'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-3xl md:text-4xl font-extrabold text-center mb-16 text-slate-900'
            >
              Advanced AI <span className="text-emerald-600">Capabilities</span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-8'>
              {
                [
                  {
                    image: evalImg,
                    icon: <BsBarChart size={20} />,
                    title: "AI Answer Evaluation",
                    desc: "Provides in-depth grading across speaking speed, confidence tone, technical correctness, and articulation."
                  },
                  {
                    image: resumeImg,
                    icon: <BsFileEarmarkText size={20} />,
                    title: "ATS Compatibility Scan",
                    desc: "Checks resume text against Job Descriptions to return matches, deficiencies, and layout enhancement advice."
                  },
                  {
                    image: pdfImg,
                    icon: <BsShieldCheck size={20} />,
                    title: "Downloadable PDF Report",
                    desc: "Generates exportable candidate feedback booklets outlining detailed scores, answers, and improvement guides."
                  },
                  {
                    image: analyticsImg,
                    icon: <BsBarChart size={20} />,
                    title: "Interactive Analytics",
                    desc: "Aggregates overall score paths over multiple mock sessions onto customizable Recharts graphical boards."
                  }
                ].map((item, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className='bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all'
                  >
                    <div className='flex flex-col sm:flex-row items-center gap-8'>
                      <div className='w-full sm:w-1/2 flex justify-center'>
                        <img src={item.image} alt={item.title} className='w-full h-auto object-contain max-h-48' />
                      </div>

                      <div className='w-full sm:w-1/2'>
                        <div className='bg-emerald-50 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mb-5'>
                          {item.icon}
                        </div>
                        <h3 className='font-bold mb-2.5 text-lg text-slate-800'>{item.title}</h3>
                        <p className='text-slate-500 text-sm leading-relaxed'>{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              }
            </div>
          </div>

          {/* INTERVIEW MODES */}
          <div className='mb-24'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='text-3xl md:text-4xl font-extrabold text-center mb-16 text-slate-900'
            >
              Interactive Practice <span className="text-emerald-600">Modes</span>
            </motion.h2>

            <div className='grid md:grid-cols-2 gap-8'>
              {
                [
                  {
                    img: hrImg,
                    title: "HR Behavioral Mode",
                    desc: "Evaluates situational communication, behavioral skills, and team collaboration answers."
                  },
                  {
                    img: techImg,
                    title: "Technical Mock Mode",
                    desc: "Deep-dives into domain-specific coding logic, software patterns, and framework questions."
                  },
                  {
                    img: confidenceImg,
                    title: "Tone & Pace Analysis",
                    desc: "Examines vocal characteristics to provide advice on speech speed, volume, and fill-word occurrences."
                  },
                  {
                    img: creditImg,
                    title: "Session Credit System",
                    desc: "Manages premium AI tokens for fully customizable questions and dedicated resume uploads."
                  }
                ].map((mode, index) => (
                  <motion.div key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-white border border-gray-200/80 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className='flex items-center justify-between gap-6'>
                      <div className="w-1/2">
                        <h3 className="font-bold text-lg mb-2.5 text-slate-800">
                          {mode.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {mode.desc}
                        </p>
                      </div>

                      <div className="w-1/2 flex justify-end">
                        <img
                          src={mode.img}
                          alt={mode.title}
                          className="w-24 h-24 object-contain"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))
              }
            </div>
          </div>

        </div>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  )
}

export default Home
