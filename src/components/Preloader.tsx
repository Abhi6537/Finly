import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  isVisible: boolean;
}

const Preloader = ({ isVisible }: PreloaderProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Ambient glow blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full opacity-20 blur-[100px]"
              style={{ background: "radial-gradient(circle, #C8F557 0%, transparent 70%)", top: "20%", left: "30%" }}
              animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[250px] h-[250px] rounded-full opacity-15 blur-[80px]"
              style={{ background: "radial-gradient(circle, #7B61FF 0%, transparent 70%)", bottom: "25%", right: "25%" }}
              animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], y: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Animated logo */}
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            >
              {/* Spinning ring */}
              <motion.div
                className="absolute -inset-3 rounded-2xl border-2 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ borderRadius: "18px" }}
              />
              {/* Pulsing outer glow */}
              <motion.div
                className="absolute -inset-4 rounded-2xl bg-primary/10"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Logo box */}
              <div className="w-20 h-20 rounded-xl flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(200,245,87,0.25)]">
                <motion.img
                  src="/logo.png"
                  alt="Finly"
                  className="w-20 h-20 object-contain"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                />
              </div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="font-heading font-bold text-2xl text-foreground tracking-tight">
                Finly
              </span>
              <span className="text-[11px] text-muted-foreground font-medium tracking-widest uppercase">
                Your Money, Clearly
              </span>
            </motion.div>

            {/* Animated loading bar */}
            <motion.div
              className="w-40 h-[3px] rounded-full bg-muted/30 overflow-hidden mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary via-[#30D990] to-primary"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
