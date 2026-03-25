"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Clock, 
  Star, 
  ChevronRight, 
  Users, 
  CheckCircle2, 
  PlayCircle, 
  ShieldCheck, 
  Award, 
  ArrowLeft,
  Loader2,
  AlertCircle,
  BookOpen
} from "lucide-react";
import { Course } from "@/src/types";
import { MOCK_COURSES } from "@/src/mockData";
import { useAuth } from "@/src/context/AuthContext";

export default function CourseDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  const handleEnroll = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    
    setEnrollStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setEnrollStatus('success');
      setTimeout(() => {
        setIsEnrolling(false);
        setEnrollStatus('idle');
        router.push("/profile");
      }, 2000);
    }, 1000);
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundCourse = MOCK_COURSES.find(c => c._id === id);
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        setCourse(null);
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!course) return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 mb-10 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Courses
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
                <ShieldCheck size={18} />
                <span>Verified Professional Course</span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
              >
                {course.title}
              </motion.h1>
              
              <p className="text-xl text-gray-500 leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock size={20} className="text-blue-600" />
                  <span className="font-bold">{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Star size={20} className="text-amber-400 fill-current" />
                  <span className="font-bold">4.9</span>
                  <span className="text-sm">(2.5k+ reviews)</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users size={20} className="text-purple-600" />
                  <span className="font-bold">10k+</span>
                  <span className="text-sm">Enrolled</span>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <Link href={`/mentor/${course.mentors[0]._id}`}>
                  <img src={course.mentors[0].avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-md" referrerPolicy="no-referrer" />
                </Link>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Instructor</p>
                  <Link href={`/mentor/${course.mentors[0]._id}`} className="font-bold text-gray-900 hover:text-blue-600 transition-colors">{course.mentors[0].name}</Link>
                </div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-[40px] overflow-hidden shadow-2xl border-8 border-white group"
            >
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 shadow-xl cursor-pointer hover:scale-110 transition-transform">
                  <PlayCircle size={40} fill="currentColor" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Curriculum */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <BookOpen className="mr-3 text-blue-600" /> Course Curriculum
              </h2>
              <div className="space-y-4">
                {course.curriculum.map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-200 transition-colors group">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span className="font-bold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Build production-ready applications from scratch",
                  "Master industry-standard tools and frameworks",
                  "Implement complex architectural patterns",
                  "Advanced performance optimization techniques",
                  "Secure and scalable deployment strategies",
                  "Real-world project development experience"
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Pricing & Enrollment */}
          <div className="space-y-8">
            <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-xl shadow-gray-200/50 sticky top-24">
              <div className="space-y-6">
                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl font-bold text-gray-900">${course.price}</span>
                  <span className="text-gray-400 line-through text-lg">$899</span>
                </div>
                
                <div className="space-y-4">
                  <button 
                    onClick={() => setIsEnrolling(true)}
                    className="w-full bg-[#2563EB] text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                  >
                    Enroll Now
                  </button>
                  <button className="w-full bg-gray-50 text-gray-900 py-5 rounded-2xl font-bold hover:bg-gray-100 transition-all border border-gray-100">
                    Add to Wishlist
                  </button>
                </div>

                <div className="pt-6 border-t border-gray-50 space-y-4">
                  <p className="text-sm font-bold text-gray-900">This course includes:</p>
                  <ul className="space-y-3">
                    {[
                      { icon: PlayCircle, text: "45 hours on-demand video" },
                      { icon: Users, text: "Access to private Discord" },
                      { icon: Award, text: "Certificate of completion" },
                      { icon: ShieldCheck, text: "Lifetime access" },
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-500 font-medium">
                        <item.icon size={18} className="mr-3 text-blue-600" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      <AnimatePresence>
        {isEnrolling && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => enrollStatus === 'idle' && setIsEnrolling(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[40px] w-full max-w-lg p-10 shadow-2xl overflow-hidden"
            >
              {enrollStatus === 'idle' && (
                <div className="space-y-8">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 mx-auto">
                      <GraduationCap size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Ready to start?</h2>
                    <p className="text-gray-500">You're about to enroll in <span className="font-bold text-gray-900">{course.title}</span>. This will give you immediate access to all course materials.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Course Price</span>
                      <span className="font-bold text-gray-900">${course.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Platform Fee</span>
                      <span className="font-bold text-green-600">FREE</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${course.price}</span>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setIsEnrolling(false)}
                      className="flex-1 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleEnroll}
                      className="flex-1 bg-[#2563EB] text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                    >
                      Confirm & Pay
                    </button>
                  </div>
                </div>
              )}

              {enrollStatus === 'loading' && (
                <div className="py-20 text-center space-y-6">
                  <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
                  <h3 className="text-2xl font-bold text-gray-900">Processing Enrollment...</h3>
                  <p className="text-gray-500">Please wait while we set up your learning dashboard.</p>
                </div>
              )}

              {enrollStatus === 'success' && (
                <div className="py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Welcome Aboard!</h3>
                  <p className="text-gray-500">Your enrollment was successful. Redirecting you to your profile...</p>
                </div>
              )}

              {enrollStatus === 'error' && (
                <div className="py-20 text-center space-y-6">
                  <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Enrollment Failed</h3>
                  <p className="text-gray-500">{errorMessage}</p>
                  <button 
                    onClick={() => setEnrollStatus('idle')}
                    className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GraduationCap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}
