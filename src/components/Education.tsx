import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Modal from "./Modal";
import metatahWoman from "@/assets/metatah-woman.jpg";
import metatahMan from "@/assets/metatah-man.jpg";

interface EducationCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const educationCards: EducationCard[] = [
  {
    id: 1,
    title: "Apa itu Metatah?",
    description: "Pelajari tentang upacara sakral Metatah dalam budaya Bali",
    icon: "🏛️",
  },
  {
    id: 2,
    title: "Risiko Kesehatan",
    description: "Kenali risiko kesehatan gigi setelah upacara Metatah",
    icon: "⚠️",
  },
  {
    id: 3,
    title: "Menangani Sensitivitas",
    description: "Cara mengatasi sensitivitas gigi pasca Metatah",
    icon: "💊",
  },
  {
    id: 4,
    title: "Edukasi Pencegahan",
    description: "Langkah-langkah menjaga kesehatan gigi jangka panjang",
    icon: "🛡️",
  },
];

const Education = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const modalContent = {
    1: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Apa itu Metatah?</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <img src={metatahWoman} alt="Metatah Woman" className="rounded-2xl w-full object-cover" />
          <img src={metatahMan} alt="Metatah Man" className="rounded-2xl w-full object-cover" />
        </div>
        <p className="text-foreground leading-relaxed">
          Metatah (atau Mepandes) adalah upacara sakral umat Hindu Bali yang menandai peralihan menuju kedewasaan. 
          Pengikiran enam gigi bagian atas dilakukan sebagai simbol penyucian diri dari Sad Ripu — enam sifat yang perlu dikendalikan.
        </p>
        <div className="bg-secondary/10 p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-secondary mb-3">Sad Ripu — Enam Sifat yang Dikendalikan:</h3>
          <p className="text-foreground">
            Kama (nafsu), Krodha (amarah), Lobha (rakus), Moha (kebingungan), Mada (kesombongan), dan Matsarya (iri).
          </p>
        </div>
        <p className="text-foreground">
          Makna spiritualnya adalah menguatkan pengendalian diri dan keharmonisan lahir–batin. Website Senyum Bali membantu 
          menjaga makna itu dengan memberikan edukasi kesehatan gigi yang sopan dan mudah dipahami.
        </p>
      </div>
    ),
    2: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Risiko Kesehatan</h2>
        <p className="text-foreground leading-relaxed">
          Pengikiran gigi dapat mengikis enamel (lapisan pelindung terluar). Saat enamel berkurang, dentin di bawahnya 
          bisa terbuka sehingga rangsangan panas, dingin, asam, atau tekanan terasa sebagai ngilu. Jika alat tidak steril, 
          terdapat risiko iritasi dan infeksi pada jaringan mulut.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-primary/5 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold text-primary mb-3">Jangka Pendek</h3>
            <ul className="space-y-2 text-foreground">
              <li>• Ngilu dan sensitivitas pada gigi</li>
              <li>• Nyeri lokal di area pengikiran</li>
              <li>• Gusi kemerahan dan iritasi</li>
            </ul>
          </div>
          <div className="bg-warning/10 p-6 rounded-2xl">
            <h3 className="text-xl font-semibold text-warning mb-3">Jangka Panjang</h3>
            <ul className="space-y-2 text-foreground">
              <li>• Gigi sensitif kronis</li>
              <li>• Risiko karies meningkat</li>
              <li>• Perubahan bentuk atau oklusi gigi</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    3: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Menangani Sensitivitas Gigi</h2>
        <p className="text-foreground leading-relaxed">
          Rasa ngilu dapat dikurangi dengan perawatan yang konsisten dan lembut. Fokus pada perlindungan dentin yang 
          terbuka serta kebersihan mulut sehari–hari.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-success/10 p-6 rounded-2xl border-2 border-success/30">
            <h3 className="text-xl font-semibold text-success mb-4">Yang Dilakukan</h3>
            <ul className="space-y-3 text-foreground">
              <li>• Gunakan pasta gigi sensitif (potassium nitrate/stannous fluoride)</li>
              <li>• Sikat lembut dengan bulu halus, gerakan melingkar</li>
              <li>• Pakai obat kumur lembut tanpa alkohol</li>
              <li>• Kompres air hangat bila tidak nyaman</li>
              <li>• Konsultasi dokter gigi bila ngilu berlanjut</li>
            </ul>
          </div>
          <div className="bg-destructive/10 p-6 rounded-2xl border-2 border-destructive/30">
            <h3 className="text-xl font-semibold text-destructive mb-4">Yang Dihindari</h3>
            <ul className="space-y-3 text-foreground">
              <li>• Makanan/minuman terlalu panas, dingin, asam, atau sangat manis</li>
              <li>• Makanan keras atau lengket pada masa pemulihan awal</li>
              <li>• Menyikat gigi terlalu kuat atau sikat berbulu kasar</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    4: (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-primary">Edukasi Pencegahan</h2>
        <p className="text-foreground leading-relaxed">
          Tujuan utama pencegahan adalah menjaga makna sakral Metatah tanpa menimbulkan masalah kesehatan. 
          Lakukan langkah berikut sebelum, sesudah, dan jangka panjang:
        </p>
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border-2 border-secondary/30 p-6 rounded-2xl"
            >
              <div className="text-secondary text-lg font-bold mb-3">SEBELUM</div>
              <p className="text-foreground">
                Pastikan alat steril, lakukan pemeriksaan gigi awal serta pembersihan karang gigi
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border-2 border-secondary/30 p-6 rounded-2xl"
            >
              <div className="text-secondary text-lg font-bold mb-3">SESUDAH</div>
              <p className="text-foreground">
                Hindari makanan keras/panas/asam/dingin, jaga kebersihan mulut, gunakan pasta gigi sensitif minimal 2 minggu, 
                pakai obat kumur tanpa alkohol
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border-2 border-secondary/30 p-6 rounded-2xl"
            >
              <div className="text-secondary text-lg font-bold mb-3">JANGKA PANJANG</div>
              <p className="text-foreground">
                Kontrol rutin tiap 6 bulan, edukasi keluarga tentang perawatan pasca-Metatah sebagai pelestarian tradisi
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <section id="education" className="relative py-20 bg-background">
      <div className="absolute inset-0 pattern-bg" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Edukasi Metatah dan Kesehatan Gigi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pelajari tentang upacara Metatah dan cara menjaga kesehatan gigi setelahnya
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {educationCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="text-5xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold text-primary mb-3">{card.title}</h3>
              <p className="text-foreground mb-4">{card.description}</p>
              <Button
                onClick={() => setSelectedCard(card.id)}
                className="w-full bg-secondary hover:bg-secondary/90"
              >
                Mulai Belajar
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <Modal isOpen={selectedCard !== null} onClose={() => setSelectedCard(null)}>
        {selectedCard && modalContent[selectedCard as keyof typeof modalContent]}
      </Modal>
    </section>
  );
};

export default Education;
