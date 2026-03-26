import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/",         label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about",    label: "About" },
  { to: "/contact",  label: "Contact" },
];

const PHONE    = "+977-9851068337";
const WHATSAPP = "9779851068337";

const CSS = `
  .mhe-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: #fff;
    border-bottom: 1px solid #e2e8f0;
    box-shadow: 0 1px 8px rgba(0,0,0,0.06);
  }
  .mhe-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 24px;
    height: 64px; display: flex; align-items: center;
    justify-content: space-between; gap: 16px;
  }
  .mhe-logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; flex-shrink: 0;
  }
  .mhe-logo-icon {
    width: 40px; height: 40px; border-radius: 10px;
    background: linear-gradient(135deg, #ea580c, #f97316);
    color: #fff; font-weight: 900; font-size: 20px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .mhe-logo-name { font-size: 15px; font-weight: 800; color: #0f172a; line-height: 1.2; }
  .mhe-logo-sub  { font-size: 10px; color: #64748b; line-height: 1.2; }
  .mhe-links {
    display: flex; align-items: center; gap: 4px;
    flex: 1; justify-content: center;
  }
  .mhe-link {
    padding: 6px 14px; border-radius: 8px; font-size: 14px; font-weight: 500;
    color: #475569; text-decoration: none;
  }
  .mhe-link:hover { background: #f8fafc; color: #0f172a; }
  .mhe-link.active { background: #fff7ed; color: #ea580c; font-weight: 700; }
  .mhe-right { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
  .mhe-wa-btn {
    background: #dcfce7; color: #16a34a; padding: 7px 14px;
    border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none;
  }
  .mhe-call-btn {
    background: linear-gradient(135deg, #ea580c, #f97316); color: #fff;
    padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 700;
    text-decoration: none;
  }
  .mhe-hamburger {
    display: none;
    flex-direction: column; align-items: center; justify-content: center; gap: 5px;
    background: none; border: none; cursor: pointer;
    padding: 6px; width: 40px; height: 40px; border-radius: 8px;
  }
  .mhe-hamburger:hover { background: #f8fafc; }
  .mhe-bar { display: block; width: 22px; height: 2px; background: #475569; border-radius: 2px; }
  .mhe-mobile {
    display: none;
    flex-direction: column; gap: 2px;
    background: #fff; border-top: 1px solid #e2e8f0;
    padding: 12px 16px 20px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
  .mhe-mobile.open { display: flex; }
  .mhe-mobile-link {
    padding: 12px 16px; border-radius: 10px; font-size: 15px; font-weight: 500;
    color: #334155; text-decoration: none; display: block;
  }
  .mhe-mobile-link:hover { background: #f8fafc; }
  .mhe-mobile-link.active { background: #fff7ed; color: #ea580c; font-weight: 700; }
  .mhe-divider { height: 1px; background: #f1f5f9; margin: 8px 0; }
  .mhe-mobile-wa {
    padding: 12px 16px; border-radius: 10px; font-size: 15px; font-weight: 600;
    color: #16a34a; text-decoration: none; background: #f0fdf4; display: block;
  }
  .mhe-mobile-call {
    padding: 12px 16px; border-radius: 10px; font-size: 15px; font-weight: 600;
    color: #ea580c; text-decoration: none; background: #fff7ed;
    display: block; margin-top: 4px;
  }

  @media (max-width: 768px) {
    .mhe-links    { display: none !important; }
    .mhe-wa-btn   { display: none !important; }
    .mhe-call-btn { display: none !important; }
    .mhe-hamburger { display: flex !important; }
    .mhe-logo-sub  { display: none; }
  }
  @media (max-width: 900px) and (min-width: 769px) {
    .mhe-wa-btn { display: none !important; }
  }
`;

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  const close = () => setOpen(false);

  return (
    <>
      <style>{CSS}</style>
      <nav className="mhe-nav">
        <div className="mhe-inner">

          <Link to="/" className="mhe-logo" onClick={close}>
            <div className="mhe-logo-icon">M</div>
            <div>
              <div className="mhe-logo-name">Manakamana</div>
              <div className="mhe-logo-sub">Heavy Equipments Pvt. Ltd.</div>
            </div>
          </Link>

          <div className="mhe-links">
            {LINKS.map(l => (
              <Link key={l.to} to={l.to}
                className={`mhe-link${isActive(l.to) ? " active" : ""}`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="mhe-right">
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="mhe-wa-btn">
              💬 WhatsApp
            </a>
            <a href={`tel:${PHONE}`} className="mhe-call-btn">📞 Call</a>
            <button
              className="mhe-hamburger"
              onClick={() => setOpen(v => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open
                ? <span style={{ fontSize:20, color:"#334155", lineHeight:1 }}>✕</span>
                : <><span className="mhe-bar"/><span className="mhe-bar"/><span className="mhe-bar"/></>
              }
            </button>
          </div>
        </div>

        <div className={`mhe-mobile${open ? " open" : ""}`}>
          {LINKS.map(l => (
            <Link key={l.to} to={l.to}
              className={`mhe-mobile-link${isActive(l.to) ? " active" : ""}`}
              onClick={close}>
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}