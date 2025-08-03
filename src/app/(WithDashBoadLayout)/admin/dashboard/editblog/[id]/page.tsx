"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    // Redirect to create blog page with edit mode
    router.push(`/admin/dashboard/createblog?edit=true&id=${id}`);
  }, [id, router]);

  return null; // This component will redirect, so no UI needed
}
