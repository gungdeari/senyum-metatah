import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import Modal from "./Modal";

const Consultation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration - users should replace with their own
      await emailjs.send(
        "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
        "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "YOUR_PUBLIC_KEY" // Replace with your EmailJS public key
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
    setShowWhatsAppModal(true);
  };

  const confirmWhatsApp = () => {
    const message = encodeURIComponent("Halo Senyum Bali, saya ingin konsultasi tentang kesehatan gigi.");
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
    setShowWhatsAppModal(false);
  };

  return (
    <section id="consultation" className="relative py-20 bg-card">
      <div className="absolute inset-0 pattern-bg" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Konsultasi
            </h2>
            <p className="text-lg text-muted-foreground">
              Hubungi kami untuk informasi lebih lanjut mengenai metatah dan kesehatan gigi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-background p-8 rounded-2xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-primary mb-6">Kirim Pesan</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nama *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nama lengkap Anda..."
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pesan *</label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tulis pesan Anda di sini..."
                    rows={4}
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-secondary hover:bg-secondary/90"
                >
                  <Send size={18} className="mr-2" />
                  {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                </Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-background p-8 rounded-2xl shadow-lg flex flex-col justify-center"
            >
              <div className="text-center">
                <div className="inline-block bg-success/10 p-6 rounded-full mb-6">
                  <MessageCircle size={48} className="text-success" />
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Konsultasi via WhatsApp
                </h3>
                <p className="text-foreground mb-6">
                  Butuh jawaban cepat? Hubungi kami langsung melalui WhatsApp untuk konsultasi real-time.
                </p>
                <Button
                  onClick={handleWhatsApp}
                  size="lg"
                  className="bg-success hover:bg-success/90 text-white w-full"
                >
                  <MessageCircle size={20} className="mr-2" />
                  Konsultasi via WhatsApp
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="text-center py-8">
          <div className="inline-block bg-success/10 p-6 rounded-full mb-6">
            <Check size={64} className="text-success" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Pesan Berhasil Terkirim</h2>
          <p className="text-foreground text-lg">
            Silahkan menunggu untuk dihubungi melalui email
          </p>
        </div>
      </Modal>

      {/* WhatsApp Confirmation Modal */}
      <Modal isOpen={showWhatsAppModal} onClose={() => setShowWhatsAppModal(false)}>
        <div className="text-center py-8">
          <div className="inline-block bg-success/10 p-6 rounded-full mb-6">
            <MessageCircle size={64} className="text-success" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">Konsultasi via WhatsApp?</h2>
          <p className="text-foreground text-lg mb-8">
            Anda akan diarahkan ke WhatsApp untuk konsultasi langsung dengan tim kami.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => setShowWhatsAppModal(false)}
              size="lg"
            >
              Kembali
            </Button>
            <Button
              onClick={confirmWhatsApp}
              size="lg"
              className="bg-success hover:bg-success/90 text-white"
            >
              Lanjutkan
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default Consultation;
