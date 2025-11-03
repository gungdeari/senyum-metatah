import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="relative py-20 bg-card">
      <div className="absolute inset-0 pattern-bg" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Tentang Kami
          </h2>
          <p className="text-lg text-foreground leading-relaxed mb-8">
            Website Senyum Bali adalah platform edukasi yang menggabungkan tradisi Bali dengan kesehatan gigi modern. 
            Kami hadir untuk memberikan pengetahuan tentang pentingnya menjaga kesehatan gigi setelah upacara Metatah, 
            ritual sakral yang memiliki makna mendalam dalam budaya Bali.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-primary/5 p-6 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-primary mb-3">Misi Kami</h3>
              <p className="text-foreground">
                Mengedukasi masyarakat tentang kesehatan gigi dengan pendekatan yang sopan dan mudah dipahami, 
                menghormati tradisi Bali sekaligus mempromosikan praktik kesehatan modern.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-secondary/10 p-6 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-secondary mb-3">Visi Kami</h3>
              <p className="text-foreground">
                Menjadi sumber terpercaya untuk edukasi kesehatan gigi yang memadukan nilai-nilai budaya tradisional 
                dengan pengetahuan kesehatan kontemporer.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
