import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft, FaCheckCircle, FaStar, FaChartLine, FaHistory } from 'react-icons/fa'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
                setInterviews(result.data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        getMyInterviews()
    }, [])

    // Calculate Analytics Metrics
    const totalSessions = interviews.length
    const completedSessions = interviews.filter(i => i.status === 'completed')
    const completedCount = completedSessions.length
    
    const avgScore = completedCount
        ? (completedSessions.reduce((acc, curr) => acc + (curr.finalScore || 0), 0) / completedCount).toFixed(1)
        : "0.0"

    const maxScore = completedCount
        ? Math.max(...completedSessions.map(i => i.finalScore || 0))
        : 0

    // Format chart data (oldest first for progression)
    const chartData = [...completedSessions]
        .reverse()
        .map((item, index) => ({
            name: `Sess ${index + 1}`,
            Score: item.finalScore || 0,
            date: new Date(item.createdAt).toLocaleDateString()
        }))

    return (
        <div className='min-h-screen bg-[#f8fafc] flex flex-col'>
            <Navbar />

            <div className='flex-grow max-w-6xl w-full mx-auto px-6 py-12'>
                {/* BACK & HEADER */}
                <div className='flex items-center gap-4 mb-10'>
                    <button
                        onClick={() => navigate("/")}
                        className='p-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:bg-gray-50 transition cursor-pointer'
                    >
                        <FaArrowLeft className='text-gray-600' />
                    </button>
                    <div>
                        <h1 className='text-2xl md:text-3xl font-extrabold text-gray-900'>Performance Analytics & History</h1>
                        <p className='text-gray-500 text-sm mt-1'>Track mock interview results, key statistics, and skill progression.</p>
                    </div>
                </div>

                {loading ? (
                    <div className='bg-white border border-gray-200 rounded-3xl p-16 text-center shadow-sm min-h-[300px] flex items-center justify-center'>
                        <div className='animate-pulse text-gray-400 font-semibold'>Loading analytics data...</div>
                    </div>
                ) : totalSessions === 0 ? (
                    <div className='bg-white border border-gray-200 rounded-3xl p-16 text-center shadow-sm'>
                        <FaHistory className='text-gray-300 text-6xl mx-auto mb-4' />
                        <h3 className='text-xl font-bold text-gray-800 mb-2'>No Interviews Found</h3>
                        <p className='text-gray-500 max-w-sm mx-auto mb-6 text-sm leading-relaxed'>You haven't completed any AI mock interviews yet. Start your first session to begin tracking progress!</p>
                        <button
                            onClick={() => navigate("/")}
                            className='bg-black hover:bg-emerald-600 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all cursor-pointer'
                        >
                            Start Mock Interview
                        </button>
                    </div>
                ) : (
                    <div className='space-y-10'>
                        {/* WIDGET GRID */}
                        <div className='grid sm:grid-cols-3 gap-6'>
                            {/* sessions */}
                            <motion.div
                                whileHover={{ y: -4 }}
                                className='bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-5'
                            >
                                <span className='p-4 bg-blue-50 text-blue-600 rounded-xl text-xl'><FaCheckCircle /></span>
                                <div>
                                    <span className='text-[10px] uppercase font-bold tracking-wider text-gray-400'>Interviews Taken</span>
                                    <h3 className='text-2xl font-extrabold text-gray-900 mt-1'>{totalSessions}</h3>
                                </div>
                            </motion.div>

                            {/* average score */}
                            <motion.div
                                whileHover={{ y: -4 }}
                                className='bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-5'
                            >
                                <span className='p-4 bg-emerald-50 text-emerald-600 rounded-xl text-xl'><FaStar /></span>
                                <div>
                                    <span className='text-[10px] uppercase font-bold tracking-wider text-gray-400'>Average Score</span>
                                    <h3 className='text-2xl font-extrabold text-gray-900 mt-1'>{avgScore} / 10</h3>
                                </div>
                            </motion.div>

                            {/* max score */}
                            <motion.div
                                whileHover={{ y: -4 }}
                                className='bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center gap-5'
                            >
                                <span className='p-4 bg-yellow-50 text-yellow-600 rounded-xl text-xl'><FaChartLine /></span>
                                <div>
                                    <span className='text-[10px] uppercase font-bold tracking-wider text-gray-400'>Peak Score</span>
                                    <h3 className='text-2xl font-extrabold text-gray-900 mt-1'>{maxScore} / 10</h3>
                                </div>
                            </motion.div>
                        </div>

                        {/* LINE PROGRESSION CHART */}
                        {completedCount > 0 && (
                            <div className='bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm'>
                                <h3 className='font-bold text-gray-800 text-lg mb-6 flex items-center gap-2'>
                                    <span className='text-emerald-500'><FaChartLine /></span>
                                    AI Score Progression Path
                                </h3>
                                <div className='w-full h-72'>
                                    <ResponsiveContainer width='100%' height='100%'>
                                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#f1f5f9' />
                                            <XAxis dataKey='name' tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                            <YAxis domain={[0, 10]} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}
                                                labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                                            />
                                            <Area type='monotone' dataKey='Score' stroke='#10b981' strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}

                        {/* DETAILED INTERVIEW SESSIONS LIST */}
                        <div className='space-y-4'>
                            <h3 className='font-bold text-gray-800 text-lg flex items-center gap-2'>
                                <span className='text-emerald-500'><FaHistory /></span>
                                Complete Interview Records
                            </h3>

                            <div className='grid gap-4'>
                                {interviews.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        onClick={() => navigate(`/report/${item._id}`)}
                                        whileHover={{ x: 6, scale: 1.01 }}
                                        className='bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-200/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4'
                                    >
                                        <div>
                                            <div className='flex items-center gap-2.5'>
                                                <h4 className="text-md font-bold text-gray-900">{item.role}</h4>
                                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    item.status === 'completed'
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                                        : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-xs mt-1.5 font-medium">
                                                {item.experience} • {item.mode} Mode
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-2 font-semibold">
                                                {new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>

                                        <div className='flex items-center gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100'>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-emerald-600">
                                                    {item.finalScore || 0}<span className='text-xs font-normal text-gray-400'>/10</span>
                                                </p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Overall Score</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default InterviewHistory
