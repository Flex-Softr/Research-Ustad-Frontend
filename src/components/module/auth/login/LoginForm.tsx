"use client";
import { useState } from "react";
import Container from "@/components/ui/core/Container";
import { LeftPanel, RightPanel } from "./components";

export default function LoginForm() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center p-4">
      <Container maxWidth="full" padding="none">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row min-h-[650px]">
            <LeftPanel />
            <RightPanel />
          </div>
        </div>
      </Container>
    </div>
  );
}
