import { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";

const PHONE    = "+977-9851068337";
const WHATSAPP = "9779851068337";
const EMAIL    = "mhektm@gmail.com";
const PER_PAGE = 8;

export default function HomePage() {
  const { products, loading } = useProducts();
  const [search, setSearch]   = useState("");
  const [page,   setPage]     = useState(1);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.description || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.category    || "").toLowerCase().includes(search.toLowerCase()) ||
    (p.hsCode      || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const paginated  = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleSearch = (v) => { setSearch(v); setPage(1); };

  return (
    <div style={r.page}>
      <style>{CSS}</style>

      {/* ── Hero ── */}
      <section style={r.hero}>
        <div style={r.heroInner} className="hero-inner">
          <div style={r.heroLeft}>
            <div style={r.badge}>🔩 Nepal's Trusted Heavy Equipment Supplier</div>
            <h1 style={r.heroTitle} className="hero-title">
              Manakamana<br />
              <span style={r.accent}>Heavy Equipments</span>
            </h1>
            <p style={r.heroDesc}>
              Premium quality spare parts for excavators, bulldozers, cranes and
              all heavy machinery — Kritipur, Chovar, Kathmandu.
            </p>
            <div style={r.heroBtns} className="hero-btns">
              <Link to="/products" style={r.btnOrange}>Browse Catalogue</Link>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" style={r.btnGreen}>
                💬 WhatsApp Us
              </a>
            </div>
            <div style={r.heroContacts} className="hero-contacts">
              <a href={`tel:${PHONE}`} style={r.heroContact}>📞 {PHONE}</a>
              <a href={`mailto:${EMAIL}`} style={r.heroContact}>✉️ {EMAIL}</a>
            </div>
          </div>
          <div style={r.heroStats} className="hero-stats">
            {[
              { icon:"⚙️",  val:"500+",  label:"Parts in Stock" },
              { icon:"🏗️", val:"200+",  label:"Happy Clients" },
              { icon:"🚚",  val:"Fast",  label:"Nepal-wide Delivery" },
              { icon:"✅",  val:"100%",  label:"Genuine Parts" },
            ].map(c => (
              <div key={c.label} style={r.statCard}>
                <div style={{fontSize:28,marginBottom:6}}>{c.icon}</div>
                <div style={r.statVal}>{c.val}</div>
                <div style={r.statLabel}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={r.section}>
        <div style={r.inner}>
          <p style={r.tag}>WHY CHOOSE US</p>
          <h2 style={r.sectionTitle} className="section-title">Built for Nepal's Toughest Jobs</h2>
          <div style={r.featureGrid} className="feature-grid">
            {[
              { icon:"🔧", title:"Genuine OEM Parts",  desc:"Sourced from certified manufacturers. Guaranteed compatibility." },
              { icon:"💰", title:"Best Market Price",  desc:"Competitive pricing with no compromise on quality." },
              { icon:"⚡", title:"Quick Availability", desc:"Large inventory — most parts available for immediate pickup." },
              { icon:"🤝", title:"Expert Support",     desc:"Our team helps you find the exact right part for your machine." },
              { icon:"🚚", title:"Fast Delivery",      desc:"Delivery to all districts of Nepal. Express available." },
              { icon:"🔄", title:"Easy Returns",       desc:"Wrong part? Hassle-free exchange policy." },
            ].map(f => (
              <div key={f.title} style={r.featureCard}>
                <div style={r.featureIcon}>{f.icon}</div>
                <h3 style={r.featureTitle}>{f.title}</h3>
                <p style={r.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section style={{...r.section, background:"#f8fafc"}}>
        <div style={r.inner}>
          <p style={r.tag}>OUR CATALOGUE</p>
          <h2 style={r.sectionTitle} className="section-title">Featured Products</h2>

          {/* Search */}
          <div style={r.searchWrap} className="search-wrap">
            <input
              style={r.searchInput}
              placeholder="🔍 Search by name, part number, or machine model…"
              value={search}
              onChange={e => handleSearch(e.target.value)}
            />
            {search && (
              <button style={r.clearBtn} onClick={() => handleSearch("")}>✕</button>
            )}
          </div>

          {loading ? (
            <div style={r.loadingRow}>
              <div style={r.spinner} className="spin" /><span>Loading products…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div style={r.empty}>
              <div style={{fontSize:48,marginBottom:12}}>🔍</div>
              <p>No products match "<strong>{search}</strong>"</p>
              <button style={{...r.btnOrange,marginTop:16,border:"none",cursor:"pointer"}} onClick={() => handleSearch("")}>Clear Search</button>
            </div>
          ) : (
            <>
              {search && <p style={r.resultCount}>{filtered.length} result{filtered.length!==1?"s":""} for "<strong>{search}</strong>"</p>}

              <div style={r.productGrid} className="product-grid">
                {paginated.map(p => (
                  <div key={p.id} style={r.productCard} className="product-card">
                    <div style={r.imgWrap}>
                      {p.image
                        ? <img src={p.image} alt={p.name} style={r.img} onError={e=>{e.target.style.display="none";}} />
                        : <div style={r.imgPlaceholder}>⚙️</div>
                      }
                      {p.category && <span style={r.catBadge}>{p.category}</span>}
                      {(p.quantity ?? 1) === 0 && <span style={r.outBadge}>Out of Stock</span>}
                    </div>
                    <div style={r.cardBody}>
                      <h3 style={r.productName}>{p.name}</h3>
                      {p.hsCode      && <p style={r.partNo}>Part No: {p.hsCode}</p>}
                      {p.description && <p style={r.productDesc}>{p.description}</p>}
                      <div style={r.cardFooter}>
                        <div>
                          {p.unit && <span style={r.unitTag}>📦 per {p.unit}</span>}
                          <p style={r.price}>{p.price ? `Rs ${Number(p.price).toLocaleString("en-IN")}` : "Call for Price"}</p>
                        </div>
                        <div style={r.cardBtns}>
                          <a href={`tel:${PHONE}`} style={r.iconBtn} title="Call Now">📞</a>
                          <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi, I need: ${p.name}${p.hsCode?" (Part: "+p.hsCode+")":""}`)}`}
                            target="_blank" rel="noreferrer" style={{...r.iconBtn,...r.iconBtnGreen}} title="WhatsApp">💬</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={r.pagination} className="pagination">
                  <button style={{...r.pageBtn, opacity: safePage===1?0.4:1}} onClick={() => setPage(p=>Math.max(1,p-1))} disabled={safePage===1}>← Prev</button>
                  <div style={r.pageNumbers} className="page-numbers">
                    {Array.from({length:totalPages},(_,i)=>i+1).filter(n =>
                      n===1 || n===totalPages || Math.abs(n-safePage)<=1
                    ).reduce((acc,n,i,arr)=>{
                      if(i>0 && n-arr[i-1]>1) acc.push("…");
                      acc.push(n); return acc;
                    },[]).map((n,i) =>
                      n==="…"
                        ? <span key={i} style={r.pageDots}>…</span>
                        : <button key={n} style={{...r.pageBtn, ...(n===safePage?r.pageBtnActive:{})}} onClick={()=>setPage(n)}>{n}</button>
                    )}
                  </div>
                  <button style={{...r.pageBtn, opacity: safePage===totalPages?0.4:1}} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={safePage===totalPages}>Next →</button>
                </div>
              )}

              <p style={r.pageInfo}>
                Showing {(safePage-1)*PER_PAGE+1}–{Math.min(safePage*PER_PAGE,filtered.length)} of {filtered.length} products
                {" · "}<Link to="/products" style={{color:"#ea580c",fontWeight:600}}>View full catalogue →</Link>
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── Services / Equipment Rental ── */}
      <section style={r.section}>
        <div style={r.inner}>
          <p style={r.tag}>EQUIPMENT RENTAL</p>
          <h2 style={r.sectionTitle} className="section-title">Our Services</h2>
          <p style={r.serviceIntro}>
            Beyond spare parts, we offer heavy equipment rental services for construction,
            infrastructure, and agricultural projects across Nepal.
          </p>
          <div style={r.servicesGrid} className="services-grid">
            {[
  {
    image: "/assets/excavator.png",
    title: "Excavator",
    desc: "Hydraulic excavators available...",
    specs: ["PC200 / PC300 / PC400", "Short & long-term hire", "With operator available"],
  },
  {
    image: "/assets/breaker.png",
    title: "Breaker",
    desc: "Rock breaker / hydraulic hammer...",
    specs: ["Fits 20T–40T excavators", "SB81 & similar models", "Ideal for road & quarry work"],
  },
  {
    image: "/assets/backhoeloader.png",
    title: "Backhoe Loader",
    desc: "Versatile backhoe loaders...",
    specs: ["JCB 3DX & similar", "4WD available", "Operator included"],
  },
  {
    image: "/assets/mixers.png",
    title: "Car Mixture (Self Loading)",
    desc: "Self-loading concrete mixers...",
    specs: ["2–4 m³ capacity", "Self-loading drum", "Road deliveries possible"],
  },
  {
    image: "/assets/grader.png",
    title: "Grader",
    desc: "Motor graders for road grading...",
    specs: ["3.7m blade", "All terrain", "GPS grading available"],
  },
  {
    image: "/assets/roller.png",
    title: "Roller",
    desc: "Compaction rollers...",
    specs: ["Vibratory & static", "8T–12T options", "Road & earthworks"],
  },
  {
    image: "/assets/tipper.png",
    title: "Tipper",
    desc: "Tipper trucks for bulk material transport...",
    specs: ["6–10 wheel tippers", "10–20 ton capacity", "All Nepal routes"],
  },
  {
    image: "/assets/tractor.png",
    title: "Tractor",
    desc: "Agricultural and construction tractors...",
    specs: ["40–75 HP options", "With or without trailer", "Farm & site work"],
  },
].map(s => (
              <div key={s.title} style={r.serviceCard} className="service-card">
               <div style={r.serviceIconWrap}>
                  <img
                    src={s.image}
                    alt={s.title}
                    style={r.serviceImage}
                 />
               </div>
                <div style={r.serviceBody}>
                  <h3 style={r.serviceTitle}>{s.title}</h3>
                  <p style={r.serviceDesc}>{s.desc}</p>
                  <ul style={r.serviceSpecs}>
                    {s.specs.map(sp => (
                      <li key={sp} style={r.specItem}>✓ {sp}</li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/9779851068337?text=${encodeURIComponent("Hi, I'd like to enquire about renting a " + s.title + ".")}`}
                    target="_blank" rel="noreferrer"
                    style={r.serviceBtn}
                  >
                    💬 Enquire Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brands ── */}
      <section style={r.section}>
        <div style={r.inner}>
          <p style={r.tag}>COMPATIBLE MACHINES</p>
          <h2 style={r.sectionTitle} className="section-title">Parts for All Major Brands</h2>
          <div style={r.brandsGrid} className="brands-grid">
            {["Komatsu","CAT","Hyundai","Sany","JCB","Kobelco","Volvo","Doosan","Hitachi","Liebherr","Case","Bobcat"].map(b=>(
              <div key={b} style={r.brandChip}>{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={r.cta}>
        <div style={r.ctaInner}>
          <h2 style={r.ctaTitle} className="cta-title">Can't find the part you need?</h2>
          <p style={r.ctaDesc}>Contact us — our team will source the exact part for your machine.</p>
          <div style={r.ctaBtns} className="cta-btns">
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" style={r.ctaBtnWa}>💬 WhatsApp Now</a>
            <a href={`tel:${PHONE}`} style={r.ctaBtnCall}>📞 {PHONE}</a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── Responsive CSS ── */
const CSS = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @media (max-width: 768px) {
    .services-grid { grid-template-columns: 1fr 1fr !important; }
    .hero-inner  { grid-template-columns: 1fr !important; gap: 32px !important; }
    .hero-title  { font-size: 36px !important; }
    .hero-stats  { grid-template-columns: 1fr 1fr !important; }
    .hero-btns   { flex-direction: column !important; }
    .hero-contacts { flex-direction: column !important; gap: 8px !important; }
    .feature-grid { grid-template-columns: 1fr 1fr !important; }
    .product-grid { grid-template-columns: 1fr 1fr !important; }
    .section-title { font-size: 26px !important; }
    .search-wrap { max-width: 100% !important; }
    .pagination  { flex-wrap: wrap !important; gap: 6px !important; }
    .page-numbers { gap: 4px !important; }
    .brands-grid { gap: 8px !important; }
    .cta-title   { font-size: 24px !important; }
    .cta-btns    { flex-direction: column !important; align-items: center !important; }
  }
  @media (max-width: 480px) {
    .hero-title  { font-size: 28px !important; }
    .feature-grid { grid-template-columns: 1fr !important; }
    .product-grid { grid-template-columns: 1fr !important; }
    .services-grid { grid-template-columns: 1fr !important; }
    .hero-stats  { grid-template-columns: 1fr 1fr !important; }
  }
`;

const r = {
  page: { fontFamily:"'Segoe UI',system-ui,sans-serif" },
  /* Hero */
  hero: { background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)", color:"#fff", padding:"80px 24px 64px" },
  heroInner: { maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:60, alignItems:"center" },
  heroLeft: {},
  badge: { display:"inline-block", background:"rgba(234,88,12,.15)", color:"#fb923c", border:"1px solid rgba(234,88,12,.3)", borderRadius:20, padding:"6px 16px", fontSize:13, fontWeight:600, marginBottom:20 },
  heroTitle: { fontSize:50, fontWeight:900, lineHeight:1.1, margin:"0 0 16px" },
  accent: { color:"#fb923c" },
  heroDesc: { fontSize:16, color:"#94a3b8", lineHeight:1.7, maxWidth:480, marginBottom:28 },
  heroBtns: { display:"flex", gap:12, flexWrap:"wrap", marginBottom:20 },
  btnOrange: { background:"linear-gradient(135deg,#ea580c,#f97316)", color:"#fff", padding:"12px 28px", borderRadius:10, fontSize:15, fontWeight:700, textDecoration:"none", display:"inline-block" },
  btnGreen: { background:"#16a34a", color:"#fff", padding:"12px 28px", borderRadius:10, fontSize:15, fontWeight:700, textDecoration:"none", display:"inline-block" },
  heroContacts: { display:"flex", gap:20, flexWrap:"wrap" },
  heroContact: { color:"#94a3b8", fontSize:13, textDecoration:"none", fontWeight:500 },
  heroStats: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 },
  statCard: { background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.1)", borderRadius:16, padding:"24px 20px", textAlign:"center" },
  statVal: { fontSize:28, fontWeight:900, color:"#fff" },
  statLabel: { fontSize:12, color:"#94a3b8", marginTop:4 },
  /* Layout */
  section: { padding:"72px 24px" },
  inner: { maxWidth:1200, margin:"0 auto" },
  tag: { fontSize:11, fontWeight:800, letterSpacing:2, color:"#ea580c", textTransform:"uppercase", marginBottom:8 },
  sectionTitle: { fontSize:34, fontWeight:800, color:"#0f172a", margin:"0 0 36px" },
  /* Features */
  featureGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20 },
  featureCard: { background:"#fff", borderRadius:14, padding:24, boxShadow:"0 2px 10px rgba(0,0,0,.06)", border:"1px solid #f1f5f9" },
  featureIcon: { fontSize:30, marginBottom:12 },
  featureTitle: { fontSize:15, fontWeight:700, color:"#0f172a", margin:"0 0 8px" },
  featureDesc: { fontSize:13, color:"#64748b", lineHeight:1.7, margin:0 },
  /* Search */
  searchWrap: { position:"relative", marginBottom:24, maxWidth:540 },
  searchInput: { width:"100%", padding:"12px 44px 12px 16px", borderRadius:10, border:"1.5px solid #e2e8f0", fontSize:14, outline:"none", boxSizing:"border-box", boxShadow:"0 2px 8px rgba(0,0,0,.06)" },
  clearBtn: { position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#94a3b8", fontSize:14 },
  /* Loading */
  loadingRow: { display:"flex", alignItems:"center", gap:12, justifyContent:"center", padding:"40px 0", color:"#64748b", fontSize:14 },
  spinner: { width:28, height:28, border:"3px solid #e2e8f0", borderTop:"3px solid #ea580c", borderRadius:"50%", flexShrink:0, animation:"spin .8s linear infinite" },
  empty: { textAlign:"center", padding:"40px 0", color:"#94a3b8", fontSize:15, lineHeight:2 },
  resultCount: { color:"#64748b", fontSize:13, marginBottom:16 },
  /* Products */
  productGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:24, marginBottom:32 },
  productCard: { background:"#fff", borderRadius:14, overflow:"hidden", boxShadow:"0 2px 10px rgba(0,0,0,.07)", border:"1px solid #f1f5f9" },
  imgWrap: { position:"relative", height:200, background:"#f8f4f0" },
  img: { width:"100%", height:"100%", objectFit:"cover" },
  imgPlaceholder: { display:"flex", alignItems:"center", justifyContent:"center", height:"100%", fontSize:52 },
  catBadge: { position:"absolute", top:10, right:10, background:"#ea580c", color:"#fff", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 },
  outBadge: { position:"absolute", top:10, left:10, background:"#ef4444", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:20 },
  cardBody: { padding:16 },
  productName: { fontSize:14, fontWeight:700, color:"#0f172a", margin:"0 0 3px", lineHeight:1.3 },
  partNo: { fontSize:11, color:"#94a3b8", margin:"0 0 4px", fontFamily:"monospace" },
  productDesc: { fontSize:12, color:"#64748b", margin:"0 0 8px", lineHeight:1.5, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" },
  cardFooter: { display:"flex", justifyContent:"space-between", alignItems:"flex-end" },
  unitTag: { display:"inline-block", background:"#fff7ed", color:"#ea580c", fontSize:10, fontWeight:600, padding:"2px 7px", borderRadius:5, marginBottom:4 },
  price: { fontSize:16, fontWeight:700, color:"#ea580c", margin:0 },
  cardBtns: { display:"flex", gap:6 },
  iconBtn: { width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:8, border:"1.5px solid #bae6fd", color:"#0369a1", textDecoration:"none", fontSize:16, background:"#f0f9ff" },
  iconBtnGreen: { background:"#dcfce7", color:"#16a34a", border:"none" },
  /* Pagination */
  pagination: { display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:12 },
  pageNumbers: { display:"flex", gap:6 },
  pageBtn: { padding:"7px 14px", borderRadius:8, border:"1.5px solid #e2e8f0", background:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", color:"#334155" },
  pageBtnActive: { background:"linear-gradient(135deg,#ea580c,#f97316)", color:"#fff", border:"1.5px solid #ea580c" },
  pageDots: { padding:"7px 6px", color:"#94a3b8", fontSize:13 },
  pageInfo: { textAlign:"center", fontSize:12, color:"#94a3b8", marginTop:4 },
  /* Services */
  serviceIntro: { fontSize:15, color:"#64748b", lineHeight:1.7, maxWidth:640, marginBottom:36, marginTop:-20 },
  servicesGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:24 },
  serviceCard: { background:"#fff", borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,.07)", border:"1px solid #f1f5f9", display:"flex", flexDirection:"column" },
  serviceIconWrap: { background:"linear-gradient(135deg,#fff7ed,#ffedd5)", padding:"24px 24px 16px", display:"flex", alignItems:"center" },
  serviceIcon: { fontSize:40 },
  serviceBody: { padding:"16px 24px 24px", display:"flex", flexDirection:"column", flex:1 },
  serviceTitle: { fontSize:17, fontWeight:800, color:"#0f172a", margin:"0 0 8px" },
  serviceDesc: { fontSize:13, color:"#64748b", lineHeight:1.7, margin:"0 0 14px", flex:1 },
  serviceSpecs: { listStyle:"none", padding:0, margin:"0 0 18px", display:"flex", flexDirection:"column", gap:5 },
  specItem: { fontSize:12, color:"#16a34a", fontWeight:600 },
  serviceBtn: { display:"inline-block", background:"linear-gradient(135deg,#ea580c,#f97316)", color:"#fff", padding:"9px 20px", borderRadius:8, fontSize:13, fontWeight:700, textDecoration:"none", textAlign:"center" },
  serviceImage: { width: "240px", height: "170px",objectFit: "contain",filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.15))",},
  /* Brands */
  brandsGrid: { display:"flex", flexWrap:"wrap", gap:12 },
  brandChip: { background:"#f8fafc", border:"1.5px solid #e2e8f0", borderRadius:10, padding:"10px 20px", fontSize:14, fontWeight:700, color:"#334155" },
  /* CTA */
  cta: { background:"linear-gradient(135deg,#ea580c,#f97316)", padding:"64px 24px", textAlign:"center" },
  ctaInner: { maxWidth:600, margin:"0 auto" },
  ctaTitle: { fontSize:30, fontWeight:800, color:"#fff", margin:"0 0 12px" },
  ctaDesc: { fontSize:15, color:"rgba(255,255,255,.9)", marginBottom:28, lineHeight:1.6 },
  ctaBtns: { display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" },
  ctaBtnWa: { background:"#fff", color:"#16a34a", padding:"12px 28px", borderRadius:10, fontSize:15, fontWeight:700, textDecoration:"none", display:"inline-block" },
  ctaBtnCall: { background:"rgba(255,255,255,.15)", color:"#fff", padding:"12px 28px", borderRadius:10, fontSize:15, fontWeight:700, textDecoration:"none", border:"1px solid rgba(255,255,255,.3)", display:"inline-block" },
};