import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import logoPolkesyo from "@/assets/polkesyo.png";

const About = () => {
  const teamMembers = [
    {
      initial: "LD",
      name: "Luh Dian Aprilia Purnama Dewi",
      role: "PENELITI",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      initial: "QA",
      name: "Dr. drg. Quroti A'yun, M.Kes",
      role: "PEMBIMBING 1",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      initial: "S",
      name: "Sutrisno, S.SiT., M.Kes",
      role: "PEMBIMBING 2",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      initial: "P",
      name: "Poltekkes Kemenkes Yogyakarta",
      role: "Jurusan Kesehatan Gigi",
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  return (
    <section id="about" className="relative py-16 md:py-24 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold text-center text-gray-800 mb-8">
            Tentang Kami
          </h2>

          {/* Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/70 rounded-3xl p-6 md:p-12 shadow-md border border-gray-100"
          >
            {/* Logos */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-8">
              <img
                src={logo}
                alt="Logo Senyum Bali"
                className="h-20 md:h-24 w-auto object-contain"
              />
              <img
                src={logoPolkesyo}
                alt="Logo Polkesyo"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </div>

            {/* Description */}
            <p className="text-center text-gray-700 text-base md:text-lg leading-relaxed">
              Senyum Bali hadir memberikan pemahaman tentang pentingnya menjaga
              kesehatan gigi setelah pelaksanaan upacara Metatah serta
              menumbuhkan kesadaran generasi muda Bali agar melestarikan budaya
              dengan cara yang sehat dan ilmiah.
            </p>

            {/* Team Section */}
            <div className="mt-16">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
                Tim Pengembang
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div
                      className={`${member.color} w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-xl md:text-2xl font-bold flex-shrink-0`}
                    >
                      {member.initial}
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg mb-1">
                        {member.name}
                      </h4>
                      <p className="text-yellow-600 font-medium text-sm uppercase tracking-wide">
                        {member.role}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
