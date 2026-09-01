import { useEffect, useState } from "react";
import { X } from "lucide-react";
import geLogoGold from "@/assets/shared/ge-logo-gold.png";
import { FormConsentCheckbox } from "@/components/form-consent-checkbox";

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
      {/* Enquire tab only — call, WhatsApp, and chat widgets removed */}
      <button
        onClick={openPopup}
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 translate-x-[calc(50%-1.15rem)] -rotate-90 origin-center rounded-t-md bg-[#123a4c] px-5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.25em] text-white shadow-lg transition hover:bg-[#0c2836] lg:block"
        style={{ right: "-1px" }}
      >
        Enquire
      </button>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          isOpen ? "visible bg-black/60 backdrop-blur-sm opacity-100" : "invisible opacity-0"
        }`}
        onClick={closePopup}
      >
        <div
          className={`relative modal-container max-h-[90vh] w-[calc(100%-1.5rem)] max-w-[420px] overflow-y-auto rounded-2xl bg-[#0f4157] p-6 shadow-2xl transition-transform duration-300 sm:w-[90%] md:p-9 ${
            isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-8"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closePopup}
            className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex flex-col items-center mb-6 text-center">
            {/* Logo representation */}
            <div className="flex flex-col items-center mb-5">
              <img src={geLogoGold} alt="Global Edifice" className="w-[140px] md:w-[160px]" />
            </div>

            <h2 className="font-serif text-[1.6rem] text-[#daba81] font-semibold mb-2 shadow-text text-shadow-sm">
              ENQUIRE NOW
            </h2>
            <p className="text-white text-[0.95rem]">
              Share your details and we'll get back to you shortly
            </p>
          </div>

          <form className="grid gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-white font-medium text-[0.85rem]">Full Name *</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-white/5 border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/50 outline-none focus:border-[#daba81] transition-colors text-[0.95rem]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white font-medium text-[0.85rem]">Email Address *</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full bg-white/5 border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/50 outline-none focus:border-[#daba81] transition-colors text-[0.95rem]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white font-medium text-[0.85rem]">Phone Number *</label>
              <input
                type="tel"
                placeholder="+919876543210"
                className="w-full bg-white/5 border border-white/20 rounded-full px-5 py-3 text-white placeholder:text-white/50 outline-none focus:border-[#daba81] transition-colors text-[0.95rem]"
              />
            </div>

            <FormConsentCheckbox variant="popup" />

            <button
              type="button"
              onClick={closePopup}
              className="mt-2 w-full rounded-full bg-[#dbb877] py-3.5 text-[0.95rem] font-bold text-[#0f4157] transition hover:bg-[#e4c995] shadow-lg"
            >
              SUBMIT ENQUIRY
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
