import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { FaFilePdf, FaUpload, FaCheckCircle, FaExclamationCircle, FaLightbulb, FaExchangeAlt } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ServerUrl } from '../App'
import { useSelector } from 'react-redux'
import AuthModel from '../components/AuthModel'

function ATSAnalyzer() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false)
  const [resumeFile, setResumeFile] = useState(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setResumeFile(e.dataTransfer.files[0])
    }
  }

  const handleScan = async () => {
    if (!userData) {
      setShowAuth(true)
      return
    }
    if (!resumeFile || !jobDescription.trim()) return

    setIsScanning(true)
    setResult(null)

    const formData = new FormData()
    formData.append("resume", resumeFile)
    formData.append("jobDescription", jobDescription)

    try {
      const response = await axios.post(ServerUrl + "/api/interview/analyze-ats", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      })
      setResult(response.data)
    } catch (error) {
      console.error(error)
      alert("ATS Scan failed: " + (error.response?.data?.message || error.message))
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <div className='min-h-screen bg-[#f8fafc] flex flex-col'>
      <Navbar />

      <div className='flex-1 max-w-6xl w-full mx-auto px-6 py-12'>
        {/* HEADER */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm px-4 py-2 rounded-full mb-4 font-medium'>
            <HiSparkles size={16} />
            Smart ATS Scanner & Optimizer
          </div>
          <h1 className='text-3xl md:text-5xl font-bold text-gray-900 leading-tight'>
            Optimize Your Resume for <span className='text-emerald-600'>ATS Systems</span>
          </h1>
          <p className='text-gray-500 mt-3 max-w-2xl mx-auto text-md md:text-lg'>
            Upload your resume, paste the target Job Description, and let our AI check your keyword matching and calculate your compatibility score.
          </p>
        </div>

        {/* INPUT LAYOUT */}
        <div className='grid lg:grid-cols-2 gap-8 items-start mb-12'>
          {/* LEFT: RESUME UPLOADER */}
          <div className='bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col h-[420px]'>
            <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
              <span className='p-2 bg-emerald-50 text-emerald-600 rounded-lg'><FaFilePdf /></span>
              Upload Resume (PDF)
            </h2>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-2xl transition-all ${
                dragOver ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-300 hover:border-emerald-400 bg-gray-50/30'
              }`}
            >
              {resumeFile ? (
                <div className='text-center p-6'>
                  <FaFilePdf className='text-red-500 text-5xl mx-auto mb-4' />
                  <p className='text-gray-800 font-semibold max-w-xs truncate mx-auto'>{resumeFile.name}</p>
                  <p className='text-xs text-gray-400 mt-1'>{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <button
                    onClick={() => setResumeFile(null)}
                    className='mt-4 text-xs font-semibold text-red-500 hover:text-red-700 transition'
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <label className='flex flex-col items-center justify-center cursor-pointer p-8 text-center h-full w-full'>
                  <FaUpload className='text-gray-400 text-4xl mb-4 hover:scale-110 transition duration-300' />
                  <p className='text-gray-700 font-semibold text-sm'>Drag & Drop your resume here</p>
                  <p className='text-xs text-gray-400 mt-1'>or click to browse files (PDF only)</p>
                  <input
                    type='file'
                    accept='.pdf'
                    onChange={handleFileChange}
                    className='hidden'
                  />
                </label>
              )}
            </div>
          </div>

          {/* RIGHT: JOB DESCRIPTION */}
          <div className='bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col h-[420px]'>
            <h2 className='text-xl font-bold text-gray-800 mb-4 flex items-center gap-2'>
              <span className='p-2 bg-emerald-50 text-emerald-600 rounded-lg'><FaExchangeAlt /></span>
              Target Job Description
            </h2>
            <textarea
              placeholder='Paste the job description or requirements here...'
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className='flex-1 w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white resize-none transition-all'
            />
          </div>
        </div>

        {/* SCAN BUTTON */}
        <div className='flex justify-center mb-12'>
          <motion.button
            onClick={handleScan}
            disabled={!resumeFile || !jobDescription.trim() || isScanning}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`px-12 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
              resumeFile && jobDescription.trim() && !isScanning
                ? 'bg-black hover:bg-emerald-600 cursor-pointer'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {isScanning ? 'Scanning Resume...' : 'Analyze ATS Score'}
          </motion.button>
        </div>

        {/* SCANNING RADAR EFFECT */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-lg relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]'
            >
              {/* Animated scanning bar */}
              <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-bounce' />
              <div className='relative w-24 h-24 rounded-full border-4 border-emerald-100 flex items-center justify-center mb-6 overflow-hidden'>
                <div className='absolute inset-0 bg-emerald-500/10 animate-ping rounded-full' />
                <HiSparkles className='text-emerald-500 text-3xl animate-pulse' />
              </div>
              <h3 className='text-lg font-bold text-gray-800 animate-pulse'>Comparing Resume with Job Description</h3>
              <p className='text-gray-400 text-sm mt-2 max-w-sm'>Evaluating keyword overlap, analyzing skill match compatibility, and calculating target metrics...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* RESULTS PANEL */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-md mb-12'
            >
              {/* TOP SUMMARY ROW */}
              <div className='flex flex-col md:flex-row items-center gap-10 border-b border-gray-100 pb-10 mb-10'>
                {/* MATCH RING */}
                <div className='relative w-36 h-36 flex items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-inner flex-shrink-0'>
                  <div className='text-center'>
                    <span className='text-4xl font-extrabold'>{result.atsScore}%</span>
                    <p className='text-[10px] uppercase font-bold tracking-wider text-emerald-700/70 mt-0.5'>ATS Score</p>
                  </div>
                </div>

                <div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-2'>Scan Compatibility Summary</h3>
                  <p className='text-gray-600 text-sm md:text-base leading-relaxed'>{result.matchExplanation}</p>
                </div>
              </div>

              {/* DETAILS GRID */}
              <div className='grid md:grid-cols-2 gap-10'>
                {/* KEYWORDS */}
                <div className='space-y-6'>
                  <div>
                    <h4 className='font-bold text-gray-800 text-lg flex items-center gap-2 mb-3'>
                      <FaCheckCircle className='text-emerald-500' />
                      Matched Keywords ({result.matchedKeywords?.length || 0})
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {result.matchedKeywords?.map((kw, i) => (
                        <span key={i} className='bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs font-semibold'>
                          {kw}
                        </span>
                      ))}
                      {(!result.matchedKeywords || result.matchedKeywords.length === 0) && (
                        <p className='text-gray-400 text-sm'>No matching keywords detected.</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className='font-bold text-gray-800 text-lg flex items-center gap-2 mb-3'>
                      <FaExclamationCircle className='text-amber-500' />
                      Missing Keywords ({result.missingKeywords?.length || 0})
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {result.missingKeywords?.map((kw, i) => (
                        <span key={i} className='bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1 rounded-full text-xs font-semibold'>
                          {kw}
                        </span>
                      ))}
                      {(!result.missingKeywords || result.missingKeywords.length === 0) && (
                        <p className='text-gray-400 text-sm'>Excellent! No critical keywords are missing.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* RECOMMENDATIONS */}
                <div className='bg-gray-50 border border-gray-100 rounded-2xl p-6'>
                  <h4 className='font-bold text-gray-800 text-lg flex items-center gap-2 mb-4'>
                    <FaLightbulb className='text-yellow-500' />
                    AI Resume Optimizations
                  </h4>
                  <ul className='space-y-3.5'>
                    {result.resumeOptimizations?.map((tip, i) => (
                      <li key={i} className='text-gray-700 text-sm flex items-start gap-3 leading-relaxed'>
                        <span className='w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5'>
                          {i + 1}
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  )
}

export default ATSAnalyzer;
