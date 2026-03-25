"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, ChevronRight, Linkedin, Twitter, Star, Users } from "lucide-react";
import { Mentor } from "@/src/types";
import { MOCK_MENTORS } from "@/src/mockData";

export default function Mentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setMentors(MOCK_MENTORS);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Learn from the <span className="text-blue-600">Best</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto mb-10"
          >
            Connect with industry leaders from top tech companies and accelerate your career growth.
          </motion.p>
          
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search by name, role, or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl pl-12 pr-4 py-4 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Mentors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-80 bg-white rounded-3xl animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map((mentor, i) => (
              <motion.div
                key={mentor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="relative">
                    <img 
                      src={mentor.avatar} 
                      alt={mentor.name} 
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-white shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-1.5 rounded-lg shadow-lg">
                      <Star size={14} fill="currentColor" />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a href={mentor.socials.linkedin} className="p-2 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-xl transition-colors">
                      <Linkedin size={18} />
                    </a>
                    <a href={mentor.socials.twitter} className="p-2 text-gray-400 hover:text-blue-400 bg-gray-50 rounded-xl transition-colors">
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{mentor.name}</h3>
                    <p className="text-blue-600 font-medium text-sm">{mentor.role}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map(skill => (
                      <span key={skill} className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold border border-gray-100">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 flex items-center justify-between border-t border-gray-50">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Users size={16} className="mr-1" />
                      <span>50+ Students</span>
                    </div>
                    <Link href={`/mentor/${mentor._id}`} className="text-gray-900 font-bold flex items-center text-sm group-hover:translate-x-1 transition-transform">
                      View Profile <ChevronRight size={16} className="ml-1 text-blue-600" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredMentors.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No mentors found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search query.</p>
          </div>
        )}
      </section>
    </div>
  );
}
