import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Mail, MapPin, Phone, Shield, Trash2, UtensilsCrossed } from "lucide-react";
import { Link } from "react-router";

type ApiFoodPost = {
  _id: string;
  itemList: string;
  imgFood: string;
  expiryDate: string;
  location: string;
  isSealed: boolean;
  name: string;
  phone: string;
  email: string;
};

type UserProfile = {
  name: string;
  email: string;
  mobile: string;
  avatarUrl: string;
};

type FoodPost = {
  id: string;
  name: string;
  image: string;
  expiryLabel: string;
  location: string;
  status: "Available" | "Expiring Soon";
  sealed: boolean;
};

const defaultAvatarUrl = "https://res.cloudinary.com/dbjtjvfxd/image/upload/v1775977793/cute-astronaut-with-taco-soda-cartoon-illustration-science-food-drink-concept-flat-cartoon-style_138676-2009_vht8lz.avif";

const formatExpiryLabel = (expiryDate: string) => {
  const date = new Date(expiryDate);

  if (Number.isNaN(date.getTime())) {
    return expiryDate || "Not available";
  }

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getStatus = (expiryDate: string): FoodPost["status"] => {
  const expiry = new Date(expiryDate);
  const hoursLeft = (expiry.getTime() - Date.now()) / (1000 * 60 * 60);

  return hoursLeft <= 24 ? "Expiring Soon" : "Available";
};

const mapApiFoodPost = (post: ApiFoodPost): FoodPost => ({
  id: post._id,
  name: post.itemList,
  image: post.imgFood,
  expiryLabel: formatExpiryLabel(post.expiryDate),
  location: post.location,
  status: getStatus(post.expiryDate),
  sealed: post.isSealed,
});

const getProfileFromPosts = (email: string, posts: ApiFoodPost[]): UserProfile => {
  const firstPost = posts[0];

  return {
    name: firstPost?.name || "Food donor",
    email,
    mobile: firstPost?.phone || "Not added yet",
    avatarUrl: defaultAvatarUrl,
  };
};

export function Dashboard() {
  const savedEmail = localStorage.getItem("email")?.trim().toLowerCase() || "";
  const isLoggedIn = Boolean(savedEmail);
  const [userPosts, setUserPosts] = useState<FoodPost[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Food donor",
    email: savedEmail || "Not logged in",
    mobile: "Not added yet",
    avatarUrl: defaultAvatarUrl,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUserPosts = async () => {
      const email = localStorage.getItem("email")?.trim().toLowerCase();

      if (!email) {
        setUserPosts([]);
        setIsLoading(false);
        return;
      }

      localStorage.setItem("email", email);

      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(`https://replate-pycw.onrender.com/postFood/email/${encodeURIComponent(email)}`);
const data = await res.json();

// 🔥 direct use
setUserProfile(getProfileFromPosts(email, data.data || data));
setUserPosts((data.data || data).map(mapApiFoodPost));

        setUserProfile(getProfileFromPosts(email, data.data));
        setUserPosts(data.data.map(mapApiFoodPost));
      } catch (err: any) {
        console.error("Dashboard food posts fetch failed:", err);
        setUserPosts([]);
        setError(err?.message || "Could not load your food posts.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserPosts();
  }, []);
  
 let [postid, setPostid] = useState("");
 useEffect(() => {
    const deletePost = async () => {
      if (!postid) return;

      try {
        console.log("Deleting post with ID:", postid);
        const res = await fetch(`https://replate-pycw.onrender.com/dashboard/del/${postid}`, {
          method: "DELETE",
        });
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Could not delete the post.");
        }
      } catch (err) {
        console.error("Delete post failed:", err);
      } finally {
        setPostid("");
      }
    };

    deletePost();
  }, [postid]);

  const handleDeletePost = (postId: string) => {
    console.log(postId);
    setPostid(postId);
    setUserPosts((posts) => posts.filter((post) => post.id !== postId));
  };

  const showNoPosts = !isLoading && !error && userPosts.length === 0;

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

        {!isLoggedIn ? (
          <DashboardAuthPrompt />
        ) : (
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
                    src={userProfile.avatarUrl}
                    alt={userProfile.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 border-4 border-white flex items-center justify-center shadow-lg">
                    <Shield className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                </div>

                <h2 className="font-black text-gray-900 mt-6" style={{ fontSize: "2rem", lineHeight: 1.1 }}>
                  {userProfile.name}
                </h2>
                <p className="text-gray-600 mt-2 font-semibold" style={{ fontSize: "0.875rem" }}>
                  Food donor
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <ProfileRow icon={Mail} label="Email" value={userProfile.email} />
                <ProfileRow icon={Phone} label="Mobile" value={userProfile.mobile} />
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

              {isLoading && (
                <DashboardMessage title="Loading your food posts..." body="Fetching posts shared from your email." />
              )}

              {error && (
                <DashboardMessage title="Could not load posts" body={error} tone="error" />
              )}

              {showNoPosts && (
                <DashboardMessage title="No food posts yet" body="Your shared food will appear here." />
              )}

              <AnimatePresence mode="popLayout">
                {userPosts.map((post, index) => (
                  <FoodPostRow
                    key={post.id}
                    post={post}
                    delay={index * 0.08}
                    onDelete={() => handleDeletePost(post.id)}
                  />
                ))}
              </AnimatePresence>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardAuthPrompt() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-2xl bg-white/80 border border-white/60 rounded-3xl p-10 md:p-12 text-center shadow-2xl"
    >
      <div className="mx-auto h-[4.5rem] w-[4.5rem] rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
        <UtensilsCrossed className="w-8 h-8 text-white" strokeWidth={2.5} />
      </div>
      <h2 className="mt-6 font-black text-gray-900" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
        To see your post you have to login / signin
      </h2>
      <p className="mt-3 text-gray-600 font-semibold" style={{ fontSize: "1rem" }}>
        Sign in to view and manage the food you have shared.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-black bg-white/70 border border-white/80 hover:bg-white text-gray-900 shadow-sm"
          >
            Login
          </motion.button>
        </Link>
        <Link to="/signup">
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 12px 30px rgba(16, 185, 129, 0.24)" }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
          >
            Sign Up
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

function DashboardMessage({ title, body, tone = "default" }: { title: string; body: string; tone?: "default" | "error" }) {
  const iconClass = tone === "error" ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100";
  const iconColor = tone === "error" ? "text-red-600" : "text-emerald-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="backdrop-blur-xl bg-white/70 border border-white/60 rounded-3xl p-10 text-center shadow-xl"
    >
      <div className={`mx-auto w-16 h-16 rounded-2xl border flex items-center justify-center mb-5 ${iconClass}`}>
        <UtensilsCrossed className={`w-8 h-8 ${iconColor}`} strokeWidth={2.5} />
      </div>
      <h3 className="font-black text-gray-900 mb-2" style={{ fontSize: "1.5rem" }}>
        {title}
      </h3>
      <p className="text-gray-600 font-semibold">
        {body}
      </p>
    </motion.div>
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
