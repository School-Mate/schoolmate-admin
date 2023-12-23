"use client";

import Loader from "@/components/common/Loader";
import { swrFetcher } from "@/lib/fetcher";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import useSWR from "swr";
export default function Home() {
  const { data, isLoading, error } = useSWR("/admin/me", swrFetcher);
  if (isLoading) return <Loader />;
  if (error) return redirect("/auth/signin");
  if (data) return redirect("/dashboard");
  return <></>;
}
