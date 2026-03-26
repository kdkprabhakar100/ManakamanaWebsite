import { useState } from "react";

const PHONE    = "+977-9851068337";
const WHATSAPP = "9779851068337";
const EMAIL    = "mhektm@gmail.com";
const ADDRESS  = "Kritipur, Chovar, Bagmati Province, Kathmandu, Nepal";

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", phone:"", email:"", message:"" });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm(f => ({...f, [k]: e.target.value}));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    // Build WhatsApp message
    const msg = `Hi, I'm ${form.name}${form.phone ? " ("+form.phone+")" : ""}.\n\n${form.message}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <div style={r.page}>
      <style>{CSS}</style>

      {/* Header */}
      <div style={r.pageHeader}>
        <div style={r.inner}>
          <p style={r.tag}>GET IN TOUCH</p>
          <h1 style={r.title} className="page-title">Contact Us</h1>
          <p style={r.subtitle}>Have a requirement? Send us a message or reach out directly.</p>
        </div>
      </div>

      <div style={r.inner}>
        <div style={r.grid} className="contact-grid">

          {/* Info */}
          <div style={r.infoCol}>
            <h2 style={r.h2}>Contact Information</h2>

            {[
              { icon:"📍", title:"Address",   content: ADDRESS, href: null },
              { icon:"📞", title:"Phone",     content: PHONE,   href: `tel:${PHONE}` },
              { icon:"✉️", title:"Email",     content: EMAIL,   href: `mailto:${EMAIL}` },
              { icon:"🕐", title:"Hours",     content: "Sun – Fri: 9:00 AM – 6:00 PM\nSat: 10:00 AM – 4:00 PM", href: null },
            ].map(c => (
              <div key={c.title} style={r.infoCard}>
                <div style={r.infoIcon}>{c.icon}</div>
                <div>
                  <div style={r.infoTitle}>{c.title}</div>
                  {c.href
                    ? <a href={c.href} style={r.infoLink}>{c.content}</a>
                    : <div style={r.infoText}>{c.content}</div>
                  }
                </div>
              </div>
            ))}

            {/* Quick action buttons */}
            <div style={r.quickBtns} className="quick-btns">
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" style={r.btnWa}>
                💬 WhatsApp Us
              </a>
              <a href={`tel:${PHONE}`} style={r.btnCall}>
                📞 Call Now
              </a>
            </div>

            {/* Map embed placeholder */}
            <div style={r.mapPlaceholder}>
              <div style={{fontSize:36,marginBottom:8}}>📍</div>
              <p style={{color:"#64748b",fontSize:13,margin:0}}>Kritipur, Chovar, Kathmandu</p>
              <a
                href="https://maps.google.com/?q=Kritipur+Chovar+Kathmandu+Nepal"
                target="_blank" rel="noreferrer"
                style={{color:"#ea580c",fontWeight:600,fontSize:13,marginTop:8,display:"inline-block"}}
              >
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Form */}
          <div style={r.formCard}>
            {sent ? (
              <div style={r.successWrap}>
                <div style={{fontSize:52,marginBottom:16}}>✅</div>
                <h3 style={{fontSize:20,fontWeight:800,color:"#0f172a",margin:"0 0 8px"}}>Message Sent!</h3>
                <p style={{color:"#64748b",fontSize:14,marginBottom:24}}>
                  We've opened WhatsApp with your message. We'll reply as soon as possible.
                </p>
                <button style={r.btnOrange} onClick={() => { setSent(false); setForm({name:"",phone:"",email:"",message:""}); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 style={{...r.h2, marginBottom:20}}>Send a Message</h2>

                <div style={r.formGrid} className="form-grid">
                  <div style={r.field}>
                    <label style={r.label}>Your Name <span style={{color:"#ef4444"}}>*</span></label>
                    <input style={r.input} placeholder="Ram Bahadur" value={form.name} onChange={set("name")} required />
                  </div>
                  <div style={r.field}>
                    <label style={r.label}>Phone Number</label>
                    <input style={r.input} placeholder="+977-98XXXXXXXX" value={form.phone} onChange={set("phone")} type="tel" />
                  </div>
                </div>

                <div style={r.field}>
                  <label style={r.label}>Email Address</label>
                  <input style={r.input} placeholder="you@example.com" value={form.email} onChange={set("email")} type="email" />
                </div>

                <div style={r.field}>
                  <label style={r.label}>Message / Requirement <span style={{color:"#ef4444"}}>*</span></label>
                  <textarea
                    style={{...r.input, height:120, resize:"vertical"}}
                    placeholder="e.g. I need a turbo charger for Komatsu PC200-8. Please send price and availability."
                    value={form.message}
                    onChange={set("message")}
                    required
                  />
                </div>

                <button type="submit" style={{...r.btnOrange, width:"100%", border:"none", cursor:"pointer", fontSize:15, padding:"13px 28px"}}>
                  💬 Send via WhatsApp
                </button>
                <p style={{fontSize:11,color:"#94a3b8",textAlign:"center",marginTop:10}}>
                  This will open WhatsApp with your message pre-filled
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const CSS = `
  @media (max-width: 768px) {
    .page-title    { font-size: 26px !important; }
    .contact-grid  { grid-template-columns: 1fr !important; gap: 24px !important; }
    .form-grid     { grid-template-columns: 1fr !important; }
    .quick-btns    { flex-direction: column !important; }
  }
`;

const r = {
  page: { fontFamily:"'Segoe UI',system-ui,sans-serif", background:"#f8fafc", minHeight:"100vh" },
  pageHeader: { background:"linear-gradient(135deg,#0f172a,#1e3a5f)", color:"#fff", padding:"48px 24px 40px" },
  inner: { maxWidth:1100, margin:"0 auto", padding:"0 24px" },
  tag: { fontSize:11, fontWeight:800, letterSpacing:2, color:"#fb923c", textTransform:"uppercase", marginBottom:8 },
  title: { fontSize:34, fontWeight:800, color:"#fff", margin:"0 0 14px" },
  subtitle: { fontSize:16, color:"#94a3b8" },
  grid: { display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:36, margin:"36px 0 48px", alignItems:"start" },
  infoCol: {},
  h2: { fontSize:20, fontWeight:800, color:"#0f172a", margin:"0 0 20px" },
  infoCard: { display:"flex", gap:14, alignItems:"flex-start", background:"#fff", borderRadius:12, padding:"16px 18px", marginBottom:12, boxShadow:"0 1px 4px rgba(0,0,0,.06)", border:"1px solid #f1f5f9" },
  infoIcon: { fontSize:22, flexShrink:0, marginTop:1 },
  infoTitle: { fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:1, marginBottom:4 },
  infoText: { fontSize:14, color:"#334155", lineHeight:1.6, whiteSpace:"pre-line" },
  infoLink: { fontSize:14, color:"#ea580c", fontWeight:600, textDecoration:"none" },
  quickBtns: { display:"flex", gap:10, margin:"20px 0" },
  btnWa: { flex:1, background:"#16a34a", color:"#fff", padding:"11px 16px", borderRadius:9, fontSize:14, fontWeight:700, textDecoration:"none", textAlign:"center", display:"inline-block" },
  btnCall: { flex:1, background:"linear-gradient(135deg,#ea580c,#f97316)", color:"#fff", padding:"11px 16px", borderRadius:9, fontSize:14, fontWeight:700, textDecoration:"none", textAlign:"center", display:"inline-block" },
  mapPlaceholder: { background:"#fff", borderRadius:12, padding:"24px", textAlign:"center", border:"1.5px dashed #e2e8f0" },
  formCard: { background:"#fff", borderRadius:16, padding:"32px 28px", boxShadow:"0 4px 20px rgba(0,0,0,.08)", border:"1px solid #f1f5f9" },
  successWrap: { textAlign:"center", padding:"32px 0" },
  formGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 },
  field: { marginBottom:16 },
  label: { display:"block", fontSize:12, fontWeight:600, color:"#374151", marginBottom:6 },
  input: { width:"100%", padding:"10px 14px", borderRadius:8, border:"1.5px solid #e2e8f0", fontSize:14, color:"#0f172a", boxSizing:"border-box", outline:"none", fontFamily:"inherit" },
  btnOrange: { background:"linear-gradient(135deg,#ea580c,#f97316)", color:"#fff", padding:"11px 28px", borderRadius:9, fontSize:14, fontWeight:700, textDecoration:"none", display:"inline-block" },
};
