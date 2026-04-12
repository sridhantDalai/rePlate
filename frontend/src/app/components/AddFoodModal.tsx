import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Upload, Calendar, Thermometer, Shield, Droplet, MapPin, User, Phone, Mail } from "lucide-react";
import { NAVBAR_LOCATIONS } from "../constants/locations";

interface AddFoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const emptyFormData = {
  name: "",
  image: null as File | null,
  manufactureDate: "",
  expiryDate: "",
  expiryLabel: "",
  storageTemp: "",
  sealed: false,
  acidic: false,
  uploaderName: "",
  uploaderPhone: "",
  uploaderEmail: "",
  location: "",
};

export function AddFoodModal({ isOpen, onClose, onSubmit }: AddFoodModalProps) {
  const [formData, setFormData] = useState(emptyFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTimeLeft = async (data: typeof formData) => {
    try {
      setIsLoading(true);
      const prompt = `
        Current date/time: ${new Date().toISOString()}
        Current local date/time: ${new Date().toLocaleString()}
        Food: ${data.name}
        Prepared on: ${data.manufactureDate}
        Storage temperature: ${data.storageTemp}
        Sealed container: ${data.sealed ? "yes" : "no"}
        Acidic food: ${data.acidic ? "yes" : "no"}
        Donor location: ${data.location}

        Task: Calculate a conservative safe expiry date and time for this food.
        Use all details above. If safety is uncertain, choose the earlier safer time.
        Return ONLY valid JSON, no markdown:
        {
          "expiryDateTime": "YYYY-MM-DDTHH:mm:ss",
          "expiryLabel": "tomorrow 6 am or 15 April 7 am"
        }
        The expiryLabel must be short and human-readable like "tomorrow 6 am" or "15 April 7 am".
      `;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      const result = await res.json();
      const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
      const cleanedText = rawText.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleanedText);
      const expiryDateTime = parsed.expiryDateTime;
      const expiryLabel = parsed.expiryLabel;

      if (expiryDateTime && expiryLabel) {
        setFormData((prev) => ({
          ...prev,
          expiryDate: expiryDateTime,
          expiryLabel,
        }));
        return { expiryDate: expiryDateTime, expiryLabel };
      }
    } catch (err) {
      console.error("AI Expiry Error:", err);
      alert("Could not determine expiry right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please select a food image.");
      return;
    }

    const expiry = formData.expiryDate
      ? { expiryDate: formData.expiryDate, expiryLabel: formData.expiryLabel }
      : await getTimeLeft(formData);

    if (!expiry) return;

    try {
      setIsSubmitting(true);

      const fd = new FormData();
      fd.append("itemList", formData.name);
      fd.append("dateOfPrep", formData.manufactureDate);
      fd.append("expiryDate", expiry.expiryDate);
      fd.append("storageTemp", formData.storageTemp);
      fd.append("name", formData.uploaderName);
      fd.append("phone", formData.uploaderPhone);
      fd.append("email", formData.uploaderEmail);
      fd.append("location", formData.location);
      fd.append("isSealed", String(formData.sealed));
      fd.append("isAcidic", String(formData.acidic));
      fd.append("imgFood", formData.image);

      const res = await fetch("https://replate-pycw.onrender.com/postFood/res", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Failed to add food.");
        return;
      }

      const savedFood = data.data;
      onSubmit({
        id: savedFood._id,
        name: savedFood.itemList,
        image: savedFood.imgFood,
        manufactureDate: savedFood.dateOfPrep,
        expiryDate: savedFood.expiryDate,
        expiryLabel: expiry.expiryLabel,
        storageTemp: savedFood.storageTemp,
        sealed: savedFood.isSealed,
        acidic: savedFood.isAcidic,
        price: savedFood.price || "Free",
        uploader: {
          name: savedFood.name,
          phone: savedFood.phone,
          email: savedFood.email,
          location: savedFood.location,
        },
      });

      alert("Food Added Successfully");
      setFormData(emptyFormData);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error uploading food.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      const shouldResetExpiry = [
        "name",
        "manufactureDate",
        "storageTemp",
        "sealed",
        "acidic",
        "location",
      ].includes(field);

      return {
        ...prev,
        [field]: value,
        ...(shouldResetExpiry ? { expiryDate: "", expiryLabel: "" } : {}),
      };
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-2xl bg-white/95 border border-white/60 rounded-3xl shadow-2xl"
            >
              <div className="sticky top-0 backdrop-blur-xl bg-white/90 border-b border-gray-200 px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="font-black text-gray-900" style={{ fontSize: "2rem" }}>
                    Add Food Item
                  </h2>
                  <p className="text-gray-600" style={{ fontSize: "0.875rem" }}>
                    Share your surplus food with the community
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-10 h-10 rounded-full backdrop-blur-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" strokeWidth={2.5} />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                  <label className="block font-black text-gray-900 mb-2" style={{ fontSize: "0.875rem" }}>
                    Item List
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g., Roti 32, sabzi 30 bowls, rice 20 kg"
                    className="w-full px-4 py-3 rounded-xl backdrop-blur-md bg-white/60 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                  />
                </div>

                <div>
                  <label className="block font-black text-gray-900 mb-2" style={{ fontSize: "0.875rem" }}>
                    Upload Image
                  </label>
                  <motion.div whileHover={{ scale: 1.01 }} className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleChange("image", file);
                        }
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl backdrop-blur-md bg-white/60 border-2 border-dashed border-gray-300 hover:border-emerald-500 focus:border-emerald-500 transition-all cursor-pointer group"
                    >
                      <Upload className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                      <span className="font-semibold text-gray-600 group-hover:text-emerald-600 transition-colors">
                        {formData.image ? "Image Selected" : "Click to upload image"}
                      </span>
                    </label>
                  </motion.div>
                  {formData.image && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 rounded-xl overflow-hidden border border-gray-200"
                    >
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Preview"
                        className="w-full h-32 object-cover"
                      />
                    </motion.div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-black text-gray-900 mb-2" style={{ fontSize: "0.875rem" }}>
                      Date of Preparation
                    </label>
                    <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        required
                        value={formData.manufactureDate}
                        onChange={(e) => handleChange("manufactureDate", e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-md bg-white/60 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block font-black text-gray-900 mb-2" style={{ fontSize: "0.875rem" }}>
                      Expiry Date {isLoading && " (Determining...)"}
                    </label>
                    <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        disabled={true}
                        placeholder="Filled after you submit the complete form"
                        value={formData.expiryLabel || ""}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-md border border-gray-200 outline-none transition-all font-semibold ${
                          isLoading ? "bg-emerald-50 animate-pulse" : "bg-gray-100 cursor-not-allowed"
                        }`}
                      />
                    </motion.div>

                    <p className="mt-2 text-xs font-bold text-emerald-700">
                      Gemini will determine this after the full form is filled.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block font-black text-gray-900 mb-2" style={{ fontSize: "0.875rem" }}>
                    Storage Temperature
                  </label>
                  <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                    <Thermometer className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.storageTemp}
                      onChange={(e) => handleChange("storageTemp", e.target.value)}
                      placeholder="e.g., 4C or Room Temp"
                      className="w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-md bg-white/60 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                    />
                  </motion.div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2" style={{ fontSize: "1.125rem" }}>
                    <User className="w-5 h-5 text-emerald-600" />
                    Your Contact Information
                  </h3>
                </div>

                <div>
                  <label className="block font-black text-gray-900 mb-2" style={{ fontSize: "0.875rem" }}>
                    Your Name
                  </label>
                  <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.uploaderName}
                      onChange={(e) => handleChange("uploaderName", e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-md bg-white/60 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                    />
                  </motion.div>
                </div>

                <div>
                  <label className="block font-black text-gray-900 mb-2" style={{ fontSize: "0.875rem" }}>
                    Email
                  </label>
                  <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={formData.uploaderEmail}
                      onChange={(e) => handleChange("uploaderEmail", e.target.value)}
                      placeholder="dummy@example.com"
                      className="w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-md bg-white/60 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                    />
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-black text-gray-900 mb-2" style={{ fontSize: "0.875rem" }}>
                      Phone Number
                    </label>
                    <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={formData.uploaderPhone}
                        onChange={(e) => handleChange("uploaderPhone", e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-12 pr-4 py-3 rounded-xl backdrop-blur-md bg-white/60 border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold"
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block font-black text-gray-900 mb-2" style={{ fontSize: "0.875rem" }}>
                      Location
                    </label>
                    <motion.div whileFocus={{ scale: 1.01 }} className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        required
                        value={formData.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        className={`w-full appearance-none pl-12 pr-4 py-3 rounded-xl backdrop-blur-md border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all font-semibold ${
                          formData.location ? "bg-white/60 text-gray-900" : "bg-white/60 text-gray-400"
                        }`}
                      >
                        <option value="" disabled>
                          Select your location
                        </option>
                        {NAVBAR_LOCATIONS.map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.label whileHover={{ x: 4 }} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.sealed}
                        onChange={(e) => handleChange("sealed", e.target.checked)}
                        className="peer w-6 h-6 rounded-lg border-2 border-gray-300 checked:bg-emerald-500 checked:border-emerald-500 cursor-pointer transition-all appearance-none"
                      />
                      <Shield className="absolute inset-0 m-auto w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-emerald-600" />
                      <span className="font-black text-gray-900">Sealed Container</span>
                    </div>
                  </motion.label>

                  <motion.label whileHover={{ x: 4 }} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.acidic}
                        onChange={(e) => handleChange("acidic", e.target.checked)}
                        className="peer w-6 h-6 rounded-lg border-2 border-gray-300 checked:bg-orange-500 checked:border-orange-500 cursor-pointer transition-all appearance-none"
                      />
                      <Droplet className="absolute inset-0 m-auto w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplet className="w-5 h-5 text-orange-600" />
                      <span className="font-black text-gray-900">Acidic Food</span>
                    </div>
                  </motion.label>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  className="w-full py-4 rounded-2xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-70"
                  style={{ fontSize: "1.125rem" }}
                >
                  {isLoading ? "Determining expiry with Gemini..." : isSubmitting ? "Uploading image and posting food..." : "Add Food Item"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
