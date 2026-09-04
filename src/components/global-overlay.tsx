import { useEffect, useState } from "react";
import { X } from "lucide-react";
import geLogoGold from "@/assets/shared/ge-logo-gold.png";
import { FormConsentCheckbox } from "@/components/form-consent-checkbox";
import { companyWhatsApp } from "@/lib/company";

const ENQUIRY_SESSION_KEY = "ge-enquiry-popup-shown";

function hasSeenEnquiryPopup() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(ENQUIRY_SESSION_KEY) === "true";
}

function markEnquiryPopupSeen() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(ENQUIRY_SESSION_KEY, "true");
}

// Use a simple custom hook for pub/sub to open the popup from anywhere
export const useEnquiryPopup = () => {
  const openPopup = () => {
    window.dispatchEvent(new CustomEvent("open-enquiry-popup"));
  };
  return { openPopup };
};

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function GlobalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(() => hasSeenEnquiryPopup());

  const openPopup = () => {
    markEnquiryPopupSeen();
    setHasAutoOpened(true);
    setIsOpen(true);
  };

  const closePopup = () => {
    markEnquiryPopupSeen();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOpen = () => openPopup();
    window.addEventListener("open-enquiry-popup", handleOpen);

    // Global listener to catch generic ENQUIRE links/buttons that do not wire the popup directly.
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button");
      if (target) {
        const title = target.textContent?.trim().toUpperCase();

        if (title === "ENQUIRE" && !target.closest(".modal-container")) {
          e.preventDefault();
          openPopup();
        }
      }
    };
    document.addEventListener("click", handleGlobalClick);

    if (hasSeenEnquiryPopup()) {
      setHasAutoOpened(true);
      return () => {
        window.removeEventListener("open-enquiry-popup", handleOpen);
        document.removeEventListener("click", handleGlobalClick);
      };
    }

    // Auto open once per session on desktop only.
    const timer = setTimeout(() => {
      if (!hasAutoOpened && window.innerWidth >= 1024) {
        openPopup();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("open-enquiry-popup", handleOpen);
      document.removeEventListener("click", handleGlobalClick);
    };
  }, [hasAutoOpened]);

  return (
    <>
      <button
        onClick={openPopup}
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 translate-x-[calc(50%-1.15rem)] -rotate-90 origin-center rounded-t-md bg-[#123a4c] px-5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.25em] text-white shadow-lg transition hover:bg-[#0c2836] lg:block"
        style={{ right: "-1px" }}
      >
        Enquire
      </button>

      <a
        href={companyWhatsApp.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp ${companyWhatsApp.display}`}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-10px_rgba(37,211,102,0.7)] transition hover:scale-105 hover:bg-[#1ebe57] md:bottom-7 md:right-7"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          isOpen ? "visible bg-black/60 backdrop-blur-sm opacity-100" : "invisible opacity-0"
        }`}
        onClick={closePopup}
      >
        <div
          className={`relative modal-container max-h-[90vh] w-[calc(100%-1.5rem)] max-w-[420px] overflow-y-auto overscroll-contain rounded-2xl bg-[#0f4157] p-6 shadow-2xl transition-transform duration-300 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:w-[90%] md:p-8 ${
            isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 p-2 text-white/60 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-5 flex flex-col items-center text-center">
            <div className="mb-4 flex flex-col items-center">
              <img src={geLogoGold} alt="Global Edifice" className="w-[140px] md:w-[160px]" />
            </div>

            <h2 className="font-serif text-[1.6rem] font-semibold text-[#daba81] shadow-text text-shadow-sm mb-2">
              ENQUIRE NOW
            </h2>
            <p className="text-[0.95rem] text-white">
              Share your details and we'll get back to you shortly
            </p>
          </div>

          <form className="grid gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.85rem] font-medium text-white">Full Name *</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[0.95rem] text-white outline-none transition-colors placeholder:text-white/50 focus:border-[#daba81]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.85rem] font-medium text-white">Email Address *</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[0.95rem] text-white outline-none transition-colors placeholder:text-white/50 focus:border-[#daba81]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.85rem] font-medium text-white">Phone Number *</label>
              <input
                type="tel"
                placeholder="+919876543210"
                className="w-full rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[0.95rem] text-white outline-none transition-colors placeholder:text-white/50 focus:border-[#daba81]"
              />
            </div>

            <FormConsentCheckbox variant="popup" />

            <button
              type="button"
              onClick={closePopup}
              className="mt-1 w-full rounded-full bg-[#dbb877] py-3.5 text-[0.95rem] font-bold text-[#0f4157] shadow-lg transition hover:bg-[#e4c995]"
            >
              SUBMIT ENQUIRY
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
