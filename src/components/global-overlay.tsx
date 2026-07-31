import { useEffect, useState } from "react";
import { X, Phone } from "lucide-react";
import geLogoGold from "@/assets/shared/ge-logo-gold.png";

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
  const [isMobileMenuExpanded, setIsMobileMenuExpanded] = useState(false);

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const syncMobileMenuState = () => {
      const hasExpandedMobileMenu =
        window.innerWidth < 768 &&
        Boolean(document.querySelector('[aria-controls$="mobile-nav"][aria-expanded="true"]'));

      setIsMobileMenuExpanded(hasExpandedMobileMenu);
    };

    syncMobileMenuState();

    const observer = new MutationObserver(syncMobileMenuState);
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-expanded"],
    });

    window.addEventListener("resize", syncMobileMenuState);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncMobileMenuState);
    };
  }, []);

  return (
    <>
      {/* Right side sticky Enquire button */}
      <button
        onClick={openPopup}
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 translate-x-[calc(50%-1.15rem)] -rotate-90 origin-center rounded-t-md bg-[#123a4c] px-5 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.25em] text-white shadow-lg transition hover:bg-[#0c2836] lg:block"
        style={{ right: "-1px" }}
      >
        Enquire
      </button>

      {/* Floating Action Buttons */}
      <div
        className={`fixed bottom-5 left-4 z-40 transition-opacity duration-200 sm:bottom-6 sm:left-6 lg:bottom-6 lg:left-6 ${
          isMobileMenuExpanded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <a
          href="tel:+918065480222"
          className="group flex items-center rounded-full bg-[#0a203b] p-3 text-white shadow-lg transition-all duration-300"
        >
          <Phone className="h-[1.2rem] w-[1.2rem]" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.95rem] font-medium opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-[100px] group-hover:opacity-100 group-hover:pr-1 lg:group-hover:max-w-[100px]">Call us</span>
        </a>
      </div>
      
      <div
        className={`fixed bottom-22 left-4 z-40 transition-opacity duration-200 sm:bottom-24 sm:left-6 md:left-auto md:right-6 lg:bottom-24 lg:right-6 ${
          isMobileMenuExpanded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <a
          href="https://wa.me/918043760152"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 shadow-[0_4px_14px_rgba(37,211,102,0.4)]"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.305-.885-.653-1.482-1.46-1.656-1.759-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>

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
