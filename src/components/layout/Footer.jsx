import { Link } from "react-router-dom";

const PHONE    = "+977-9851068337";
const WHATSAPP = "9779851068337";
const EMAIL    = "mhektm@gmail.com";

export default function Footer() {
  return (
    <footer style={r.footer}>
      <style>{CSS}</style>
      <div style={r.inner} className="footer-inner">

        <div style={r.col}>
          <div style={r.brand}>Manakamana Heavy Equipments Pvt. Ltd.</div>
          <p style={r.tagline}>
            Your trusted partner for heavy machinery spare parts & equipment solutions in Nepal.
          </p>
          <div style={r.socialRow}>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" style={r.socialBtn}>💬 WhatsApp</a>
            <a href={`tel:${PHONE}`} style={r.socialBtnCall}>📞 Call</a>
          </div>
        </div>

        <div style={r.col}>
          <div style={r.colTitle}>Quick Links</div>
          {[["Home","/"],["Products","/products"],["About","/about"],["Contact","/contact"]].map(([l,to])=>(
            <Link key={to} to={to} style={r.footLink}>{l}</Link>
          ))}
        </div>

        <div style={r.col}>
          <div style={r.colTitle}>Contact Us</div>
          <a href={`tel:${PHONE}`} style={r.contactLine}>📞 {PHONE}</a>
          <a href={`mailto:${EMAIL}`} style={r.contactLine}>✉️ {EMAIL}</a>
          <p style={r.contactLine}>📍 Kritipur, Chovar, Kathmandu, Nepal</p>
          <p style={r.contactLine}>🕐 Sun–Fri: 9AM–6PM</p>
        </div>
      </div>

      <div style={r.bottom}>
        <div style={r.bottomInner} className="bottom-inner">
          <span>© {new Date().getFullYear()} Manakamana Heavy Equipments Pvt. Ltd. All rights reserved.</span>
          <span style={{color:"#475569"}}>PAN: XXXXXXXXX</span>
        </div>
      </div>
    </footer>
  );
}

const CSS = `
  @media (max-width: 768px) {
    .footer-inner  { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
    .bottom-inner  { flex-direction: column !important; gap: 6px !important; text-align: center !important; }
  }
  @media (max-width: 480px) {
    .footer-inner  { grid-template-columns: 1fr !important; }
  }
`;

const r = {
  footer: { background:"#0f172a", color:"#cbd5e1", marginTop:"auto" },
  inner: { maxWidth:1200, margin:"0 auto", padding:"52px 24px 36px", display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:48 },
  col: { display:"flex", flexDirection:"column", gap:6 },
  brand: { fontSize:15, fontWeight:800, color:"#fff", marginBottom:8, lineHeight:1.3 },
  tagline: { fontSize:13, color:"#94a3b8", lineHeight:1.7, maxWidth:280, marginBottom:16 },
  socialRow: { display:"flex", gap:8 },
  socialBtn: { background:"#16a34a", color:"#fff", padding:"7px 14px", borderRadius:8, fontSize:12, fontWeight:700, textDecoration:"none" },
  socialBtnCall: { background:"#ea580c", color:"#fff", padding:"7px 14px", borderRadius:8, fontSize:12, fontWeight:700, textDecoration:"none" },
  colTitle: { fontSize:11, fontWeight:700, letterSpacing:1.5, color:"#475569", textTransform:"uppercase", marginBottom:10 },
  footLink: { fontSize:13, color:"#94a3b8", textDecoration:"none", lineHeight:2.2 },
  contactLine: { fontSize:13, color:"#94a3b8", margin:"2px 0", textDecoration:"none", lineHeight:2 },
  bottom: { borderTop:"1px solid #1e293b", padding:"16px 24px" },
  bottomInner: { maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:12, color:"#64748b" },
};
