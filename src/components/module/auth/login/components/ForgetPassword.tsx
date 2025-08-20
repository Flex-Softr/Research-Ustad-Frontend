import Link from "next/link";
import React from "react";

const ForgetPassword = () => {
  return (
    <div className="mt-4 text-center">
      <Link
        href="/forget-password"
        className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors duration-200"
      >
        Forgot your password?
      </Link>
    </div>
  );
};

export default ForgetPassword;
