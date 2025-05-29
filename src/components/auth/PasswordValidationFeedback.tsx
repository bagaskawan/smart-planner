import { motion, AnimatePresence } from "framer-motion";
import { PasswordRule } from "./types";

interface PasswordValidationFeedbackProps {
  rules: PasswordRule[];
}

export function PasswordValidationFeedback({
  rules,
}: PasswordValidationFeedbackProps) {
  return (
    <ul className="mt-2 text-sm">
      {rules.map((rule, index) => (
        <motion.li
          key={index}
          className="flex items-center space-x-2 mb-1"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AnimatePresence mode="wait">
            {rule.isValid ? (
              <motion.span
                key="checkmark"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-blue-500"
              >
                ✓
              </motion.span>
            ) : (
              <motion.span
                key="cross"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-red-500"
              >
                ✗
              </motion.span>
            )}
          </AnimatePresence>
          <span className={rule.isValid ? "text-gray-600" : "text-red-500"}>
            {rule.label}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
