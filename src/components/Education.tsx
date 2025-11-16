import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
// import Modal from "./Modal";
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
    title: "Apa itu Metatah?",
    description: "Memahami upacara sakral dan maknanya",
    iconImage: iconMetatah,
  },
  {
    id: 2,
    title: "Risiko Kesehatan",
    description: "Dampak jangka pendek dan panjang",
    iconImage: iconRisiko,
  },
  {
    id: 3,
    title: "Menangani sesitivitas",
    description: "Cara merawat gigi setelah metatah",
    iconImage: iconSensitivitas,
  },
  {
    id: 4,
    title: "Edukasi Pencegahan",
    description: "Langkah sebelum, sesudah dan jangka panjang",
    iconImage: iconPencegahan,
  },
];

// Modal Component
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
        {children}
      </motion.div>
    </div>
  );
};

const Education = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const modalContent = {
    1: (
      <div
        className="space-y-6 p-8 rounded-3xl relative"
        style={{
          backgroundImage: `url(${baliPatternPopup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-bali-cream backdrop-blur-sm rounded-3xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-black">Apa itu Metatah?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <img src={metatah1} alt="Metatah1" className="rounded-2xl w-full h-64 object-cover" />
            <img src={metatah2} alt="Metatah2" className="rounded-2xl w-full h-64 object-cover" />
          </div>
          <p className="text-gray-700 leading-relaxed">
            Metatah (atau Mepandes) adalah upacara sakral umat Hindu Bali yang menandai peralihan menuju kedewasaan.
            Pengikiran enam gigi bagian atas dilakukan sebagai simbol penyucian diri dari Sad Ripu — enam sifat yang perlu dikendalikan.
          </p>
          <div className="bg-[#FAE9C6] p-6 rounded-2xl border-2 border-amber-200">
            <h3 className="text-xl font-semibold text-amber-800 mb-3">Sad Ripu — Enam Sifat yang Dikendalikan:</h3>
            <p className="text-gray-800">
              Kama (nafsu), Krodha (amarah), Lobha (rakus), Moha (kebingungan), Mada (kesombongan), dan Matsarya (iri).
            </p>
          </div>
          <p className="text-gray-700">
            Makna spiritualnya adalah menguatkan pengendalian diri dan keharmonisan lahir–batin. Website Senyum Bali membantu
            menjaga makna itu dengan memberikan edukasi kesehatan gigi yang sopan dan mudah dipahami.
          </p>
        </div>
      </div>
    ),
    2: (
      <div
        className="space-y-6 p-8 rounded-3xl relative"
        style={{
          backgroundImage: `url(${baliPatternPopup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-bali-cream backdrop-blur-sm rounded-3xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-black">Risiko Kesehatan</h2>
          <p className="text-gray-700 leading-relaxed">
            Pengikiran gigi dapat mengikis enamel (lapisan pelindung terluar). Saat enamel berkurang, dentin di bawahnya
            bisa terbuka sehingga rangsangan panas, dingin, asam, atau tekanan terasa sebagai ngilu. Jika alat tidak steril,
            terdapat risiko iritasi dan infeksi pada jaringan mulut.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#FAE9C6] p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Jangka Pendek</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Ngilu dan sensitivitas pada gigi</li>
                <li>• Nyeri lokal di area pengikiran</li>
                <li>• Gusi kemerahan dan iritasi</li>
              </ul>
            </div>
            <div className="bg-[#FAE9C6] p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Jangka Panjang</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Gigi sensitif kronis</li>
                <li>• Risiko karies meningkat</li>
                <li>• Perubahan bentuk atau oklusi gigi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
    3: (
      <div
        className="space-y-6 p-8 rounded-3xl relative"
        style={{
          backgroundImage: `url(${baliPatternPopup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-bali-cream backdrop-blur-sm rounded-3xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-black">Menangani Sensitivitas Gigi</h2>
          <p className="text-gray-700 leading-relaxed">
            Rasa ngilu dapat dikurangi dengan perawatan yang konsisten dan lembut. Fokus pada perlindungan dentin yang
            terbuka serta kebersihan mulut sehari–hari.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-2xl border-2 border-green-300">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Yang Dilakukan</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Gunakan pasta gigi sensitif (potassium nitrate/stannous fluoride)</li>
                <li>• Sikat lembut dengan bulu halus, gerakan melingkar</li>
                <li>• Pakai obat kumur lembut tanpa alkohol</li>
                <li>• Kompres air hangat bila tidak nyaman</li>
                <li>• Konsultasi dokter gigi bila ngilu berlanjut</li>
              </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-2xl border-2 border-red-300">
              <h3 className="text-xl font-semibold text-red-800 mb-4">Yang Dihindari</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Makanan/minuman terlalu panas, dingin, asam, atau sangat manis</li>
                <li>• Makanan keras atau lengket pada masa pemulihan awal</li>
                <li>• Menyikat gigi terlalu kuat atau sikat berbulu kasar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
    4: (
      <div
        className="space-y-6 p-8 rounded-3xl relative"
        style={{
          backgroundImage: `url(${baliPatternPopup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-bali-cream backdrop-blur-sm rounded-3xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-black">Edukasi Pencegahan</h2>
          <p className="text-gray-700 leading-relaxed">
            Tujuan utama pencegahan adalah menjaga makna sakral Metatah tanpa menimbulkan masalah kesehatan.
            Lakukan langkah berikut sebelum, sesudah, dan jangka panjang:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border-2 p-6 rounded-2xl"
            >
              <div className="text-bali-gold text-lg font-bold mb-3">SEBELUM</div>
              <p className="text-gray-700">
                Pastikan alat steril, lakukan pemeriksaan gigi awal serta pembersihan karang gigi
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border-2 p-6 rounded-2xl"
            >
              <div className="text-bali-gold text-lg font-bold mb-3">SESUDAH</div>
              <p className="text-gray-700">
                Hindari makanan keras/panas/dingin, jaga kebersihan mulut, gunakan pasta gigi sensitif minimal 2 minggu,
                pakai obat kumur tanpa alkohol
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border-2 p-6 rounded-2xl"
            >
              <div className="text-bali-gold text-lg font-bold mb-3">JANGKA PANJANG</div>
              <p className="text-gray-700">
                Kontrol rutin tiap 6 bulan, edukasi keluarga tentang perawatan pasca-Metatah sebagai pelestarian tradisi
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <section id="education" className="relative min-h-screen">
      <div className="grid lg:grid-cols-10 min-h-screen">
        
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
          className="lg:col-span-6 relative py-20 px-8 lg:px-16 bg-repeat"
          style={{
            backgroundImage: `url(${bgBaliPattern})`,
            backgroundSize: "cover",      // bisa ubah ukuran pattern
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
                  <div className="flex items-center gap-6">
                    <img
                      src={card.iconImage}
                      alt={card.title}
                      className="w-20 h-20 object-contain"
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
                        className="bg-bali-gold hover:bg-yellow-700 text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-md"
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