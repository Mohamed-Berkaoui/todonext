"use client";

import { useAuth } from "./(context)/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard");
    // if (user) {
    //   router.push("/dashboard");
    // } else {
    //   router.push("/user/login");
    // }
  }, [user, router]);

  return null;
}