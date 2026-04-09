"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  FaAward,
  FaDownload,
  FaLinkedin,
  FaArrowLeft,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { useAuth } from "@/src/context/AuthContext";

export default function CertificatePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const certificateData = {
    id: id as string,
    title: id === "uiux-design" ? "Professional UI/UX Design Mastery" : id === "react-mastery" ? "Advanced React & Next.js Mastery" : "SkillHat Professional Certificate",
    course: id === "uiux-design" ? "UI/UX Design Systems & Figma" : id === "react-mastery" ? "Advanced React & Next.js" : "Professional Course",
    issuedDate: "April 08, 2026",
    certificateId: `SKH-${(id as string).toUpperCase()}-2026-001`,
    description: "has successfully completed the comprehensive program with distinction and demonstrated exceptional skills in modern design & development practices.",
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 180, spread: 70, origin: { y: 0.6 } });
  };

  useEffect(() => {
    const img = new Image();
    img.src = "/logo1.png";
  }, []);

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    setDownloading(true);
    triggerConfetti();

    try {
      await new Promise((r) => setTimeout(r, 500));

      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png", 1.0);

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [297, 210],
      });

      pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save(`SkillHat-Certificate-${certificateData.certificateId}.pdf`);

      alert("✅ Certificate downloaded successfully!");
    } catch (error: any) {
      console.error("PDF Error:", error);
      alert("Still failed. Please send me the new console error.");
    } finally {
      setDownloading(false);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Please login to view certificate.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => router.push("/profile")} className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-900">
          <FaArrowLeft /> Back to Profile
        </button>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header - Safe Colors */}
          <div className="bg-[#1e40af] px-10 py-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaAward size={36} className="text-yellow-300" />
              <div>
                <h1 className="text-3xl font-bold">SkillHat</h1>
                <p className="text-blue-100 text-sm">Academy of Excellence</p>
              </div>
            </div>
            <div className="bg-white/20 px-5 py-2 rounded-3xl text-sm font-semibold flex items-center gap-2">
              <FaCheckCircle className="text-yellow-300" /> VERIFIED CERTIFICATE
            </div>
          </div>

          {/* Certificate Body - Using only safe colors (no lab/oklch) */}
          <div ref={certificateRef} className="p-14 bg-white relative" style={{ fontFamily: "system-ui, sans-serif" }}>
            <div className="absolute inset-0 border-[20px] border-blue-100 rounded-3xl" />
            <div className="absolute inset-[18px] border-2 border-dashed border-amber-300 rounded-3xl" />

            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img src="/logo1.png" alt="SkillHat" className="h-24 w-auto" />
            </div>

            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-8 py-3 rounded-3xl mb-8 text-sm font-semibold">
                <FaAward /> OFFICIAL CERTIFICATE OF COMPLETION
              </div>

              <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-8">{certificateData.title}</h2>

              <p className="text-2xl text-gray-600 mb-10">This is to certify that</p>

              <div className="mb-12">
                <h3 className="text-4xl font-semibold text-gray-900 tracking-tight">{user.full_name}</h3>
                <p className="text-lg text-gray-500 mt-3">{user.email}</p>
              </div>

              <p className="text-2xl text-gray-700 leading-relaxed mb-12">{certificateData.description}</p>

              <div className="grid grid-cols-3 gap-8 border-t border-b border-gray-200 py-10 text-left">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Course Completed</p>
                  <p className="font-semibold text-lg">{certificateData.course}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Issued On</p>
                  <p className="font-semibold text-lg">{certificateData.issuedDate}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Certificate ID</p>
                  <p className="font-mono font-semibold text-lg">{certificateData.certificateId}</p>
                </div>
              </div>

              <div className="mt-16 text-left">
                <p className="font-semibold text-2xl">Dr. Priya Sharma</p>
                <p className="text-gray-500">Director, SkillHat Academy</p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="px-10 py-6 bg-gray-50 border-t flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Certificate ID: <span className="font-mono font-semibold text-blue-700">{certificateData.certificateId}</span>
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleDownloadPDF}
                disabled={downloading}
                className="flex items-center gap-3 bg-[#1e40af] hover:bg-blue-800 disabled:bg-gray-400 text-white px-8 py-4 rounded-3xl font-semibold transition-all"
              >
                {downloading ? "Generating PDF..." : <><FaDownload /> Download PDF</>}
              </button>

              <button
                onClick={() => {
                  triggerConfetti();
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?text=${encodeURIComponent(`I just earned my ${certificateData.title} from SkillHat! 🎉`)}`, "_blank");
                }}
                className="flex items-center gap-3 border-2 border-[#0A66C2] text-[#0A66C2] px-8 py-4 rounded-3xl font-semibold hover:bg-[#0A66C2] hover:text-white transition"
              >
                <FaLinkedin size={22} /> Share on LinkedIn
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}