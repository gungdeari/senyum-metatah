import { motion } from "framer-motion";
import logo from "@/assets/logo.png"
import logoPolkesyo from "@/assets/polkesyo.png"

const About = () => {
  const teamMembers = [
    {
      initial: "LD",
      name: "Luh Dian Aprilia Purnama Dewi",
      role: "PENELITI",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      initial: "QA",
      name: "Dr. drg. Quroti A'yun, M.Kes",
      role: "PEMBIMBING 1",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      initial: "S",
      name: "Sutrisno, S.SiT., M.Kes",
      role: "PEMBIMBING 2",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      initial: "P",
      name: "Poltekkes Kemenkes Yogyakarta",
      role: "Jurusan Kesehatan Gigi",
      color: "bg-yellow-100 text-yellow-700"
    }
  ];

  return (
    <section id="about" className="relative py-20 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">
            Tentang Kami
          </h2>
        
          {/* Logo and Description Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-cream rounded-3xl p-8 md:p-12 mb-16 shadow-sm"
          >
            <div className="flex justify-center mb-6 gap-10">
              <img 
                src={logo}
                alt="Senyum Bali Logo" 
                className="h-24 w-auto"
              />
              <img 
                src={logoPolkesyo}
                alt="Senyum Bali Logo" 
                className="h-20 w-auto"
              />
            </div>
            
            <p className="text-center text-gray-700 text-lg leading-relaxed">
              Senyum Bali hadir memberikan pemahaman tentang pentingnya menjaga kesehatan 
              gigi setelah pelaksanaan upacara Metatah serta menumbuhkan kesadaran generasi 
              muda Bali agar melestarikan budaya dengan cara yang sehat dan ilmiah.
            </p>

            {/* Tim Pengembang */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
              Tim Pengembang
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`${member.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0`}>
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