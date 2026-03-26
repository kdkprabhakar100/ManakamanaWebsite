export default function AboutPage() {
  return (
    <div style={r.page}>
      <style>{CSS}</style>

      {/* Hero */}
      <div style={r.pageHeader}>
        <div style={r.inner}>
          <p style={r.tag}>WHO WE ARE</p>
          <h1 style={r.title} className="page-title">About Manakamana Heavy Equipments</h1>
          <p style={r.subtitle}>
            A trusted name in heavy machinery parts and equipment supply across Nepal,
            committed to quality, reliability, and customer satisfaction.
          </p>
        </div>
      </div>

      <div style={r.inner}>

        {/* Story + Stats */}
        <div style={r.storyGrid} className="story-grid">
          <div style={r.textCol}>
            <h2 style={r.h2}>Our Story</h2>
            <p style={r.p}>
              Manakamana Heavy Equipments Pvt. Ltd. was founded with a single mission:
              to provide Nepal's construction and infrastructure industry with genuine,
              high-quality spare parts for heavy machinery at the best possible prices.
            </p>
            <p style={r.p}>
              Based in Kritipur, Chovar, Kathmandu, we have grown into one of the most
              trusted suppliers in the country — serving contractors, fleet operators,
              and equipment dealers from Kathmandu to all major provinces.
            </p>
            <p style={r.p}>
              Our team of experienced professionals ensures that every part we supply
              meets strict quality standards, whether it's an excavator gear set,
              hydraulic seal kit, or track assembly.
            </p>
            <h2 style={{...r.h2, marginTop:32}}>Our Mission</h2>
            <p style={r.p}>
              To be the most reliable and accessible source of heavy machinery components
              in Nepal — bridging the gap between manufacturers and the professionals
              who depend on their equipment every day.
            </p>
          </div>

          <div style={r.statsGrid} className="stats-grid">
            {[
              { n:"10+",   l:"Years of Experience" },
              { n:"500+",  l:"Parts in Inventory" },
              { n:"200+",  l:"Satisfied Clients" },
              { n:"50+",   l:"Brands Supported" },
            ].map(st => (
              <div key={st.l} style={r.statCard}>
                <div style={r.statNum}>{st.n}</div>
                <div style={r.statLabel}>{st.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Chairperson */}
        <section style={r.section}>
          <p style={r.tag}>LEADERSHIP</p>
          <h2 style={{...r.h2, marginBottom:28}}>Message from the Chairperson</h2>
          <div style={r.chairCard} className="chair-card">
            <div style={r.chairImgWrap}>
              {/* Replace the src below with the actual photo URL */}
              <img
                src="assets\chairperson.jpeg"
                alt="Chairperson"
                style={r.chairImg}
                onError={e => { e.target.src = ""; e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
              />
              <div style={{...r.chairImgFallback, display:"none"}}>👤</div>
              <div style={r.chairBadge}>Chairperson</div>
            </div>
            <div style={r.chairContent}>
              <div style={r.chairQuoteMark}>"</div>
              <p style={r.chairQuote}>
                Our commitment has always been to provide the highest quality heavy machinery
                parts to Nepal's construction industry. Every part we supply represents our
                dedication to reliability, and every client we serve is a testament to the
                trust this company has built over the years. We will continue to grow, innovate,
                and serve — because Nepal's infrastructure depends on machines that never stop.
              </p>
              <div style={r.chairInfo}>
                <div style={r.chairName}>[ Khadga Bahadur Karki ]</div>
                <div style={r.chairTitle}>Founder &amp; Chairperson</div>
                <div style={r.chairCompany}>Manakamana Heavy Equipments Pvt. Ltd.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section style={r.section}>
          <h2 style={{...r.h2, marginBottom:28}}>Our Values</h2>
          <div style={r.valuesGrid} className="values-grid">
            {[
              { icon:"✅", t:"Quality First",    d:"Every product is verified for authenticity and quality before it reaches you." },
              { icon:"🤝", t:"Customer Trust",   d:"We build long-term relationships based on honesty, transparency, and reliability." },
              { icon:"⚡", t:"Fast Turnaround",  d:"We understand downtime costs money. We work fast so your machines don't stay idle." },
              { icon:"💡", t:"Expert Knowledge", d:"Our team knows heavy machinery inside out and provides the right guidance every time." },
            ].map(v => (
              <div key={v.t} style={r.valueCard}>
                <div style={r.valueIcon}>{v.icon}</div>
                <h3 style={r.valueTitle}>{v.t}</h3>
                <p style={r.valueDesc}>{v.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team / location */}
        <section style={{...r.section, ...r.locationCard}} className="location-card">
          <div style={r.locationContent} className="location-content">
            <div>
              <h2 style={{...r.h2, color:"#fff"}}>Find Us</h2>
              <p style={{...r.p, color:"rgba(255,255,255,.8)"}}>
                📍 Kritipur, Chovar, Bagmati Province, Kathmandu, Nepal
              </p>
              <p style={{...r.p, color:"rgba(255,255,255,.8)", margin:0}}>
                📞 +977-9851068337 &nbsp;·&nbsp; ✉️ mhektm@gmail.com
              </p>
            </div>
            <div style={r.locBtns} className="loc-btns">
              <a href="https://wa.me/9779851068337" target="_blank" rel="noreferrer" style={r.btnWa}>💬 WhatsApp</a>
              <a href="tel:+9779851068337" style={r.btnCall}>📞 Call Now</a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

const CSS = `
  @media (max-width: 768px) {
    .page-title     { font-size: 26px !important; }
    .story-grid     { grid-template-columns: 1fr !important; gap: 32px !important; }
    .stats-grid     { grid-template-columns: 1fr 1fr !important; }
    .values-grid    { grid-template-columns: 1fr 1fr !important; }
    .location-card  { padding: 28px 20px !important; }
    .location-content { flex-direction: column !important; gap: 20px !important; }
    .loc-btns       { flex-direction: row !important; flex-wrap: wrap !important; }
    .chair-card     { flex-direction: column !important; align-items: center !important; padding: 28px 20px !important; gap: 24px !important; text-align: center !important; }
  }
  @media (max-width: 480px) {
    .values-grid    { grid-template-columns: 1fr !important; }
    .stats-grid     { grid-template-columns: 1fr 1fr !important; }
    .loc-btns       { flex-direction: column !important; }
  }
`;

const r = {
  page: { fontFamily:"'Segoe UI',system-ui,sans-serif", background:"#f8fafc", minHeight:"100vh" },
  pageHeader: { background:"linear-gradient(135deg,#0f172a,#1e3a5f)", color:"#fff", padding:"48px 24px 40px" },
  inner: { maxWidth:1100, margin:"0 auto", padding:"0 24px" },
  tag: { fontSize:11, fontWeight:800, letterSpacing:2, color:"#fb923c", textTransform:"uppercase", marginBottom:8 },
  title: { fontSize:34, fontWeight:800, color:"#fff", margin:"0 0 14px", lineHeight:1.2 },
  subtitle: { fontSize:16, color:"#94a3b8", lineHeight:1.7, maxWidth:680 },
  storyGrid: { display:"grid", gridTemplateColumns:"1.4fr 1fr", gap:48, margin:"40px 0 0", alignItems:"start" },
  textCol: {},
  h2: { fontSize:22, fontWeight:800, color:"#0f172a", margin:"0 0 14px" },
  p: { fontSize:14, color:"#475569", lineHeight:1.8, margin:"0 0 14px" },
  statsGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 },
  statCard: { background:"#fff", borderRadius:14, padding:"24px 20px", textAlign:"center", boxShadow:"0 2px 10px rgba(0,0,0,.06)", border:"1px solid #f1f5f9" },
  statNum: { fontSize:32, fontWeight:900, color:"#ea580c" },
  statLabel: { fontSize:12, color:"#64748b", marginTop:4, fontWeight:600 },
  section: { margin:"48px 0 0" },
  valuesGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:20 },
  valueCard: { background:"#fff", borderRadius:14, padding:"24px 20px", boxShadow:"0 2px 10px rgba(0,0,0,.06)", border:"1px solid #f1f5f9" },
  valueIcon: { fontSize:28, marginBottom:10 },
  valueTitle: { fontSize:15, fontWeight:700, color:"#0f172a", margin:"0 0 8px" },
  valueDesc: { fontSize:13, color:"#64748b", lineHeight:1.6, margin:0 },
  locationCard: { background:"linear-gradient(135deg,#ea580c,#f97316)", borderRadius:20, padding:"36px 40px", margin:"48px 0 48px" },
  locationContent: { display:"flex", justifyContent:"space-between", alignItems:"center", gap:24 },
  locBtns: { display:"flex", gap:10, flexShrink:0 },
  btnWa: { background:"#fff", color:"#16a34a", padding:"10px 22px", borderRadius:9, fontSize:14, fontWeight:700, textDecoration:"none", display:"inline-block" },
  btnCall: { background:"rgba(255,255,255,.15)", color:"#fff", padding:"10px 22px", borderRadius:9, fontSize:14, fontWeight:700, textDecoration:"none", border:"1px solid rgba(255,255,255,.3)", display:"inline-block" },
  /* Chairperson */
  chairCard: { display:"flex", gap:40, alignItems:"center", background:"#fff", borderRadius:20, padding:"36px 40px", boxShadow:"0 4px 24px rgba(0,0,0,.08)", border:"1px solid #f1f5f9" },
  chairImgWrap: { position:"relative", flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center" },
  chairImg: { width:180, height:180, borderRadius:16, objectFit:"cover", display:"block", border:"3px solid #fff", boxShadow:"0 4px 16px rgba(234,88,12,.2)" },
  chairImgFallback: { width:180, height:180, borderRadius:16, background:"linear-gradient(135deg,#ea580c,#f97316)", alignItems:"center", justifyContent:"center", fontSize:64, color:"#fff" },
  chairBadge: { position:"absolute", bottom:-10, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#ea580c,#f97316)", color:"#fff", fontSize:11, fontWeight:700, padding:"4px 14px", borderRadius:20, whiteSpace:"nowrap" },
  chairContent: { flex:1 },
  chairQuoteMark: { fontSize:80, lineHeight:0.6, color:"#ea580c", opacity:0.2, fontFamily:"Georgia,serif", marginBottom:8 },
  chairQuote: { fontSize:15, color:"#475569", lineHeight:1.8, fontStyle:"italic", margin:"0 0 24px", maxWidth:560 },
  chairInfo: { borderTop:"1px solid #f1f5f9", paddingTop:18 },
  chairName: { fontSize:18, fontWeight:800, color:"#0f172a", marginBottom:4 },
  chairTitle: { fontSize:13, fontWeight:600, color:"#ea580c", marginBottom:2 },
  chairCompany: { fontSize:12, color:"#94a3b8" },
};