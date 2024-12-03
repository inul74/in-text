import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Click
      <Link href="/documents/123">
        <span className="underline text-blue-500 mx-1">here</span>
      </Link>
      to goto document id
    </div>
  );
};

export default Home;
