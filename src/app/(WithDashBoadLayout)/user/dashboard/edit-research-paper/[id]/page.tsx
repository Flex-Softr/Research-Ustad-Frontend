"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function EditResearchPaperPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    router.push(`/user/dashboard/addresearchpaper?edit=true&id=${id}`);
  }, [id, router]);

  return null;
}
