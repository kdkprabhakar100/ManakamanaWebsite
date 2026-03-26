import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";

const PHONE    = "+977-9851068337";
const WHATSAPP = "9779851068337";
const PER_PAGE = 8;

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("All");
  const [page,     setPage]     = useState(1);

  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))].sort();

  const filtered = products.filter(p => {
    const q  = search.toLowerCase();
    const ms = p.name.toLowerCase().includes(q) ||
               (p.description || "").toLowerCase().includes(q) ||
               (p.hsCode      || "").toLowerCase().includes(q) ||
               (p.category    || "").toLowerCase().includes(q);
    const mc = category === "All" || p.category === category;
    return ms && mc;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage   = Math.min(page, totalPages);
  const paginated  = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleSearch   = v => { setSearch(v);   setPage(1); };
  const handleCategory = v => { setCategory(v); setPage(1); };

  return (
    <div style={r.page}>
      <style>{CSS}</style>

      {/* Page header */}
      <div style={r.pageHeader}>
        <div style={r.inner}>
          <p style={r.tag}>OUR CATALOGUE</p>
          <h1 style={r.title} className="page-title">All Products</h1>
          <p style={r.subtitle}>{loading ? "Loading…" : `${products.length} parts available`}</p>
        </div>
      </div>

      <div style={r.inner}>

        {/* Filters */}
        <div style={r.filterRow} className="filter-row">
          <div style={r.searchWrap}>
            <input
              style={r.searchInput}
              placeholder="🔍 Search by name, part no, machine model…"
              value={search}
              onChange={e => handleSearch(e.target.value)}
            />
            {search && <button style={r.clearBtn} onClick={() => handleSearch("")}>✕</button>}
          </div>
          <select style={r.catSelect} value={category} onChange={e => handleCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Category chips */}
        {categories.length > 1 && (
          <div style={r.chips} className="chips">
            {categories.slice(0,12).map(c => (
              <button key={c} style={{...r.chip,...(category===c?r.chipActive:{})}} onClick={() => handleCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div style={r.loadingRow}><div style={r.spinner} className="spin" /><span>Loading products…</span></div>
        ) : filtered.length === 0 ? (
          <div style={r.empty}>
            <div style={{fontSize:52,marginBottom:12}}>🔍</div>
            <p>No products found{search ? ` for "${search}"` : ""}.</p>
            <button style={{...r.btnOrange,marginTop:16,border:"none",cursor:"pointer"}} onClick={()=>{handleSearch(""); handleCategory("All");}}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <p style={r.resultInfo}>
              Showing {(safePage-1)*PER_PAGE+1}–{Math.min(safePage*PER_PAGE,filtered.length)} of {filtered.length} products
              {category!=="All" && ` in "${category}"`}
            </p>

            <div style={r.productGrid} className="product-grid">
              {paginated.map(p => (
                <div key={p.id} style={r.card} className="product-card">
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
                    {p.unit && <span style={r.unitTag}>📦 per {p.unit}</span>}
                    <div style={r.cardFooter}>
                      <p style={r.price}>{p.price ? `Rs ${Number(p.price).toLocaleString("en-IN")}` : "Call for Price"}</p>
                      <div style={r.cardBtns}>
                        <a href={`tel:${PHONE}`} style={r.iconBtn} title="Call">📞</a>
                        <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi, I need: ${p.name}${p.hsCode?" (Part: "+p.hsCode+")":""}`)}`}
                          target="_blank" rel="noreferrer" style={{...r.iconBtn,...r.iconGreen}} title="WhatsApp">💬</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={r.pagination} className="pagination">
                <button style={{...r.pageBtn,opacity:safePage===1?.4:1}} onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={safePage===1}>← Prev</button>
                <div style={r.pageNumbers} className="page-numbers">
                  {Array.from({length:totalPages},(_,i)=>i+1)
                    .filter(n=>n===1||n===totalPages||Math.abs(n-safePage)<=1)
                    .reduce((acc,n,i,arr)=>{if(i>0&&n-arr[i-1]>1)acc.push("…");acc.push(n);return acc;},[])
                    .map((n,i)=>n==="…"
                      ? <span key={i} style={r.dots}>…</span>
                      : <button key={n} style={{...r.pageBtn,...(n===safePage?r.pageBtnActive:{})}} onClick={()=>setPage(n)}>{n}</button>
                    )}
                </div>
                <button style={{...r.pageBtn,opacity:safePage===totalPages?.4:1}} onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={safePage===totalPages}>Next →</button>
              </div>
            )}
          </>
        )}

        {/* Contact strip */}
        <div style={r.contactStrip} className="contact-strip">
          <div style={r.stripText}>
            <strong>Can't find what you need?</strong> We source parts for all models.
          </div>
          <div style={r.stripBtns} className="strip-btns">
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" style={r.btnGreen}>💬 WhatsApp</a>
            <a href={`tel:${PHONE}`} style={r.btnOrange}>📞 Call Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const CSS = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @media (max-width: 768px) {
    .page-title   { font-size: 28px !important; }
    .filter-row   { flex-direction: column !important; }
    .product-grid { grid-template-columns: 1fr 1fr !important; }
    .chips        { gap: 6px !important; }
    .pagination   { flex-wrap: wrap !important; gap: 6px !important; }
    .page-numbers { gap: 4px !important; }
    .contact-strip { flex-direction: column !important; gap: 12px !important; text-align: center !important; }
    .strip-btns   { justify-content: center !important; }
  }
  @media (max-width: 480px) {
    .product-grid { grid-template-columns: 1fr !important; }
  }
`;

const r = {
  page: { fontFamily:"'Segoe UI',system-ui,sans-serif", background:"#f8fafc", minHeight:"100vh" },
  pageHeader: { background:"linear-gradient(135deg,#0f172a,#1e3a5f)", color:"#fff", padding:"48px 24px 40px" },
  inner: { maxWidth:1200, margin:"0 auto", padding:"0 24px" },
  tag: { fontSize:11, fontWeight:800, letterSpacing:2, color:"#fb923c", textTransform:"uppercase", marginBottom:8 },
  title: { fontSize:36, fontWeight:800, color:"#fff", margin:"0 0 8px" },
  subtitle: { fontSize:15, color:"#94a3b8" },
  filterRow: { display:"flex", gap:12, margin:"28px 0 16px", alignItems:"center" },
  searchWrap: { position:"relative", flex:1 },
  searchInput: { width:"100%", padding:"11px 40px 11px 16px", borderRadius:10, border:"1.5px solid #e2e8f0", fontSize:14, outline:"none", boxSizing:"border-box", background:"#fff", boxShadow:"0 1px 4px rgba(0,0,0,.06)" },
  clearBtn: { position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:"#94a3b8", fontSize:14 },
  catSelect: { padding:"11px 14px", borderRadius:10, border:"1.5px solid #e2e8f0", fontSize:13, fontWeight:600, background:"#fff", color:"#0f172a", cursor:"pointer", flexShrink:0 },
  chips: { display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 },
  chip: { padding:"6px 14px", borderRadius:20, border:"1.5px solid #e2e8f0", background:"#fff", fontSize:13, fontWeight:500, cursor:"pointer", color:"#475569" },
  chipActive: { background:"linear-gradient(135deg,#ea580c,#f97316)", color:"#fff", border:"1.5px solid #ea580c" },
  loadingRow: { display:"flex", alignItems:"center", gap:12, justifyContent:"center", padding:"60px 0", color:"#64748b", fontSize:14 },
  spinner: { width:28, height:28, border:"3px solid #e2e8f0", borderTop:"3px solid #ea580c", borderRadius:"50%", animation:"spin .8s linear infinite" },
  empty: { textAlign:"center", padding:"60px 0", color:"#94a3b8", fontSize:15, lineHeight:2 },
  resultInfo: { fontSize:13, color:"#64748b", marginBottom:20 },
  productGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:24, marginBottom:32 },
  card: { background:"#fff", borderRadius:14, overflow:"hidden", boxShadow:"0 2px 10px rgba(0,0,0,.07)", border:"1px solid #f1f5f9" },
  imgWrap: { position:"relative", height:200, background:"#f8f4f0" },
  img: { width:"100%", height:"100%", objectFit:"cover" },
  imgPlaceholder: { display:"flex", alignItems:"center", justifyContent:"center", height:"100%", fontSize:52 },
  catBadge: { position:"absolute", top:10, right:10, background:"#ea580c", color:"#fff", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20 },
  outBadge: { position:"absolute", top:10, left:10, background:"#ef4444", color:"#fff", fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:20 },
  cardBody: { padding:16 },
  productName: { fontSize:14, fontWeight:700, color:"#0f172a", margin:"0 0 3px", lineHeight:1.3 },
  partNo: { fontSize:11, color:"#94a3b8", margin:"0 0 4px", fontFamily:"monospace" },
  productDesc: { fontSize:12, color:"#64748b", margin:"0 0 6px", lineHeight:1.5, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" },
  unitTag: { display:"inline-block", background:"#fff7ed", color:"#ea580c", fontSize:10, fontWeight:600, padding:"2px 7px", borderRadius:5, marginBottom:8 },
  cardFooter: { display:"flex", justifyContent:"space-between", alignItems:"center" },
  price: { fontSize:16, fontWeight:700, color:"#ea580c", margin:0 },
  cardBtns: { display:"flex", gap:6 },
  iconBtn: { width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", borderRadius:8, border:"1.5px solid #bae6fd", color:"#0369a1", textDecoration:"none", fontSize:16, background:"#f0f9ff" },
  iconGreen: { background:"#dcfce7", color:"#16a34a", border:"none" },
  pagination: { display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:16 },
  pageNumbers: { display:"flex", gap:6 },
  pageBtn: { padding:"8px 14px", borderRadius:8, border:"1.5px solid #e2e8f0", background:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", color:"#334155" },
  pageBtnActive: { background:"linear-gradient(135deg,#ea580c,#f97316)", color:"#fff", border:"1.5px solid #ea580c" },
  dots: { padding:"8px 6px", color:"#94a3b8", fontSize:13 },
  contactStrip: { background:"linear-gradient(135deg,#0f172a,#1e3a5f)", borderRadius:16, padding:"24px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:20, margin:"32px 0 48px", color:"#fff" },
  stripText: { fontSize:15, color:"#e2e8f0" },
  stripBtns: { display:"flex", gap:10, flexShrink:0 },
  btnOrange: { background:"linear-gradient(135deg,#ea580c,#f97316)", color:"#fff", padding:"10px 22px", borderRadius:9, fontSize:14, fontWeight:700, textDecoration:"none", display:"inline-block" },
  btnGreen: { background:"#16a34a", color:"#fff", padding:"10px 22px", borderRadius:9, fontSize:14, fontWeight:700, textDecoration:"none", display:"inline-block" },
};
