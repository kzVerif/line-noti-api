import React from "react";

export default function PurchasePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-lg bg-white ounded-lg shadow-lg p-8 text-center rounded-2xl">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 ">
          สั่งซื้อการใช้งาน API
        </h1>
        <p className="mb-6 text-gray-700 text-lg">
          หากต้องการสั่งซื้อการใช้งาน API กรุณาติดต่อและสั่งซื้อผ่าน Discord ของเรา
        </p>
        <a
          href="https://discord.gg/u8nGSBAP" // แก้เป็นลิงก์ Discord ของคุณ
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          ไปที่ Discord เพื่อสั่งซื้อ
        </a>
      </div>
    </div>
  );
}
