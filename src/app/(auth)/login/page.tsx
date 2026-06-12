"use client";

import React, { useState } from "react";
import Link from "next/link";

// ─── Icons ────────────────────────────────────────────────────────────────────
const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const EyeOpenIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ─── Validation ────────────────────────────────────────────────────────────────
function validateIdentifier(v: string) {
  if (!v.trim()) return "Bu alan zorunludur";
  const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const tckn  = /^\d{11}$/;
  if (!email.test(v.trim()) && !tckn.test(v.trim())) return "Geçerli e-posta veya 11 haneli TCKN giriniz";
  return null;
}
function validatePassword(v: string) {
  if (!v) return "Bu alan zorunludur";
  if (v.length < 6) return "En az 6 karakter olmalıdır";
  return null;
}

// ─── Field Component ───────────────────────────────────────────────────────────
function Field({
  id, label, icon, error, touched, rightEl, children,
}: {
  id: string; label: string; icon?: React.ReactNode;
  error?: string | null; touched?: boolean;
  rightEl?: React.ReactNode; children: React.ReactNode;
}) {
  const showErr = touched && error;
  return (
    <div>
      <label htmlFor={id} style={{ display:"block", marginBottom:6, fontSize:13, fontWeight:500, color: showErr ? "var(--color-status-error)" : "var(--color-text-primary)" }}>
        {label}
      </label>
      <div style={{ position:"relative" }}>
        {icon && (
          <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color: showErr ? "var(--color-status-error)" : "var(--color-text-tertiary)", pointerEvents:"none", display:"flex" }}>
            {icon}
          </span>
        )}
        {React.cloneElement(children as React.ReactElement, {
          style: {
            width:"100%", height:44, padding: icon ? "0 14px 0 40px" : "0 14px",
            border: `1.5px solid ${showErr ? "var(--color-status-error)" : "var(--color-border)"}`,
            borderRadius:10, fontSize:14, outline:"none", background:"#fff",
            color:"var(--color-text-primary)", transition:"border-color .15s, box-shadow .15s",
            ...(rightEl ? { paddingRight: 44 } : {}),
            ...(children as React.ReactElement).props.style,
          }
        })}
        {rightEl && (
          <div style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)" }}>
            {rightEl}
          </div>
        )}
      </div>
      {showErr && (
        <p style={{ marginTop:4, fontSize:12, color:"var(--color-status-error)" }}>{error}</p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password,   setPassword]   = useState("");
  const [showPw,     setShowPw]     = useState(false);
  const [errors,     setErrors]     = useState<Record<string,string|null>>({});
  const [touched,    setTouched]    = useState<Record<string,boolean>>({});

  function blur(field: string) {
    setTouched(p => ({ ...p, [field]: true }));
    if (field === "identifier") setErrors(p => ({ ...p, identifier: validateIdentifier(identifier) }));
    else setErrors(p => ({ ...p, password: validatePassword(password) }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const idErr = validateIdentifier(identifier);
    const pwErr = validatePassword(password);
    setErrors({ identifier: idErr, password: pwErr });
    setTouched({ identifier: true, password: true });
    if (!idErr && !pwErr) alert("Form geçerli — backend entegrasyonu yakında!");
  }

  const features = [
    "Poliçe ve başvurularınızı anlık takip edin",
    "Ödeme hatırlatmalarını kaçırmayın",
    "Güvenli ve şifreli bağlantı",
  ];

  return (
    <div style={{ display:"flex", height:"100vh", overflow:"hidden", fontFamily:"Inter, sans-serif" }}>

      {/* ── SOL PANEL ── */}
      <div style={{
        width:"48%", position:"relative", overflow:"hidden", flexShrink:0,
        background:"linear-gradient(145deg,#0d2137 0%,#1A3A5C 55%,#1e4a76 100%)",
        display:"flex", flexDirection:"column",
      }} className="hidden lg:flex">

        {/* Dekor daireler */}
        {[
          { w:380, h:380, top:-100, right:-100, op:0.06 },
          { w:260, h:260, bottom:60, left:-80, op:0.08 },
          { w:120, h:120, top:"40%", left:"60%", op:0.05 },
        ].map((c,i) => (
          <div key={i} style={{
            position:"absolute", width:c.w, height:c.h,
            top:c.top, bottom:c.bottom, left:c.left, right:c.right,
            borderRadius:"50%", background:"#4A90E2", opacity:c.op,
          }} />
        ))}
        {/* Grid desen */}
        <div style={{
          position:"absolute", inset:0, opacity:0.03,
          backgroundImage:"linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)",
          backgroundSize:"40px 40px",
        }} />

        {/* Logo */}
        <div style={{ padding:"36px 44px", display:"flex", alignItems:"center", gap:12, zIndex:1 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:"rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:20, height:20, color:"#fff" }}><ShieldCheckIcon /></div>
          </div>
          <span style={{ color:"#fff", fontWeight:700, fontSize:17, letterSpacing:"-0.01em" }}>Alkan Sigorta</span>
        </div>

        {/* Ana içerik */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"0 44px 40px" }}>
          <div style={{ width:56, height:56, color:"rgba(255,255,255,0.85)", marginBottom:28 }}>
            <ShieldCheckIcon />
          </div>
          <h2 style={{ color:"#fff", fontSize:34, fontWeight:800, lineHeight:1.2, letterSpacing:"-0.03em", marginBottom:16 }}>
            Güvenle yönetin,<br />huzurla yaşayın.
          </h2>
          <p style={{ color:"rgba(255,255,255,0.60)", fontSize:15, lineHeight:1.65, marginBottom:36 }}>
            Sigorta poliçelerinizi ve başvurularınızı tek platformdan kolayca yönetin.
          </p>
          <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:12 }}>
            {features.map(f => (
              <li key={f} style={{ display:"flex", alignItems:"center", gap:10, color:"rgba(255,255,255,0.80)", fontSize:14 }}>
                <span style={{ width:22, height:22, borderRadius:"50%", background:"rgba(74,144,226,0.35)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"#7CB3F0" }}>
                  <CheckIcon />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* İstatistikler */}
        <div style={{ padding:"24px 44px", borderTop:"1px solid rgba(255,255,255,0.10)", display:"flex", gap:36 }}>
          {[["12K+","Aktif Poliçe"],["50K+","Müşteri"],["25+","Yıllık Deneyim"]].map(([v,l]) => (
            <div key={l}>
              <p style={{ color:"#fff", fontWeight:700, fontSize:20, lineHeight:1 }}>{v}</p>
              <p style={{ color:"rgba(255,255,255,0.50)", fontSize:12, marginTop:4 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SAĞ PANEL ── */}
      <div style={{
        flex:1, display:"flex", alignItems:"center", justifyContent:"center",
        background:"#F5F7FA", overflowY:"auto", padding:"40px 24px",
      }}>
        <div style={{ width:"100%", maxWidth:420 }}>

          {/* Mobil logo */}
          <div className="flex lg:hidden justify-center mb-8">
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:34, height:34, borderRadius:9, background:"var(--color-primary)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:18, height:18, color:"#fff" }}><ShieldCheckIcon /></div>
              </div>
              <span style={{ fontWeight:700, fontSize:16, color:"var(--color-primary)" }}>Alkan Sigorta</span>
            </div>
          </div>

          {/* Kart */}
          <div style={{
            background:"#fff", borderRadius:20, padding:"40px 36px",
            boxShadow:"0 4px 24px rgba(26,58,92,0.10)",
            border:"1px solid rgba(0,0,0,0.05)",
          }}>
            {/* Başlık */}
            <div style={{ marginBottom:28 }}>
              <h1 style={{ fontSize:26, fontWeight:800, color:"var(--color-primary)", letterSpacing:"-0.03em", marginBottom:6 }}>
                Giriş Yap
              </h1>
              <p style={{ fontSize:14, color:"var(--color-text-secondary)", lineHeight:1.5 }}>
                Hesabınıza erişmek için bilgilerinizi girin
              </p>
            </div>

            <form onSubmit={submit} noValidate style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <Field id="login-id" label="E-posta veya TCKN" icon={<UserIcon />}
                error={errors.identifier} touched={touched.identifier}>
                <input
                  id="login-id" type="text" placeholder="ornek@email.com veya 12345678901"
                  value={identifier} onChange={e => setIdentifier(e.target.value)}
                  onBlur={() => blur("identifier")} autoComplete="username"
                />
              </Field>

              <Field id="login-pw" label="Şifre" icon={<LockIcon />}
                error={errors.password} touched={touched.password}
                rightEl={
                  <button type="button" onClick={() => setShowPw(v => !v)}
                    style={{ background:"none", border:"none", cursor:"pointer", color:"var(--color-text-tertiary)", display:"flex" }}
                    aria-label={showPw ? "Gizle" : "Göster"}>
                    {showPw ? <EyeOffIcon /> : <EyeOpenIcon />}
                  </button>
                }>
                <input
                  id="login-pw" type={showPw ? "text" : "password"} placeholder="En az 6 karakter"
                  value={password} onChange={e => setPassword(e.target.value)}
                  onBlur={() => blur("password")} autoComplete="current-password"
                />
              </Field>

              <button id="login-submit" type="submit" style={{
                marginTop:6, width:"100%", height:48,
                background:"linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
                color:"#fff", border:"none", borderRadius:12, fontSize:15, fontWeight:700,
                cursor:"pointer", boxShadow:"0 4px 14px rgba(26,58,92,0.30)",
                transition:"transform .15s, box-shadow .15s", letterSpacing:"-0.01em",
              }}
                onMouseEnter={e => { (e.target as HTMLElement).style.transform="translateY(-1px)"; (e.target as HTMLElement).style.boxShadow="0 6px 20px rgba(26,58,92,0.40)"; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.transform="translateY(0)"; (e.target as HTMLElement).style.boxShadow="0 4px 14px rgba(26,58,92,0.30)"; }}
              >
                Giriş Yap
              </button>
            </form>

            <p style={{ marginTop:24, textAlign:"center", fontSize:14, color:"var(--color-text-secondary)" }}>
              Hesabınız yok mu?{" "}
              <Link href="/register" style={{ color:"var(--color-secondary)", fontWeight:700, textDecoration:"none" }}>
                Kayıt Ol
              </Link>
            </p>
          </div>

          {/* Alt bilgi */}
          <p style={{ marginTop:20, textAlign:"center", fontSize:12, color:"var(--color-text-tertiary)" }}>
            © 2026 Alkan Sigorta. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </div>
  );
}
