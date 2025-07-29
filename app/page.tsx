"use client";
import React, { useState } from "react";
import {
  Shield,
  Zap,
  Code,
  Bell,
  ShoppingCart,
  Users,
  Check,
  Lock,
  Globe,
  FileText,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

export default function LineBankAPILanding() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "ปลอดภัย 100%",
      description:
        "ระบบดึงเฉพาะข้อความแจ้งเตือนจาก LINE เท่านั้น ไม่เข้าถึงบัญชีธนาคารหรือข้อมูลส่วนตัว",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "ใช้งานง่าย",
      description: "เชื่อมต่อ API พร้อมใช้งานได้ทันที ไม่ต้องติดตั้งซับซ้อน",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Real-Time",
      description: "รับข้อมูลการทำธุรกรรมแบบเรียลไทม์ ทันทีที่มีการโอนเงิน",
    },
  ];

  const useCases = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "ผู้พัฒนาเว็บไซต์ / ระบบ POS",
      description: "พัฒนาระบบรับชำระเงินที่ทันสมัย",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "ระบบแจ้งเตือนเงินเข้า-ออก",
      description: "ติดตามการเคลื่อนไหวทางการเงินแบบเรียลไทม์",
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "ร้านค้าออนไลน์",
      description: "ตรวจสอบการชำระเงินอัตโนมัติ",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "ผู้ให้บริการทางการเงิน",
      description: "จัดการธุรกรรมทางการเงินอย่างมีประสิทธิภาพ",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                LINE Bank Connect
              </span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a
                href="#features"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                คุณสมบัติ
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                ราคา
              </a>
              <a
                href="#api"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                API
              </a>
              <a
                href="#contact"
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                ติดต่อ
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <Lock className="w-4 h-4" />
                <span>ปลอดภัย 100%</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              บริการ API แจ้งเตือน
              <br />
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                เงินเข้า/เงินออก
              </span>
              <br />
              ด้วย LINE Bank Connect
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              ระบบปลอดภัยที่ดึงข้อความแจ้งเตือนจาก LINE
              เพื่อติดตามการทำธุรกรรมแบบเรียลไทม์
              เหมาะสำหรับผู้พัฒนาและธุรกิจทุกขนาด
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/buy">
                <button className="cursor-pointer bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  เริ่มใช้งานเลย
                </button>
              </Link>
              <Link href="#api">
                <button className="cursor-pointer  border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-green-500 hover:text-green-600 transition-colors">
                  ดูตัวอย่าง API
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ทำไมต้องเลือก LINE Bank Connect?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ระบบที่ออกแบบมาเพื่อความปลอดภัยและใช้งานง่าย
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                  activeFeature === index
                    ? "border-green-500 bg-green-50 shadow-lg"
                    : "border-gray-200 hover:border-green-300"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div
                  className={`inline-flex p-3 rounded-lg mb-4 ${
                    activeFeature === index
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Data Information */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              ข้อมูลที่ได้รับ
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "วันที่และเวลา",
                "จำนวนเงิน",
                "สถานะ (เงินเข้า/ออก)",
                "ชื่อบัญชีผู้โอน",
                "ชื่อบัญชีปลายทาง",
                "Transaction ID",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              เหมาะสำหรับใคร?
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex p-3 bg-blue-100 text-blue-600 rounded-lg mb-4">
                  {useCase.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            ราคาที่คุ้มค่า
          </h2>
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-8 rounded-2xl text-white max-w-md mx-auto">
            <div className="text-6xl font-bold mb-4">฿5</div>
            <div className="text-xl mb-6">ต่อวัน</div>
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-5 h-5" />
                <span>API พร้อมใช้งานทันที</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-5 h-5" />
                <span>ข้อมูลแบบ Real-Time</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-5 h-5" />
                <span>รองรับ JSON Format</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-5 h-5" />
                <span>ปลอดภัย 100%</span>
              </div>
            </div>
            <Link href="/buy">
              <button className="cursor-pointer bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                เริ่มใช้งาน
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section id="api" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              API Documentation
            </h2>
            <p className="text-xl text-gray-600">
              ใช้งานผ่าน REST API แบบง่าย ๆ
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold">API Endpoint</h3>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                POST https://line-noti-api.vercel.app/api/transactions
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-semibold">Response Format</h3>
              </div>
              <div className="text-sm text-gray-600">
                ข้อมูลในรูปแบบ JSON พร้อมใช้งาน
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="mt-12 bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 text-white">
              Payload ที่ใช้ส่งไปยัง API:
            </h3>
            <pre className="text-sm">
              {`{
  "account": "ชื่อ Account ของคุณ",
  "xkey": "รหัส X-Key ของคุณ",
}`}
            </pre>
          </div>
          <div className="mt-12 bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 text-white">
              ตัวอย่างข้อมูลที่ได้รับ:
            </h3>
            <pre className="text-sm">
              {`{
  "status": "success",
  "data": [
    {
      "transactionid": "571771822891336060",
      "bank_sender": "BBL XX1719",
      "amount": "1.00",
      "status": "เงินเข้า",
      "timestamp": "1753633867978",
      "time": "2025-07-27 16:31:07"
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            พร้อมเริ่มต้นใช้งาน?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            ติดต่อเราเพื่อเริ่มใช้งาน API หรือสอบถามข้อมูลเพิ่มเติม
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <span className="font-semibold">Discord: i.kxng</span>
            </div>
            <Link
              className=""
              href="https://discord.gg/u8nGSBAP"
              target="_blank"
            >
              <button className="cursor-pointer bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                ติดต่อเลย
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-lg font-semibold">
                LINE Bank Connect | Kz.Vrf
              </span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>
                &copy; 2025 LINE Bank Connect API By Kz.Vrf. All rights
                reserved.
              </p>
              <p className="text-sm mt-1">Secure • Reliable • Easy to Use</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
