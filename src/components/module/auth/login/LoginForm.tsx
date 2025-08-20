"use client";
import { useState } from "react";
import Container from "@/components/ui/core/Container";
import { LeftPanel, RightPanel } from "./components";

export default function LoginForm() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Container maxWidth="full" padding="none">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto border border-gray-100">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            <LeftPanel />
            <RightPanel />
          </div>
        </div>
      </Container>
    </div>
  );
}
