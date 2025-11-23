import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, Heart, Shield, Thermometer, X } from "lucide-react";
import { CircleAlert, CircleX, CheckCircle } from "lucide-react";
import { Sparkles, ThumbsUp, ThumbsDown } from "lucide-react";
import { AlertTriangle, Droplet, Activity, XCircle} from "lucide-react";
import metatah1 from "@/assets/foto1.png";
import metatah2 from "@/assets/foto2.png";
import iconMetatah from "@/assets/icon1.png";
import iconRisiko from "@/assets/icon2.png";
import iconSensitivitas from "@/assets/icon3.png";
import iconPencegahan from "@/assets/icon4.png";
import baliPatternPopup from "@/assets/pop-up-bg.png";
import bgBaliPattern from "@/assets/bgBali.png";

interface EducationCard {
  id: number;
  title: string;
  description: string;
  iconImage: string;
}

const educationCards: EducationCard[] = [
  {
    id: 1,
    title: "Metatah dan Kesehatan Gigi",
    description: "Memahami upacara sakral dan maknanya",
    iconImage: iconMetatah,
  },
  {
    id: 2,
    title: "Risiko Kesehatan Gigi Pasca-Metatah",
    description: "Dampak jangka pendek dan panjang",
    iconImage: iconRisiko,
  },
  {
    id: 3,
    title: "Penanganan Sensitivitas Gigi Pasca-Metatah",
    description: "Cara merawat gigi setelah metatah",
    iconImage: iconSensitivitas,
  },
  {
    id: 4,
    title: "Langkah Pencegahan Pasca-Metatah",
    description: "Langkah sebelum, sesudah dan jangka panjang",
    iconImage: iconPencegahan,
  },
];

// Modal Component
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="
          relative rounded-3xl 
          w-full 
          max-w-[90%] 
          sm:max-w-xl 
          md:max-w-2xl 
          lg:max-w-5xl
          max-h-[80vh] 
          overflow-y-auto shadow-2xl
          p-0
        "
        style={{
          backgroundImage: `url(${baliPatternPopup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Inner card (konten yang rapi dan readable) */}
        <div className="bg-bali-cream backdrop-blur-sm rounded-3xl p-4 sm:p-8 m-4 sm:m-6">
          {children}
        </div>

        {/* Bottom close button */}
        <div className="w-full p-6 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full shadow-md"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Education = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const modalContent = {
    1: (
      <div
        className="p-0 rounded-3xl relative animate-slideUp"
      >
        <div className="bg-bali-cream/90 backdrop-blur-sm rounded-3xl p-4 space-y-8">
  
          {/* TITLE */}
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-black">
              Metatah dan Kesehatan Gigi
            </h2>
          </div>
  
          {/* IMAGE PREVIEW */}
          <div className="grid md:grid-cols-2 gap-4">
            <img
              src={metatah1}
              alt="Metatah 1"
              className="rounded-2xl w-full h-40 sm:h-64 object-cover shadow-sm"
            />
            <img
              src={metatah2}
              alt="Metatah 2"
              className="rounded-2xl w-full h-40 sm:h-64 object-cover shadow-sm"
            />
          </div>
  
          {/* SHORT INTRO */}
          <p className="text-gray-700 leading-relaxed text-lg">
            Metatah (Mepandes atau Potong Gigi) adalah tradisi sakral umat Hindu Bali 
            yang menandai peralihan menuju kedewasaan. Dalam prosesi ini, enam gigi 
            bagian atas diasah sebagai simbol pengendalian diri.
          </p>
  
          {/* ACCORDION SECTION */}
          <div className="space-y-4">
  
            {/* Accordion 1 — Dampak ke Enamel */}
            <details className="group bg-white p-5 rounded-2xl border shadow-xl cursor-pointer transition-all">
              <summary className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-gray-900">
                    Pengaruh Terhadap Enamel Gigi
                  </span>
                </div>
                <ChevronDown className="transition-transform group-open:rotate-180" />
              </summary>
  
              <p className="mt-3 text-gray-700 leading-relaxed animate-fadeIn">
                Dari sisi kesehatan gigi, proses pengikiran tersebut dapat membuat enamel (lapisan pelindung gigi paling luar) menjadi lebih tipis. Enamel berfungsi melindungi gigi dari rangsang panas, dingin, manis, asam, serta gesekan saat mengunyah dan menyikat gigi.
              </p>
            </details>
  
            {/* Accordion 2 — Risiko Sensitivitas */}
            <details className="group bg-white p-5 rounded-2xl border shadow-xl cursor-pointer transition-all">
              <summary className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-gray-900">
                    Mengapa Gigi Bisa Menjadi Sensitif?
                  </span>
                </div>
                <ChevronDown className="transition-transform group-open:rotate-180" />
              </summary>
  
              <p className="mt-3 text-gray-700 leading-relaxed animate-fadeIn">
                Ketika enamel menipis, lapisan gigi di bawahnya (dentin) lebih mudah terpapar. Dentin memiliki saluran kecil yang terhubung ke saraf gigi, sehingga gigi dapat terasa ngilu atau sensitif, terutama saat terkena makanan atau minuman panas/dingin, manis, atau asam.
              </p>
            </details>
  
            {/* Accordion 3 — Perawatan Setelah Metatah */}
            <details className="group bg-white p-5 rounded-2xl border shadow-xl cursor-pointer transition-all">
              <summary className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-gray-900">
                    Pentingnya Perawatan Setelah Metatah
                  </span>
                </div>
                <ChevronDown className="transition-transform group-open:rotate-180" />
              </summary>
  
              <p className="mt-3 text-gray-700 leading-relaxed animate-fadeIn">
                Karena perubahan pada enamel bersifat permanen, perawatan gigi setelah Metatah penting dilakukan agar sensitivitas tidak berlanjut dan tidak berkembang menjadi kerusakan gigi seperti karies maupun peradangan gusi.
              </p>
            </details>
  
          </div>
        </div>
      </div>
    ),
    2: (
      <div
        className="p-4 rounded-3xl relative animate-slideUp"
      >
        <div className="bg-bali-cream/90 backdrop-blur-sm rounded-3xl p-4 space-y-10">
    
          {/* TITLE */}
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-black">
              Risiko Kesehatan Gigi Pasca-Metatah
            </h2>
          </div>
    
          {/* INTRO */}
          <div className="bg-white border shadow-xl rounded-2xl p-6">
            <p className="text-gray-800 leading-relaxed text-lg">
            Setelah Metatah, enamel (lapisan terluar gigi) yang lebih tipis dapat membuat dentin (lapisan gigi bagian tengah) lebih mudah terpapar. Dentin memiliki saluran kecil yang terhubung ke saraf gigi. Karena itu, gigi dapat terasa ngilu saat terkena:
              <li className= "= ml-6">makanan atau minuman bersuhu ekstrem (panas atau dingin),</li>
              <li className= "= ml-6">makanan manis atau asam,</li>
              <li className= "= ml-6">makan makanan atau menggigit benda keras.</li>
            </p>
          </div>
    
          {/* SECTION: RISIKO */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2">
              Risiko Jika Gigi Tidak Dirawat
            </h3>
    
            {/* GRID RISK CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 border shadow-xl rounded-2xl flex gap-4 items-start">
                <CircleAlert className="w-7 h-7 text-red-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Karies / Gigi Berlubang</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Enamel yang menipis membuat gigi lebih rentan terhadap bakteri dan asam.
                  </p>
                </div>
              </div>
    
              <div className="bg-white p-6 border shadow-xl rounded-2xl flex gap-4 items-start">
                <CircleAlert className="w-7 h-7 text-red-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Peradangan Gusi</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Paparan dentin dapat memicu iritasi hingga inflamasi pada jaringan gusi.
                  </p>
                </div>
              </div>
            </div>
          </div>
    
          {/* SECTION: MISKONSEPSI */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold text-amber-900 flex items-center gap-2">
              Miskonsepsi Seputar Metatah
            </h3>
    
            <div className="space-y-4">
    
              {/* MISCONCEPT 1 */}
              <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm flex gap-4">
                <CircleX className="w-6 h-6 text-red-600 mt-1" />
                <p className="text-gray-800 leading-relaxed">
                  <span className="font-semibold text-red-700">Salah: </span> 
                  Enamel yang terkikis dapat kembali seperti semula dengan sendirinya.
                  <br />
                  <span className="text-amber-900 font-medium">Fakta: </span> 
                  Penipisan enamel bersifat permanen.
                </p>
              </div>
    
              {/* MISCONCEPT 2 */}
              <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm flex gap-4">
                <CircleX className="w-6 h-6 text-red-600 mt-1" />
                <p className="text-gray-800 leading-relaxed">
                  <span className="font-semibold text-red-700">Salah: </span> 
                  Sensitivitas setelah Metatah adalah hal sepele.
                  <br />
                  <span className="text-amber-900 font-medium">Fakta: </span> 
                  Enamel tipis meningkatkan risiko ngilu jangka panjang.
                </p>
              </div>
    
              {/* MISCONCEPT 3 — POSITIVE */}
              <div className="bg-white p-6 rounded-2xl border border-green-200 shadow-sm flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <p className="text-gray-800 leading-relaxed">
                  <span className="font-semibold text-green-700">Benar: </span> 
                  Kebersihan gigi tetap harus dijaga secara teratur setelah Metatah untuk 
                  mencegah masalah lanjutan.
                </p>
              </div>
    
            </div>
          </div>
    
        </div>
      </div>
    ),    
    3: (
      <div
        className="space-y-8 p-4 rounded-3xl relative animate-slideUp"
      >
        <div className="bg-bali-cream/90 backdrop-blur-sm rounded-3xl p-4 space-y-10">
    
          {/* TITLE */}
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-black">
              Risiko Kesehatan Gigi Pasca-Metatah
            </h2>
          </div>
    
          {/* SECTION A — PERAWATAN HARIAN */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              Perawatan Harian di Rumah
            </h3>
    
            {/* A. Menyikat Gigi */}
            <div className="bg-white rounded-2xl p-6 border-none shadow-lg">
              <h4 className="font-semibold text-black text-lg mb-3 flex items-center gap-2">
                A. Menyikat gigi dengan benar
              </h4>
              <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                <li>Gunakan sikat gigi berbulu lembut (soft-bristle).</li>
                <li>Gunakan pasta gigi khusus gigi sensitif atau yang mengandung fluoride.</li>
                <li>Sikat dengan gerakan lembut dari gusi ke ujung gigi, bukan menggosok keras.</li>
                <li>Lakukan dua kali sehari (pagi setelah makan & malam sebelum tidur).</li>
              </ul>
            </div>
    
            {/* B. Kumur */}
            <div className="bg-white rounded-2xl p-6 border-none shadow-lg">
              <h4 className="font-semibold text-black text-lg mb-3 flex items-center gap-2">
                B. Kumur setelah makan
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Berkumur dengan air bersih setelah makan membantu mengurangi sisa makanan dan menurunkan keasaman mulut.
              </p>
            </div>
    
            {/* C. Produk Penguatan Enamel */}
            <div className="bg-white rounded-2xl p-6 border-none shadow-lg">
              <h4 className="font-semibold text-black text-lg mb-3 flex items-center gap-2">
                C. Produk penguatan enamel
              </h4>
              <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                <li>Fluoride (pasta gigi fluoride atau aplikasi sesuai anjuran tenaga kesehatan).</li>
                <li>CPP-ACP (misalnya Tooth Mousse).</li>
              </ul>
            </div>
          </div>
    
          {/* SECTION B — DIANJURKAN vs DIHINDARI */}
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              Kebiasaan yang Dianjurkan & Dihindari
            </h3>
    
            <div className="grid md:grid-cols-2 gap-6">
              {/* Dianjurkan */}
              <div className="bg-green-50 border border-green-300 p-6 rounded-2xl shadow-sm">
                <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5 text-green-700" />
                  Dianjurkan
                </h4>
                <ul className="space-y-2 text-gray-700 leading-relaxed list-disc ml-4">
                  <li>Makanan tinggi kalsium: susu, yoghurt, keju.</li>
                  <li>Makanan lembut pada minggu pertama bila masih ngilu.</li>
                  <li>Minum air putih cukup.</li>
                </ul>
              </div>
    
              {/* Dihindari */}
              <div className="bg-red-50 border border-red-300 p-6 rounded-2xl shadow-sm">
                <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <ThumbsDown className="w-5 h-5 text-red-700" />
                  Dihindari
                </h4>
                <ul className="space-y-2 text-gray-700 leading-relaxed list-disc ml-4">
                  <li>Makanan/minuman sangat dingin atau sangat panas.</li>
                  <li>Makanan keras atau lengket.</li>
                  <li>Makanan manis atau asam berlebihan.</li>
                  <li>Menggigit benda keras atau membuka kemasan dengan gigi.</li>
                </ul>
              </div>
            </div>
          </div>
    
          {/* SECTION C — PERAWATAN LANJUTAN */}
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              Perawatan Lanjutan
            </h3>
    
            <div className="bg-white border border-none p-6 rounded-2xl shadow-lg space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Segera periksa ke dokter gigi bila:
              </p>
              <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                <li>Ngilu tidak membaik setelah lebih dari 1 minggu.</li>
                <li>Ngilu berat sampai mengganggu makan atau minum.</li>
                <li>Ada gusi bengkak atau berdarah.</li>
                <li>Muncul lubang atau kerusakan pada gigi.</li>
              </ul>
    
              <p className="text-gray-700 leading-relaxed pt-2">
                Pemeriksaan gigi rutin tetap dianjurkan:
              </p>
              <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                <li>Setiap 6 bulan sekali.</li>
                <li>Atau lebih cepat bila ada keluhan.</li>
              </ul>
    
              <p className="text-gray-700 leading-relaxed">
                Dokter gigi dapat memberikan perawatan desensitisasi seperti aplikasi fluoride atau gel khusus untuk menurunkan sensitivitas.
              </p>
            </div>
          </div>
    
        </div>
      </div>
    ),    
    4: (
      <div
        className="space-y-6 p-4 md:p-8 rounded-3xl relative overflow-hidden"
      >
        <div className="bg-bali-cream/90 backdrop-blur-sm rounded-3xl p-4 space-y-10">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-black">
                Langkah Pencegahan Pasca-Metatah
              </h2>
              <p className="text-sm md:text-base text-gray-700 mt-1">
                Panduan singkat agar tradisi tetap sakral dan kesehatan gigi terjaga.
              </p>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* STEP 1 – Kebersihan Gigi */}
          {/* ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="bg-white rounded-2xl p-5 md:p-7 border border-none shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white shadow-lg flex items-center justify-center">
                <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-teal-600" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-teal-800 text-lg md:text-xl">
                  1. Jaga kebersihan gigi setiap hari
                </h3>

                <p className="text-gray-700 mt-2">
                  Setelah Metatah, enamel gigi menipis sehingga lebih rentan.
                  Menjaga kebersihan membantu mencegah plak dan gigi berlubang.
                </p>

                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  {/* Card kiri */}
                  <div className="bg-teal-50 p-3 rounded-xl border border-teal-100">
                    <h4 className="font-medium text-teal-800 text-sm mb-2">
                      Yang harus dilakukan
                    </h4>
                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                      <li>Sikat gigi dua kali sehari.</li>
                      <li>Gunakan sikat berbulu lembut.</li>
                      <li>Gerakan dari gusi ke ujung gigi.</li>
                    </ul>
                  </div>

                  {/* Card kanan */}
                  <div className="bg-teal-50 p-3 rounded-xl border border-teal-100">
                    <h4 className="font-medium text-teal-800 text-sm mb-2">
                      Produk & kebiasaan
                    </h4>
                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                      <li>Pasta gigi sensitif / fluoride.</li>
                      <li>Kumur air bersih setelah makan.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* STEP 2 – Pencetus Ngilu */}
          {/* ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-5 md:p-7 border border-none shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white shadow-lg flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 md:w-8 md:h-8 text-red-600" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-red-800 text-lg md:text-xl">
                  2. Hindari pencetus ngilu & kerusakan gigi
                </h3>

                <p className="text-gray-700 mt-2">
                  Beberapa kebiasaan memperparah sensitivitas dan merusak enamel.
                </p>

                <div className="bg-red-50 p-3 rounded-xl border border-red-100 mt-3">
                  <h4 className="font-medium text-red-800 text-sm mb-2">
                    Yang sebaiknya dihindari
                  </h4>

                  <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                    <li>Makanan/minuman sangat panas atau dingin.</li>
                    <li>Makanan keras.</li>
                    <li>Makanan/minuman manis atau asam.</li>
                    <li>Menggigit benda keras atau membuka kemasan dengan gigi.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* STEP 3 – Fluoride */}
          {/* ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-5 md:p-7 border border-none shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white shadow-xl flex items-center justify-center">
                <Droplet className="w-7 h-7 md:w-8 md:h-8 text-black" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-black text-lg md:text-xl">
                  3. Gunakan fluoride atau produk penguatan enamel
                </h3>

                <p className="text-gray-700 mt-2">
                  Enamel yang menipis tidak kembali seperti semula, tetapi dapat
                  diperkuat melalui remineralisasi.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white p-3 rounded-xl border border-none shadow-lg">
                    <h4 className="font-medium text-black text-sm mb-2">
                      Yang dianjurkan
                    </h4>
                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                      <li>Pasta gigi berfluoride.</li>
                      <li>Aplikasi fluoride/gel khusus.</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-none shadow-lg">
                    <h4 className="font-medium text-black text-sm mb-2">
                      Produk rekomendasi
                    </h4>
                    <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                      <li>CPP-ACP (contoh: Tooth Mousse).</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ====================================================== */}
          {/* STEP 4 – Pemeriksaan */}
          {/* ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-5 md:p-7 border border-none shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white shadow-lg flex items-center justify-center">
                <Activity className="w-7 h-7 md:w-8 md:h-8 text-black" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-black text-lg md:text-xl">
                  4. Lakukan pemeriksaan gigi secara rutin
                </h3>

                <p className="text-gray-700 mt-2">
                  Pemeriksaan rutin membantu mendeteksi masalah lebih awal. Kapan perlu periksa?
                </p>

                <ul className="mt-3 text-gray-700 text-sm list-disc list-inside space-y-1">
                  <li>Bila ngilu tidak membaik lebih dari 1 minggu.</li>
                  <li>Bila ngilu berat mengganggu makan/minum.</li>
                  <li>Bila ada gusi bengkak, berdarah, atau muncul lubang.</li>
                </ul>

                <div className="mt-4 bg-bali-gold/25 p-3 rounded-xl border border-none">
                  <p className="text-gray-700 text-sm">
                    <strong>Kontrol rutin:</strong> setiap 6 bulan sekali, atau lebih cepat jika ada keluhan.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4"
          >
            {/* Mitos 1 */}
            <div className="bg-red-50 p-4 rounded-xl border border-red-300 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-red-600 text-sm">Mitos</h4>
              </div>
              <p className="text-gray-700 text-sm">
                Enamel yang terkikis akan kembali kuat sendiri.
              </p>
            </div>

            {/* Fakta 1 */}
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-800" />
                <h4 className="font-semibold text-emerald-800 text-sm">Fakta</h4>
              </div>
              <p className="text-gray-700 text-sm">
                Enamel tidak tumbuh kembali. Perawatan tetap diperlukan.
              </p>
            </div>

            {/* Mitos 2 */}
            <div className="bg-red-50 p-4 rounded-xl border border-red-300 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-red-600 text-sm">Mitos</h4>
              </div>
              <p className="text-gray-700 text-sm">
               Penipisan enamel tidak menyebabkan ngilu.
              </p>
            </div>

            {/* Fakta 2 */}
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-800" />
                <h4 className="font-semibold text-emerald-800 text-sm">Fakta</h4>
              </div>
              <p className="text-gray-700 text-sm">
                Enamel menipis membuat gigi lebih mudah sensitif.
              </p>
            </div>

            {/* Mitos 3 */}
            <div className="bg-red-50 p-4 rounded-xl border border-red-300 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-red-600 text-sm">Mitos</h4>
              </div>
              <p className="text-gray-700 text-sm">
                Kalau ngilu, lebih baik tidak usah menyikat gigi.
              </p>
            </div>

            {/* Fakta 3 */}
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-800" />
                <h4 className="font-semibold text-emerald-800 text-sm">Fakta</h4>
              </div>
              <p className="text-gray-700 text-sm">
                Kebersihan tetap penting, cukup lakukan dengan sikat lembut dan teknik yang tepat.
              </p>
            </div>

            {/* Mitos 4 */}
            <div className="bg-red-50 p-4 rounded-xl border border-red-300 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-red-600 text-sm">Mitos</h4>
              </div>
              <p className="text-gray-700 text-sm">
                Fluoride tidak diperlukan setelah Metatah.
              </p>
            </div>

            {/* Fakta 4 */}
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-800" />
                <h4 className="font-semibold text-emerald-800 text-sm">Fakta</h4>
              </div>
              <p className="text-gray-700 text-sm">
               Fluoride membantu pengembalian mineral enamel dan mengurangi sensitivitas.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    ),   
  };

  return (
    <section id="education" className="relative min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-10 min-h-screen">
        
        {/* Left Side - Green Background */}
        <div className="lg:col-span-4 bg-primary relative overflow-hidden flex items-center justify-center py-20 px-6 lg:px-12">
          {/* Decorative circles */}
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full border-4 border-white/20"></div>
          <div className="absolute bottom-32 left-20 w-24 h-24 rounded-full border-4 border-white/20"></div>
          <div className="absolute top-1/3 right-10 w-40 h-40 rounded-full border-4 border-white/20"></div>
          <div className="absolute bottom-20 right-16 w-28 h-28 rounded-full border-4 border-white/20"></div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-md"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Edukasi Metatah
            </h2>
            <p className="text-white/95 text-lg leading-relaxed">
              Panduan kesehatan gigi setelah upacara Metatah untuk menjaga tradisi dan kesehatan
            </p>
          </motion.div>
        </div>

        {/* Right Side - FULL PATTERN BACKGROUND */}
        <div
          className="lg:col-span-6 relative py-12 px-6 sm:px-10 lg:px-16 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgBaliPattern})`,
            backgroundSize: "cover",   
            backgroundPosition: "center", 
          }}
        >
          {/* Konten */}
          <div className="relative z-10 flex items-center justify-center min-h-full">
            <div className="w-full max-w-4xl space-y-6">
              {educationCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <img
                      src={card.iconImage}
                      alt={card.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto sm:mx-0"
                    />
                    <div className="flex-grow">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-base">{card.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        onClick={() => setSelectedCard(card.id)}
                        className="bg-bali-gold hover:bg-yellow-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold transition-colors shadow-md w-full sm:w-auto"
                      >
                        Mulai Belajar
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <Modal isOpen={selectedCard !== null} onClose={() => setSelectedCard(null)}>
        {selectedCard && modalContent[selectedCard as keyof typeof modalContent]}
      </Modal>
    </section>
  );
};

export default Education;