"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { 
  Linkedin, 
  Twitter, 
  Star, 
  Users, 
  Award, 
  BookOpen, 
  ChevronRight, 
  Mail, 
  MessageSquare, 
  Calendar, 
  ArrowLeft 
} from "lucide-react";
import { Mentor, Course } from "@/src/types";
import { MOCK_MENTORS, MOCK_COURSES } from "@/src/mockData";

export default function MentorProfile() {
  const { id } = useParams();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundMentor = MOCK_MENTORS.find(m => m._id === id);
      if (foundMentor) {
        setMentor(foundMentor);
        setCourses(MOCK_COURSES.filter(c => c.mentors.some(m => m._id === id)));
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!mentor) return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Mentor not found</div>;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-100 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/mentors" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 mb-10 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Mentors
          </Link>
          
          <div className="flex flex-col md:flex-row items-start gap-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <img 
                src={mentor.avatar} 
                alt={mentor.name} 
                className="w-48 h-48 rounded-[40px] object-cover border-4 border-white shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-3 rounded-2xl shadow-xl">
                <Award size={24} />
              </div>
            </motion.div>
            
            <div className="flex-1 space-y-6">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-2"
                >
                  {mentor.name}
                </motion.h1>
                <p className="text-xl text-blue-600 font-semibold">{mentor.role}</p>
              </div>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Star size={20} className="text-amber-400 fill-current" />
                  <span className="font-bold">4.9</span>
                  <span className="text-sm">(120+ reviews)</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users size={20} className="text-blue-600" />
                  <span className="font-bold">500+</span>
                  <span className="text-sm">Students taught</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <BookOpen size={20} className="text-purple-600" />
                  <span className="font-bold">{courses.length}</span>
                  <span className="text-sm">Active Courses</span>
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button className="bg-[#2563EB] text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center">
                  <MessageSquare size={18} className="mr-2" /> Book a Session
                </button>
                <div className="flex space-x-2">
                  <a href={mentor.socials.linkedin} className="p-3 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-2xl border border-gray-100 transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href={mentor.socials.twitter} className="p-3 text-gray-400 hover:text-blue-400 bg-gray-50 rounded-2xl border border-gray-100 transition-colors">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Bio & Expertise */}
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Mentor</h2>
              <p className="text-gray-500 text-lg leading-relaxed whitespace-pre-line">
                {mentor.bio || "No bio available."}
              </p>
              
              <div className="mt-10">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Core Expertise</h3>
                <div className="flex flex-wrap gap-3">
                  {mentor.expertise.map(skill => (
                    <span key={skill} className="bg-blue-50 text-blue-700 px-5 py-2 rounded-2xl text-sm font-bold border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Courses by {mentor.name.split(" ")[0]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {courses.map(course => (
                  <motion.div 
                    key={course._id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
                  >
                    <Link href={`/course/${course._id}`}>
                      <div className="aspect-video relative overflow-hidden">
                        <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 uppercase">
                          {course.category}
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">{course.title}</h3>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                          <span className="text-xl font-bold text-gray-900">${course.price}</span>
                          <span className="text-blue-600 font-bold flex items-center text-sm">
                            Learn More <ChevronRight size={16} className="ml-1" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            <div className="bg-[#111827] rounded-[40px] p-10 text-white space-y-8">
              <h3 className="text-xl font-bold">Quick Contact</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Email Address</p>
                    <p className="text-sm font-bold">alex.r@nexusacademy.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Availability</p>
                    <p className="text-sm font-bold">Mon - Fri, 9 AM - 5 PM</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-white text-gray-900 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all">
                Send a Message
              </button>
            </div>

            <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Mentor Stats</h3>
              <div className="space-y-4">
                {[
                  { label: "Course Completion", value: "98%" },
                  { label: "Student Satisfaction", value: "4.9/5" },
                  { label: "Response Time", value: "< 2 hours" },
                ].map(stat => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-medium">{stat.label}</span>
                    <span className="text-sm font-bold text-gray-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
