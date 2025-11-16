import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Check } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Modal from "./Modal";
import doctorImg from "@/assets/doctor-bali.png"; 
import wa from "@/assets/wa.png";

const ConsultationSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_j9e0f2q",
        "template_nnie0al",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "idjLDVvUs8vREIW5W"
      );

      setShowSuccessModal(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Halo Senyum Bali, saya ingin konsultasi tentang kesehatan gigi."
    );
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
  };

  return (
    <section id="consultation" className="relative py-20 bg-[#FAFAF7] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/pattern-bali.svg')] bg-repeat" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">Konsultasi</h2>
          <p className="text-lg text-gray-600">
            Hubungi kami untuk informasi lebih lanjut mengenai metatah dan kesehatan gigi
          </p>
        </div>

        {/* GRID: Doctor — Email Form — WhatsApp Box */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr_1fr] gap-20 items-start">

          {/* DOCTOR ILLUSTRATION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-start justify-center"
          >
            <img
              src={doctorImg}
              alt="Ilustrasi Dokter Bali"
              className="max-w-[200px] md:max-w-[300px] drop-shadow-lg"
            />
          </motion.div>


          {/* EMAIL FORM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 h-full flex flex-col"
          >
            <h3 className="text-xl font-semibold text-green-900 mb-5">Kirim Email</h3>

            <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
              <div className="flex-1 space-y-1">
                <label className="block text-sm font-semibold mb-1 text-green-900">Nama *</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama anda..."
                  className="bg-[#FFFBEF] border-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div className="flex-1 space-y-1">
                <label className="block text-sm font-semibold mb-1 text-green-900">Email *</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Masukkan email anda..."
                  className="bg-[#FFFBEF] border-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div className="flex-1 space-y-1">
                <label className="block text-sm font-semibold mb-1 text-green-900">Pesan *</label>
                <Textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tambahkan pertanyaan atau keluhan anda..."
                  className="bg-[#FFFBEF] border-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C9A227] hover:bg-[#b28f22] text-white text-base py-6 rounded-xl shadow-md mt-6"
              >
                <Send className="mr-2" size={20} />
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </Button>
            </form>
          </motion.div>

          {/* WHATSAPP BOX */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl shadow-md border border-gray-100 flex flex-col items-center text-center gap-4"
          >
            <span className="text-green-700 text-xs font-medium bg-green-100 px-3 py-1 rounded-full">
              Respon Cepat
            </span>

            <h3 className="text-xl font-semibold text-green-900">
              Konsultasi via WhatsApp
            </h3>

            <img src={wa} alt="WhatsApp logo" className="w-20 h-20 mx-auto" />

            <div className="w-10 h-px bg-gray-200"></div>

            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Chat langsung dengan tim dokter untuk konsultasi cepat dan akurat.
            </p>

            <Button
              onClick={handleWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base rounded-xl shadow-md flex items-center justify-center mt-2"
            >
              <MessageCircle className="mr-2" size={22} />
              Chat WhatsApp
            </Button>
          </motion.div>


        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="text-center py-8">
          <div className="inline-block bg-green-100 p-6 rounded-full mb-6">
            <Check size={64} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-green-900 mb-4">
            Pesan Berhasil Terkirim
          </h2>
          <p className="text-gray-700 text-lg">
            Silakan menunggu konfirmasi melalui email dari tim kami.
          </p>
        </div>
      </Modal>
    </section>

  );
};

export default ConsultationSection;
