import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Mail, MapPin, Phone, Shield, Trash2, UtensilsCrossed } from "lucide-react";

type UserProfile = {
  name: string;
  email: string;
  mobile: string;
  avatarUrl: string;
};

type FoodPost = {
  id: number;
  name: string;
  image: string;
  expiryLabel: string;
  location: string;
  status: "Available" | "Expiring Soon";
  sealed: boolean;
};

const mockUser: UserProfile = {
  name: "Rajesh Kumar",
  email: "rajesh@example.com",
  mobile: "+91 98765 43210",
  avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
};

const mockUserPosts: FoodPost[] = [
  {
    id: 1,
    name: "Fresh Vegetable Curry",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
    expiryLabel: "Today 8 pm",
    location: "Patna, Bihar",
    status: "Expiring Soon",
    sealed: true,
  },
  {
    id: 2,
    name: "Fresh Bread Loaves",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop",
    expiryLabel: "Tomorrow 9 am",
    location: "Patna, Bihar",
    status: "Available",
    sealed: false,
  },
];

export function Dashboard() {
  const [userPosts, setUserPosts] = useState<FoodPost[]>(mockUserPosts);

  const handleDeletePost = (postId: number) => {
    setUserPosts((posts) => posts.filter((post) => post.id !== postId));
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div>
            <p className="font-black text-emerald-600 uppercase tracking-wide mb-3" style={{ fontSize: "0.75rem" }}>
              Dashboard
            </p>
            <h1 className="font-black text-gray-900" style={{ fontSize: "clamp(2.25rem, 6vw, 4rem)", lineHeight: 1.05 }}>
              Your food shares
            </h1>
            <p className="mt-4 text-gray-600 max-w-2xl" style={{ fontSize: "1.125rem" }}>
              Manage your contact details and the food posts you have shared with the community.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-2xl px-6 py-4 shadow-lg inline-flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <UtensilsCrossed className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-black text-gray-900" style={{ fontSize: "1.75rem", lineHeight: 1 }}>
                {userPosts.length}
              </p>
              <p className="text-gray-600 font-semibold" style={{ fontSize: "0.875rem" }}>
                Active Posts
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[360px_1fr] gap-8 items-start">
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="backdrop-blur-2xl bg-white/80 border border-white/60 rounded-3xl shadow-2xl p-8"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={mockUser.avatarUrl}
                  alt={mockUser.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 border-4 border-white flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
              </div>

              <h2 className="font-black text-gray-900 mt-6" style={{ fontSize: "2rem", lineHeight: 1.1 }}>
                {mockUser.name}
              </h2>
              <p className="text-gray-600 mt-2 font-semibold" style={{ fontSize: "0.875rem" }}>
                Food donor
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <ProfileRow icon={Mail} label="Email" value={mockUser.email} />
              <ProfileRow icon={Phone} label="Mobile" value={mockUser.mobile} />
            </div>
          </motion.aside>

          <section className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-black text-gray-900" style={{ fontSize: "2rem" }}>
                  Your Food Posts
                </h2>
                <p className="text-gray-600 font-semibold" style={{ fontSize: "0.875rem" }}>
                  Food you have shared from Add Food.
                </p>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {userPosts.length > 0 ? (
                userPosts.map((post, index) => (
                  <FoodPostRow
                    key={post.id}
                    post={post}
                    delay={index * 0.08}
                    onDelete={() => handleDeletePost(post.id)}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-3xl p-10 text-center shadow-xl"
                >
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5">
                    <UtensilsCrossed className="w-8 h-8 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-black text-gray-900 mb-2" style={{ fontSize: "1.5rem" }}>
                    No food posts yet
                  </h3>
                  <p className="text-gray-600 font-semibold">
                    Your shared food will appear here.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>
    </div>
  );
}

function ProfileRow({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/70 border border-white/80 px-5 py-4 shadow-sm">
      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <p className="text-gray-500 font-semibold mb-1" style={{ fontSize: "0.75rem" }}>
          {label}
        </p>
        <p className="font-black text-gray-900 break-words" style={{ fontSize: "0.95rem" }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function FoodPostRow({ post, delay, onDelete }: { post: FoodPost; delay: number; onDelete: () => void }) {
  const statusClass =
    post.status === "Expiring Soon"
      ? "bg-orange-50 text-orange-700 border-orange-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ delay, duration: 0.4 }}
      className="backdrop-blur-xl bg-white/75 border border-white/60 rounded-3xl overflow-hidden shadow-xl"
    >
      <div className="grid md:grid-cols-[180px_1fr_auto] gap-0">
        <img
          src={post.image}
          alt={post.name}
          className="w-full h-48 md:h-full object-cover"
        />

        <div className="p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 flex-wrap mb-3">
            <span className={`px-3 py-1 rounded-lg border font-black ${statusClass}`} style={{ fontSize: "0.75rem" }}>
              {post.status}
            </span>
            {post.sealed && (
              <span className="px-3 py-1 rounded-lg border border-emerald-200 bg-white/80 text-emerald-700 font-black" style={{ fontSize: "0.75rem" }}>
                Sealed
              </span>
            )}
          </div>

          <h3 className="font-black text-gray-900 mb-4" style={{ fontSize: "1.5rem", lineHeight: 1.2 }}>
            {post.name}
          </h3>

          <div className="grid sm:grid-cols-2 gap-3 text-gray-600">
            <PostMeta icon={Calendar} label="Expires" value={post.expiryLabel} />
            <PostMeta icon={MapPin} label="Location" value={post.location} />
          </div>
        </div>

        <div className="p-6 md:pl-0 flex md:flex-col items-center justify-end md:justify-center">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 12px 30px rgba(220, 38, 38, 0.18)" }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={onDelete}
            className="px-5 py-3 rounded-xl bg-white/90 border border-red-100 text-red-600 hover:bg-red-50 font-black flex items-center gap-2 transition-colors shadow-sm"
            style={{ fontSize: "0.875rem" }}
          >
            <Trash2 className="w-4 h-4" strokeWidth={2.5} />
            Delete
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

function PostMeta({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 min-w-0">
      <Icon className="w-4 h-4 text-emerald-600 flex-shrink-0" strokeWidth={2.5} />
      <span className="font-semibold" style={{ fontSize: "0.875rem" }}>
        {label}:
      </span>
      <span className="font-black text-gray-900 truncate" style={{ fontSize: "0.875rem" }}>
        {value}
      </span>
    </div>
  );
}
