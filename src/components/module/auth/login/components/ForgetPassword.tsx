import Link from "next/link";
import React from "react";

const ForgetPassword = () => {
  return (
    <div className="mt-4 text-center">
      <Link
        href="/forget-password"
        className="text-sm text-brand-secondary underline hover:text-brand-primary hover:underline transition-colors duration-200 font-medium"
      >
        Forgot your password?
      </Link>
    </div>
  );
};

export default ForgetPassword;
