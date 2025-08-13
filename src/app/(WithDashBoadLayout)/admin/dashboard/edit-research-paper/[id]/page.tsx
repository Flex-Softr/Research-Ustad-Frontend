"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function AdminEditResearchPaperPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    router.push(`/admin/dashboard/adminCreateResearchPaper?edit=true&id=${id}`);
  }, [id, router]);

  return null;
}
