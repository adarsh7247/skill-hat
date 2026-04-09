"use client";

import { useState, useEffect } from "react";
import {
  Award,
  BookOpen,
  User as UserIcon,
  Linkedin,
  Download,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

import { useAuth } from "@/src/context/AuthContext";
import Link from "next/link";
import AuthGuard from "@/src/components/AuthGuard";
import CertificatesPage from "./certificates/page";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_APP_URL;

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [enrollments, setEnrollments] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchEnrollments = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const res = await fetch(`${API}/api/users/my-enrollments/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setEnrollments(data.enrollments);
        }
      } catch (err) {
        console.error("Failed to fetch enrollments", err);
      }
    };

    fetchEnrollments();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [user]);

  const handleShareLinkedIn = (courseTitle: string) => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });

    const text = encodeURIComponent(
      `I'm thrilled to share that I've successfully completed the ${courseTitle} at SkillHatv! #SkillHat #Certification #Learning`,
    );
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?text=${text}`,
      "_blank",
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">
            Please login to view your profile
          </h2>
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Profile Header */}
        <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600">
            <UserIcon size={64} />
          </div>
          <div className="flex-1 text-center md:text-left space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {user.full_name}
            </h1>
            <p className="text-gray-500 font-medium">{user.email}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 border border-gray-100">
                <BookOpen size={18} className="text-blue-600" />
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 border border-gray-100">
                <Award size={18} className="text-purple-600" />
                <span>1 Certificate</span>
              </div>
            </div>
          </div>
          <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 transition-all">
            <Link href="/profile/edit">Edit Profile</Link>
          </button>
        </section>

        {/* Enrolled Courses */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Enrolled Internships
            </h2>
            <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
              In Progress
            </span>
          </div>
          <div className="mt-10">
            {enrollments.length === 0 ? (
              <p>No enrollments yet</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrollments.map((item) => (
                  <div key={item._id} className="border p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">{item.company}</p>
                    <p className="text-sm">{item.duration}</p>
                    <button
                      onClick={() => router.push(`/internship/${item._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-48 bg-gray-100 rounded-3xl animate-pulse" />
              <div className="h-48 bg-gray-100 rounded-3xl animate-pulse" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8"></div>
          )}
        </section>

        {/* Certificates */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-gray-900">Certifications</h2>
          <CertificatesPage />
        </section>
      </div>
    </AuthGuard>
  );
}
