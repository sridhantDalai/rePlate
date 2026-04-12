import { motion } from "motion/react";
import { Heart, Mail, Linkedin, Github, Instagram, UtensilsCrossed } from "lucide-react";

const teamMembers = [
  {
    name: "Sridhant Dalai",
    role: "Full Stack Developer",
    image: "https://res.cloudinary.com/dbjtjvfxd/image/upload/v1775976953/WhatsApp_Image_2026-04-12_at_12.22.56_xjurqn.jpg",
    linkedin: "https://www.linkedin.com/in/sridhant-dalai-44738a376",
    github: "https://github.com/sridhantDalai/",
    instagram: "https://www.instagram.com/sridhant_07z/",
    email: "sridhantrahul14@gmail.com"
  },
  {
    name: "Arup Shee",
    role: "UI/UX Designer",
    image: "https://res.cloudinary.com/dbjtjvfxd/image/upload/v1775987655/Screenshot_2026-04-12_152238_llgzhn.png",
    linkedin: "https://www.linkedin.com/in/arup-shee-4b535b214/",
    github: "https://github.com/Arupshee007",
    email : "arupshee007@gmail.com",
    instagram: "https://www.instagram.com/arupshee007/?hl=en",
  },
  {
    name: "Nikhil Kumar",
    role: "Backend Developer",
    image: "https://res.cloudinary.com/dbjtjvfxd/image/upload/v1775987643/WhatsApp_Image_2026-04-12_at_13.58.30_r0bbw4.jpg",
    linkedin: "https://www.linkedin.com/in/nikhil-kumar-01868038a",
    github: "https://github.com/nikhilll1907-source",
    email : "nikhilll1907@gmail.com",
    instagram: "https://www.instagram.com/it_nikhill/",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 mb-6"
          >
            <Heart className="w-4 h-4 text-emerald-300" fill="currentColor" />
            <span className="font-bold text-emerald-200" style={{ fontSize: '0.875rem' }}>
              Meet Our Team
            </span>
          </motion.div>

          <h2 className="font-black mb-4" style={{ fontSize: '3rem' }}>
            The People Behind rePlate
          </h2>
          <p className="text-emerald-200 max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
            Passionate individuals working together to fight food waste and hunger
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group"
            >
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/20 transition-all">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative mb-6"
                >
                  <div className="w-32 h-32 mx-auto rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 backdrop-blur-md bg-emerald-500 px-4 py-1 rounded-full border border-white/20">
                    <span className="font-bold text-white" style={{ fontSize: '0.75rem' }}>
                      Team Member
                    </span>
                  </div>
                </motion.div>

                {/* Info */}
                <div className="text-center mb-6">
                  <h3 className="font-black mb-1" style={{ fontSize: '1.5rem' }}>
                    {member.name}
                  </h3>
                  <p className="text-emerald-200 font-semibold" style={{ fontSize: '0.875rem' }}>
                    {member.role}
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.linkedin}
                    className="w-10 h-10 rounded-xl backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                  >
                    <Linkedin className="w-5 h-5" strokeWidth={2} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.github}
                    className="w-10 h-10 rounded-xl backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                  >
                    <Github className="w-5 h-5" strokeWidth={2} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={member.instagram}
                    className="w-10 h-10 rounded-xl backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                  >
                    <Instagram className="w-5 h-5" strokeWidth={2} />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 rounded-xl backdrop-blur-md bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors"
                  >
                    <Mail className="w-5 h-5" strokeWidth={2} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg">
                <UtensilsCrossed className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-black tracking-tight" style={{ fontSize: '1.5rem', lineHeight: 1 }}>
                  rePlate
                </h3>
                <p className="text-emerald-200 text-[0.65rem] font-semibold tracking-wide uppercase">
                  Share Food, Share Hope
                </p>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-emerald-200 font-semibold mb-1" style={{ fontSize: '0.875rem' }}>
                © 2026 rePlate. All rights reserved.
              </p>
              <p className="text-emerald-300" style={{ fontSize: '0.75rem' }}>
                Made with <Heart className="w-3 h-3 inline fill-current" /> for a better tomorrow
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
