import React from "react";
import PageCover from "./PageCover";
import Content from "./Content";

export default function ShopList() {
  return (
    <main className="pt-[100px]">
      <PageCover />
      <div className="mb-[120px] sm:mb-[180px] lg:mb-[270px]">
        <Content />
      </div>
    </main>
  );
}
