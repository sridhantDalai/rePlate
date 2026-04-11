import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router";
import { ArrowLeft, Calendar, Thermometer, Shield, Droplet, Clock, User, Phone, MapPin, Mail } from "lucide-react";

export function FoodDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  // Redirect if no item data
  if (!item) {
    navigate("/products");
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/products")}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md bg-white/60 border border-white/60 hover:bg-white/80 transition-colors font-bold text-gray-700"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
          Back to Products
        </motion.button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="rounded-3xl overflow-hidden border-2 border-gray-200 shadow-2xl backdrop-blur-xl bg-white/60">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Tags */}
            <div className="flex items-center gap-3 flex-wrap">
              {item.sealed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="backdrop-blur-md bg-emerald-50 px-4 py-3 rounded-xl flex items-center gap-2 border border-emerald-200"
                >
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-emerald-700" style={{ fontSize: '1rem' }}>
                    Sealed Container
                  </span>
                </motion.div>
              )}
              {item.acidic && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 }}
                  className="backdrop-blur-md bg-orange-50 px-4 py-3 rounded-xl flex items-center gap-2 border border-orange-200"
                >
                  <Droplet className="w-5 h-5 text-orange-600" />
                  <span className="font-bold text-orange-700" style={{ fontSize: '1rem' }}>
                    Acidic Food
                  </span>
                </motion.div>
              )}
            </div>

            {/* Additional Images Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg backdrop-blur-xl bg-white/60">
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop"
                  alt="Food preparation"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg backdrop-blur-xl bg-white/60">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop"
                  alt="Fresh ingredients"
                  className="w-full h-48 object-cover"
                />
              </div>
            </motion.div>

            {/* Info Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="backdrop-blur-xl bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="font-black text-emerald-800 mb-2" style={{ fontSize: '1.25rem' }}>
                Fresh & Ready to Share
              </h3>
              <p className="text-emerald-700 font-semibold" style={{ fontSize: '0.875rem' }}>
                This meal has been prepared with care and is ready to help someone in need. All food safety standards have been maintained.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            {/* Food Info */}
            <div className="space-y-6">
              <div>
                <h1 className="font-black text-gray-900 mb-4" style={{ fontSize: '3rem', lineHeight: 1.2 }}>
                  {item.name}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black shadow-lg shadow-emerald-500/30" style={{ fontSize: '1.5rem' }}>
                    {item.price}
                  </span>
                </div>
              </div>

              <div className="backdrop-blur-xl bg-white/70 border border-gray-200 rounded-2xl p-6 space-y-5 shadow-lg">
                <h2 className="font-black text-gray-900 mb-4" style={{ fontSize: '1.5rem' }}>
                  Food Information
                </h2>
                <DetailItem
                  icon={Calendar}
                  label="Prepared On"
                  value={formatDate(item.manufactureDate)}
                />
                <DetailItem
                  icon={Clock}
                  label="Expires On"
                  value={item.expiryLabel || formatDate(item.expiryDate)}
                />
                <DetailItem
                  icon={Thermometer}
                  label="Storage Temperature"
                  value={item.storageTemp}
                />
              </div>
            </div>

            {/* Uploader Info */}
            <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-200 rounded-2xl p-6 space-y-4 shadow-lg">
              <h3 className="font-black text-gray-900 flex items-center gap-3" style={{ fontSize: '1.75rem' }}>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <User className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                Shared By
              </h3>

              <div className="space-y-3">
                <ContactItem
                  icon={User}
                  label="Name"
                  value={item.uploader.name}
                />
                <ContactItem
                  icon={Phone}
                  label="Phone"
                  value={item.uploader.phone}
                />
                <ContactItem
                  icon={Mail}
                  label="Email"
                  value={item.uploader.email}
                />
                <ContactItem
                  icon={MapPin}
                  label="Location"
                  value={item.uploader.location}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-emerald-600" strokeWidth={2} />
      </div>
      <div className="flex-1">
        <p className="text-gray-500 font-semibold mb-1" style={{ fontSize: '0.875rem' }}>
          {label}
        </p>
        <p className="font-black text-gray-900" style={{ fontSize: '1.125rem' }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function ContactItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <motion.div
      whileHover={{ x: 4 }}
      className="flex items-center gap-4 backdrop-blur-md bg-white/70 border border-white/80 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <p className="text-gray-500 font-semibold mb-1" style={{ fontSize: '0.875rem' }}>
          {label}
        </p>
        <p className="font-black text-gray-900" style={{ fontSize: '1.125rem' }}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
