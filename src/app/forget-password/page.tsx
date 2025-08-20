"use client";
import React from "react";
import ForgetPasswordForm from "@/components/module/auth/forget-password/ForgetPasswordForm";
import Container from "@/components/ui/core/Container";
import Image from "next/image";

const ForgetPasswordPage = () => {
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
                  Forgot Password?
                </h1>
                <p className="text-emerald-100 text-lg mb-6">
                  Don't worry! It happens to the best of us. Enter your email
                  address and we'll send you a link to reset your password.
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
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm">Secure password reset process</span>
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
                  <p className="text-gray-600">
                    Enter your email to receive reset instructions
                  </p>
                </div>

                <ForgetPasswordForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ForgetPasswordPage;
