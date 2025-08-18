"use client";
import React from "react";
import ResetPasswordForm from "@/components/module/auth/reset-password/ResetPasswordForm";
import Container from "@/components/ui/core/Container";

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center p-4">
      <Container maxWidth="full" padding="none">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Panel - Branding */}
            <div className="lg:w-1/2 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
              {/* Background Decorative Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-8 h-8 bg-white rounded-lg"></div>
                <div className="absolute top-20 right-16 w-6 h-6 bg-white rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-10 h-10 bg-white rounded-lg"></div>
                <div className="absolute bottom-10 right-10 w-4 h-4 bg-white rounded-full"></div>
              </div>

              {/* Logo and Brand */}
              <div className="relative z-10 flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-xl">RU</span>
                </div>
                <span className="text-white font-bold text-xl">
                  ResearchUstad
                </span>
              </div>

              {/* Welcome Content */}
              <div className="relative z-10 text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                  Set New Password
                </h1>
                <p className="text-emerald-100 text-lg mb-6">
                  Create a strong, secure password for your ResearchUstad
                  account. Make sure it's something you'll remember but others
                  can't guess.
                </p>
                <div className="flex items-center justify-center lg:justify-start space-x-2 text-emerald-100">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">Secure password requirements</span>
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Reset Password
                  </h2>
                  <p className="text-gray-600">Enter your new password below</p>
                </div>

                <ResetPasswordForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResetPasswordPage;
