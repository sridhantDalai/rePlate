import { motion } from "motion/react";
import { Link } from "react-router";
import { Heart, ArrowRight, Users, PackageCheck, Clock, Target, Globe, Zap } from "lucide-react";
import boyImage from "figma:asset/b338f2f0c673bae6d56675c1f99a5f995be1ff9e.png";
import { Footer } from "./Footer";

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 via-white to-orange-100/50"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center py-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-emerald-500/10 border border-emerald-500/20"
            >
              <Heart className="w-4 h-4 text-emerald-600" fill="currentColor" />
              <span className="font-bold text-emerald-700" style={{ fontSize: '0.875rem' }}>
                Fighting Food Waste & Hunger
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-black tracking-tight text-gray-900"
              style={{ fontSize: '4rem', lineHeight: 1.1 }}
            >
              Every Meal
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                Matters
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-600"
              style={{ fontSize: '1.25rem', lineHeight: 1.6 }}
            >
              Connect surplus food with those who need it most. Join our community in reducing waste and spreading hope, one plate at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex gap-4"
            >
              <Link to="/products">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 rounded-2xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-2xl shadow-emerald-500/40 flex items-center gap-3"
                  style={{ fontSize: '1.125rem' }}
                >
                  Help Them
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" strokeWidth={3} />
                  </motion.div>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex gap-8 pt-8"
            >
              <StatCard icon={Users} value="12K+" label="Members" />
              <StatCard icon={PackageCheck} value="45K+" label="Meals Shared" />
              <StatCard icon={Clock} value="24/7" label="Available" />
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Glass Container */}
              <div className="relative rounded-[2rem] overflow-hidden backdrop-blur-2xl bg-white/40 border border-white/60 shadow-2xl p-3">
                <div className="rounded-[1.5rem] overflow-hidden">
                  <img
                    src={boyImage}
                    alt="Child in need"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="absolute -bottom-6 -left-6 backdrop-blur-xl bg-white/90 border border-white/60 rounded-2xl px-6 py-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-black text-gray-900" style={{ fontSize: '1.5rem', lineHeight: 1 }}>
                      2,847
                    </p>
                    <p className="text-gray-600 font-bold" style={{ fontSize: '0.75rem' }}>
                      Waiting for food today
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/30 to-white"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-black text-gray-900 mb-4" style={{ fontSize: '3rem' }}>
              Our Mission
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
              We believe no one should go hungry while perfectly good food goes to waste. rePlate connects communities to share surplus meals with those who need them most.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <MissionCard
              icon={Target}
              title="Zero Waste"
              description="Rescue millions of meals from landfills every year"
              delay={0.2}
            />
            <MissionCard
              icon={Heart}
              title="Feed Communities"
              description="Connect surplus food with families in need"
              delay={0.4}
            />
            <MissionCard
              icon={Globe}
              title="Build Together"
              description="Create a sustainable food-sharing ecosystem"
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: any;
  value: string;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="backdrop-blur-md bg-white/60 border border-white/60 rounded-xl px-4 py-3 shadow-lg"
    >
      <Icon className="w-5 h-5 text-emerald-600 mb-2" strokeWidth={2.5} />
      <p className="font-black text-gray-900" style={{ fontSize: '1.25rem', lineHeight: 1 }}>
        {value}
      </p>
      <p className="text-gray-600 font-semibold" style={{ fontSize: '0.75rem' }}>
        {label}
      </p>
    </motion.div>
  );
}

function MissionCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
    >
      <div className="backdrop-blur-xl bg-white/60 border border-white/60 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-6">
          <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>
        <h3 className="font-black text-gray-900 mb-3" style={{ fontSize: '1.5rem' }}>
          {title}
        </h3>
        <p className="text-gray-600" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
          {description}
        </p>
      </div>
    </motion.div>
  );
}
