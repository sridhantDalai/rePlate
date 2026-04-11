import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Phone, MapPin, Calendar, Thermometer, Shield, Droplet, Clock, Mail } from "lucide-react";

interface FoodDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    image: string;
    price: string;
    manufactureDate: string;
    expiryDate: string;
    expiryLabel?: string;
    storageTemp: string;
    sealed: boolean;
    acidic: boolean;
    uploader: {
      name: string;
      phone: string;
      email: string;
      location: string;
    };
  };
}

export function FoodDetailsModal({ isOpen, onClose, item }: FoodDetailsModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-2xl z-[100]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                duration: 0.4
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full h-full md:h-[95vh] max-w-6xl overflow-hidden backdrop-blur-3xl bg-white/95 border border-white/60 rounded-3xl shadow-2xl flex flex-col pointer-events-auto relative"
            >
              {/* Header */}
              <div className="flex-shrink-0 backdrop-blur-xl bg-white/90 border-b border-gray-200 px-6 md:px-10 py-6 flex items-center justify-between">
                <div>
                  <h2 className="font-black text-gray-900" style={{ fontSize: '2.5rem' }}>
                    Food Details
                  </h2>
                  <p className="text-gray-600" style={{ fontSize: '1rem' }}>
                    Information about this meal
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-12 h-12 rounded-full backdrop-blur-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors shadow-lg"
                >
                  <X className="w-6 h-6 text-gray-600" strokeWidth={2.5} />
                </motion.button>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Left Column - Image */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="space-y-6"
                  >
                    <div className="rounded-3xl overflow-hidden border-2 border-gray-200 shadow-2xl">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-64 lg:h-96 object-cover"
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
                        <h3 className="font-black text-gray-900 mb-2" style={{ fontSize: '2.5rem', lineHeight: 1.2 }}>
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black" style={{ fontSize: '1.25rem' }}>
                            {item.price}
                          </span>
                        </div>
                      </div>

                      <div className="backdrop-blur-xl bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-5">
                        <h4 className="font-black text-gray-900 mb-4" style={{ fontSize: '1.25rem' }}>
                          Food Information
                        </h4>
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
                    <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-2 border-emerald-200 rounded-2xl p-6 space-y-4">
                      <h4 className="font-black text-gray-900 flex items-center gap-3" style={{ fontSize: '1.5rem' }}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                          <User className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                        Shared By
                      </h4>

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

                    {/* Action Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClose}
                      className="w-full py-5 rounded-2xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/50 transition-all"
                      style={{ fontSize: '1.25rem' }}
                    >
                      Contact Donor
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
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
