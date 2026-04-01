import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[120px]"
          style={{ background: "radial-gradient(circle, #C8F557 0%, transparent 70%)", top: "20%", left: "20%" }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-[100px]"
          style={{ background: "radial-gradient(circle, #7B61FF 0%, transparent 70%)", bottom: "20%", right: "20%" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto mb-8"
        >
          <img src="/logo.png" alt="Finly" className="w-20 h-20 mx-auto object-contain" />
        </motion.div>

        {/* 404 number */}
        <motion.h1
          className="font-heading font-bold text-[120px] md:text-[160px] leading-none text-foreground/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          404
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
            Page not found
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            to="/dashboard"
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(200,245,87,0.15)]"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="px-6 py-2.5 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted/50 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>

        {/* Decorative dots */}
        <div className="mt-12 flex items-center justify-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
          <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
