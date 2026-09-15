export const FORM_CONSENT_TEXT =
  "By submitting my details, I consent to Global Edifice contacting me regarding my enquiry and providing project-related updates through calls, SMS, email, or WhatsApp. I acknowledge that this consent overrides my registration under the National Do Not Call (NDNC) / Do Not Disturb (DND) service.";

const variantStyles = {
  light: {
    label: "flex items-start gap-2 text-[0.72rem] font-medium leading-[1.7] text-[#8a7e70]",
    checkbox: "mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-[#dbcdae] accent-[#c0a56e]",
  },
  dark: {
    label: "flex items-start gap-2.5 text-[0.72rem] font-normal leading-[1.65] text-white/80",
    checkbox: "mt-0.5 h-4 w-4 shrink-0 rounded border-white/40 bg-transparent accent-[#c0a56e]",
  },
  popup: {
    label: "flex items-start gap-2.5 text-[0.78rem] font-normal leading-[1.6] text-white/85",
    checkbox: "mt-0.5 h-4 w-4 shrink-0 rounded border-white/40 bg-transparent accent-[#dbb877]",
  },
} as const;

type FormConsentCheckboxProps = {
  variant?: keyof typeof variantStyles;
  className?: string;
};

export function FormConsentCheckbox({ variant = "light", className = "" }: FormConsentCheckboxProps) {
  const styles = variantStyles[variant];

  return (
    <label className={`${styles.label} ${className}`.trim()}>
      <input type="checkbox" required className={styles.checkbox} />
      <span>{FORM_CONSENT_TEXT}</span>
    </label>
  );
}
