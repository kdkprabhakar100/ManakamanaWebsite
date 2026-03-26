import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const HomePage     = lazy(() => import("./pages/public/HomePage"));
const ProductsPage = lazy(() => import("./pages/public/ProductsPage"));
const AboutPage    = lazy(() => import("./pages/public/AboutPage"));
const ContactPage  = lazy(() => import("./pages/public/ContactPage"));

function Layout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
      <Navbar />
      <main style={{ flex:1, paddingTop: isHome ? 0 : 75 }}>{children}</main>
      <Footer />
    </div>
  );
}

function PageLoader() {
  return (
    <div style={{ minHeight:"60vh", display:"grid", placeItems:"center", fontFamily:"'Inter',system-ui,sans-serif" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ width:40, height:40, border:"3px solid #f5f5f5", borderTop:"3px solid #ea580c", borderRadius:"50%", animation:"spin 0.8s linear infinite", margin:"0 auto 16px" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{ color:"#737373", fontWeight:500, fontSize:14 }}>Loading…</div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<Layout><PageLoader /></Layout>}>
        <Routes>
          <Route path="/"         element={<Layout><HomePage /></Layout>} />
          <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
          <Route path="/about"    element={<Layout><AboutPage /></Layout>} />
          <Route path="/contact"  element={<Layout><ContactPage /></Layout>} />
          <Route path="*" element={
            <Layout>
              <div style={{ textAlign:"center", padding:"80px 24px", fontFamily:"'Segoe UI',sans-serif" }}>
                <div style={{ fontSize:64 }}>🔩</div>
                <h1 style={{ fontSize:32, color:"#0f172a", margin:"16px 0 8px" }}>Page Not Found</h1>
                <p style={{ color:"#64748b", marginBottom:24 }}>The page you're looking for doesn't exist.</p>
                <Link to="/" style={{ background:"#ea580c", color:"#fff", padding:"12px 28px", borderRadius:10, textDecoration:"none", fontWeight:700, display:"inline-block" }}>
                  Go Home
                </Link>
              </div>
            </Layout>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}
