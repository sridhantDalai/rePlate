import { motion } from "motion/react";
import { Heart, Users, Target, Award, TrendingUp, Shield } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-emerald-500/10 border border-emerald-500/20 mb-6"
          >
            <Heart className="w-4 h-4 text-emerald-600" fill="currentColor" />
            <span className="font-bold text-emerald-700" style={{ fontSize: '0.875rem' }}>
              About rePlate
            </span>
          </motion.div>

          <h1 className="font-black text-gray-900 mb-6" style={{ fontSize: '4rem', lineHeight: 1.1 }}>
            Transforming
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              Food Waste
            </span>
            {" "}Into Hope
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto" style={{ fontSize: '1.25rem', lineHeight: 1.6 }}>
            We're building a community-driven platform that connects people with surplus food to those who need it most, creating a sustainable solution to food waste and hunger.
          </p>
        </motion.div>

        {/* Story Section */}
        <section className="mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-black text-gray-900 mb-6" style={{ fontSize: '2.5rem' }}>
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600" style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
                <p>
                  rePlate was born from a simple observation: while millions go hungry every day, tonnes of perfectly good food gets wasted. We knew there had to be a better way.
                </p>
                <p>
                  Our platform bridges this gap by making it easy for individuals, restaurants, and organizations to share surplus food with their local community. Every meal saved is a step toward zero waste and zero hunger.
                </p>
                <p className="font-bold text-emerald-700">
                  Together, we're creating a world where no food goes to waste and no one goes hungry.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <ImpactCard number="12,847" label="Active Members" delay={0.2} />
              <ImpactCard number="45,293" label="Meals Saved" delay={0.3} />
              <ImpactCard number="234" label="Cities Reached" delay={0.4} />
              <ImpactCard number="98%" label="Satisfaction" delay={0.5} />
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-black text-gray-900 mb-4" style={{ fontSize: '3rem' }}>
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon={Heart}
              title="Community First"
              description="Building connections and trust within local communities"
              color="emerald"
              delay={0.2}
            />
            <ValueCard
              icon={Shield}
              title="Food Safety"
              description="Ensuring all shared meals meet safety standards"
              color="blue"
              delay={0.4}
            />
            <ValueCard
              icon={Target}
              title="Zero Waste"
              description="Committed to eliminating food waste at every level"
              color="orange"
              delay={0.6}
            />
          </div>
        </section>

        {/* How It Works */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-black text-gray-900 mb-4" style={{ fontSize: '3rem' }}>
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
              Three simple steps to make a real impact
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ProcessCard
              number="01"
              title="Share Food"
              description="List your surplus meals with expiry details and storage info"
              delay={0.2}
            />
            <ProcessCard
              number="02"
              title="Connect"
              description="Match with community members based on location"
              delay={0.4}
            />
            <ProcessCard
              number="03"
              title="Impact"
              description="Track the difference you're making in real-time"
              delay={0.6}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function ImpactCard({ number, label, delay }: { number: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.05 }}
      className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-2xl p-6 shadow-xl text-center"
    >
      <p className="font-black bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent mb-2" style={{ fontSize: '2.5rem', lineHeight: 1 }}>
        {number}
      </p>
      <p className="text-gray-600 font-bold" style={{ fontSize: '0.875rem' }}>
        {label}
      </p>
    </motion.div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
  color,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  color: string;
  delay: number;
}) {
  const colorMap: Record<string, { bg: string; text: string; shadow: string }> = {
    emerald: { bg: "from-emerald-500 to-emerald-600", text: "text-emerald-600", shadow: "shadow-emerald-500/30" },
    blue: { bg: "from-blue-500 to-blue-600", text: "text-blue-600", shadow: "shadow-blue-500/30" },
    orange: { bg: "from-orange-500 to-orange-600", text: "text-orange-600", shadow: "shadow-orange-500/30" },
  };

  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="backdrop-blur-xl bg-white/60 border border-white/60 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg ${colors.shadow} mb-6`}>
        <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
      </div>
      <h3 className="font-black text-gray-900 mb-3" style={{ fontSize: '1.5rem' }}>
        {title}
      </h3>
      <p className="text-gray-600" style={{ fontSize: '1rem', lineHeight: 1.6 }}>
        {description}
      </p>
    </motion.div>
  );
}

function ProcessCard({
  number,
  title,
  description,
  delay,
}: {
  number: string;
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
        <div className="font-black text-emerald-200 mb-4 group-hover:text-emerald-300 transition-colors" style={{ fontSize: '4rem', lineHeight: 1 }}>
          {number}
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
