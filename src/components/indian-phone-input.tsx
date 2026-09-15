export const INDIA_DIAL_CODE = "+91";

/** Keeps only the 10-digit national number, dropping a pasted/autofilled +91 or leading 0. */
export function normalizeIndianMobile(raw: string) {
  let digits = raw.replace(/\D/g, "");

  if (digits.length > 10 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length > 10 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  return digits.slice(0, 10);
}

export function withIndiaDialCode(digits: string) {
  return `${INDIA_DIAL_CODE}${normalizeIndianMobile(digits)}`;
}

const variantStyles = {
  light: {
    prefix:
      "flex shrink-0 items-center justify-center rounded-[0.2rem] border border-[#e0d1b8] bg-[#faf6ef] px-4 text-[1rem] font-medium text-[#3d3832] md:text-[1.04rem]",
    input:
      "min-w-0 flex-1 rounded-[0.2rem] border border-[#e0d1b8] bg-white px-4 py-3.5 text-[1rem] font-medium text-[#3d3832] outline-none placeholder:text-[#b2a594] md:text-[1.04rem]",
  },
  popup: {
    prefix:
      "flex shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 text-[0.95rem] text-white",
    input:
      "min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[0.95rem] text-white outline-none transition-colors placeholder:text-white/50 focus:border-[#daba81]",
  },
  underline: {
    prefix: "flex shrink-0 items-end border-b border-white/35 pb-2.5 pr-1 text-[0.95rem] text-white",
    input:
      "min-w-0 flex-1 border-b border-white/35 bg-transparent pb-2.5 text-[0.95rem] text-white outline-none transition placeholder:text-white/45 focus:border-[#c0a56e]",
  },
} as const;

type IndianPhoneInputProps = {
  value: string;
  onChange: (digits: string) => void;
  variant?: keyof typeof variantStyles;
  className?: string;
};

/** Mobile number field with a fixed, non-editable +91 prefix. `value` holds the 10 digits only. */
export function IndianPhoneInput({
  value,
  onChange,
  variant = "light",
  className = "",
}: IndianPhoneInputProps) {
  const styles = variantStyles[variant];

  return (
    <span className={`flex items-stretch gap-2 ${className}`.trim()}>
      <span className={styles.prefix} aria-hidden>
        {INDIA_DIAL_CODE}
      </span>
      <input
        type="tel"
        required
        inputMode="numeric"
        autoComplete="tel-national"
        pattern="[6-9][0-9]{9}"
        maxLength={10}
        title="Enter a valid 10-digit mobile number"
        aria-label="Mobile number (+91)"
        value={value}
        onChange={(event) => onChange(normalizeIndianMobile(event.target.value))}
        placeholder="9XXXXXXXXX"
        className={styles.input}
      />
    </span>
  );
}
