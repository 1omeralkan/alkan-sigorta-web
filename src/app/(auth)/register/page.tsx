"use client";

import React, { useState } from "react";
import Link from "next/link";

// ─── Icons ────────────────────────────────────────────────────────────────────
const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);
const Icon = ({ d, w=16 }: { d: string; w?: number }) => (
  <svg width={w} height={w} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d}/>
  </svg>
);

const icons = {
  user:     "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3 a4 4 0 1 0 0 8 4 4 0 0 0 0-8",
  lock:     "M3 11h18v11H3z M7 11V7a5 5 0 0 1 10 0v4",
  email:    "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22,6 12,13 2,6",
  card:     "M1 4h22v16H1z M1 10h22",
  calendar: "M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18",
  location: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7 a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  phone:    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.77 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
  home:     "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  globe:    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  eyeOn:    "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9 a3 3 0 1 0 0 6 3 3 0 0 0 0-6",
  eyeOff:   "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24 M1 1l22 22",
  arrowL:   "M19 12H5 M12 19l-7-7 7-7",
  check:    "M20 6L9 17l-5-5",
};

// ─── Validators ───────────────────────────────────────────────────────────────
const validators: Record<string, (v: string) => string | null> = {
  ad:          v => !v.trim() ? "Ad zorunludur" : v.trim().length < 2 ? "En az 2 karakter" : null,
  soyad:       v => !v.trim() ? "Soyad zorunludur" : v.trim().length < 2 ? "En az 2 karakter" : null,
  tcNo:        v => !v.trim() ? "TC zorunludur" : v.trim().length !== 11 ? "11 haneli olmalıdır" : !/^\d{11}$/.test(v) ? "Sadece rakam" : null,
  email:       v => !v.trim() ? "E-posta zorunludur" : !/^[^@]+@[^@]+\.[^@]{2,}$/.test(v.trim()) ? "Geçerli e-posta giriniz" : null,
  password:    v => !v ? "Şifre zorunludur" : v.length < 6 ? "En az 6 karakter" : null,
  dogumTarihi: v => !v ? "Doğum tarihi zorunludur" : null,
  dogumYeri:   v => v.trim() && v.trim().length < 2 ? "En az 2 karakter" : null,
  phoneNumber: v => !v.trim() ? "Telefon zorunludur" : v.trim().length !== 10 ? "10 haneli olmalıdır" : !v.trim().startsWith("5") ? "5 ile başlamalıdır" : null,
  openAddress: v => v.trim().length > 250 ? "En fazla 250 karakter" : null,
};

type FormData = {
  ad: string; soyad: string; tcNo: string; email: string; password: string;
  dogumTarihi: string; dogumYeri: string; phoneCountry: string; phoneNumber: string;
  addressCountry: string; addressCity: string; openAddress: string;
};

// ─── Styled Input ─────────────────────────────────────────────────────────────
function SInput({
  id, label, required, icon, rightEl, error, touched, hint,
  type = "text", ...rest
}: {
  id: string; label: string; required?: boolean; icon?: string;
  rightEl?: React.ReactNode; error?: string | null; touched?: boolean;
  hint?: string; type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  const hasErr = touched && !!error;
  const borderColor = hasErr ? "#D32F2F" : focused ? "#1A3A5C" : "#E5E7EB";
  const shadow = focused ? (hasErr ? "0 0 0 3px rgba(211,47,47,0.12)" : "0 0 0 3px rgba(26,58,92,0.10)") : "none";

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
      <label htmlFor={id} style={{ fontSize:12.5, fontWeight:600, color: hasErr ? "#D32F2F" : "#374151", letterSpacing:"0.02em" }}>
        {label}{required && <span style={{ color:"#D32F2F", marginLeft:2 }}>*</span>}
      </label>
      <div style={{ position:"relative" }}>
        {icon && (
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color: hasErr ? "#D32F2F" : focused ? "#1A3A5C" : "#9CA3AF", pointerEvents:"none", display:"flex", transition:"color .15s" }}>
            <Icon d={icon} />
          </span>
        )}
        <input id={id} type={type} {...rest}
          onFocus={e => { setFocused(true); rest.onFocus?.(e); }}
          onBlur={e => { setFocused(false); rest.onBlur?.(e); }}
          style={{
            width:"100%", height:42,
            padding: `0 ${rightEl ? 40 : 12}px 0 ${icon ? 38 : 12}px`,
            border: `1.5px solid ${borderColor}`,
            borderRadius:10, fontSize:13.5, outline:"none",
            background:"#fff", color:"#111827",
            boxShadow: shadow, transition:"border-color .15s, box-shadow .15s",
          }}
        />
        {rightEl && (
          <div style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)" }}>{rightEl}</div>
        )}
      </div>
      {hasErr && <p style={{ fontSize:11.5, color:"#D32F2F", marginTop:2 }}>{error}</p>}
      {hint && !hasErr && <p style={{ fontSize:11.5, color:"#9CA3AF" }}>{hint}</p>}
    </div>
  );
}

// ─── Styled Select ────────────────────────────────────────────────────────────
function SSelect({
  id, label, required, icon, error, touched, options, placeholder, ...rest
}: {
  id: string; label: string; required?: boolean; icon?: string;
  error?: string | null; touched?: boolean;
  options: { value: string; label: string }[]; placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  const hasErr = touched && !!error;
  const borderColor = hasErr ? "#D32F2F" : focused ? "#1A3A5C" : "#E5E7EB";
  const shadow = focused ? (hasErr ? "0 0 0 3px rgba(211,47,47,0.12)" : "0 0 0 3px rgba(26,58,92,0.10)") : "none";
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
      <label htmlFor={id} style={{ fontSize:12.5, fontWeight:600, color: hasErr ? "#D32F2F" : "#374151", letterSpacing:"0.02em" }}>
        {label}{required && <span style={{ color:"#D32F2F", marginLeft:2 }}>*</span>}
      </label>
      <div style={{ position:"relative" }}>
        {icon && (
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color: focused ? "#1A3A5C" : "#9CA3AF", pointerEvents:"none", display:"flex", zIndex:1 }}>
            <Icon d={icon} />
          </span>
        )}
        <select id={id} {...rest}
          onFocus={e => { setFocused(true); (rest.onFocus as any)?.(e); }}
          onBlur={e => { setFocused(false); (rest.onBlur as any)?.(e); }}
          style={{
            width:"100%", height:42,
            padding: `0 36px 0 ${icon ? 38 : 12}px`,
            border: `1.5px solid ${borderColor}`,
            borderRadius:10, fontSize:13.5, outline:"none",
            background:"#fff", color: rest.value ? "#111827" : "#9CA3AF",
            boxShadow: shadow, transition:"border-color .15s, box-shadow .15s",
            appearance:"none", cursor:"pointer",
          }}>
          <option value="">{placeholder ?? "Seçiniz..."}</option>
          {options.map(o => <option key={o.value} value={o.value} style={{ color:"#111827" }}>{o.label}</option>)}
        </select>
        <span style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", color:"#9CA3AF" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </div>
      {hasErr && <p style={{ fontSize:11.5, color:"#D32F2F" }}>{error}</p>}
    </div>
  );
}

// ─── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ icon, children }: { icon: string; children: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16, paddingBottom:10, borderBottom:"1px solid #F3F4F6" }}>
      <span style={{ display:"flex", alignItems:"center", justifyContent:"center", width:28, height:28, borderRadius:8, background:"rgba(26,58,92,0.08)", color:"#1A3A5C" }}>
        <Icon d={icon} w={14} />
      </span>
      <span style={{ fontSize:11.5, fontWeight:700, color:"#6B7280", letterSpacing:"0.08em", textTransform:"uppercase" }}>{children}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors,  setErrors]  = useState<Record<string, string | null>>({});
  const [form, setForm] = useState<FormData>({
    ad:"", soyad:"", tcNo:"", email:"", password:"",
    dogumTarihi:"", dogumYeri:"", phoneCountry:"TR",
    phoneNumber:"", addressCountry:"", addressCity:"", openAddress:"",
  });

  function set(field: keyof FormData, value: string) {
    setForm(p => ({ ...p, [field]: value }));
    if (touched[field] && validators[field]) {
      setErrors(p => ({ ...p, [field]: validators[field](value) }));
    }
  }

  function blur(field: string) {
    setTouched(p => ({ ...p, [field]: true }));
    if (validators[field]) setErrors(p => ({ ...p, [field]: validators[field](form[field as keyof FormData] ?? "") }));
  }

  function handleTcNo(e: React.ChangeEvent<HTMLInputElement>) { set("tcNo", e.target.value.replace(/\D/g,"").slice(0,11)); }
  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) { set("phoneNumber", e.target.value.replace(/\D/g,"").slice(0,10)); }

  const cityOptions: Record<string,{value:string;label:string}[]> = {
    TR: [{value:"IST",label:"İstanbul"},{value:"ANK",label:"Ankara"},{value:"IZM",label:"İzmir"},{value:"BRS",label:"Bursa"},{value:"ANT",label:"Antalya"}],
    DE: [{value:"BER",label:"Berlin"},{value:"MUN",label:"Münih"}],
    GB: [{value:"LON",label:"Londra"},{value:"MAN",label:"Manchester"}],
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const requiredFields = ["ad","soyad","tcNo","email","password","dogumTarihi","phoneNumber"];
    const allTouched = Object.keys(validators).reduce((a,k) => ({ ...a, [k]: true }), {});
    setTouched(allTouched);
    const newErrors: Record<string, string | null> = {};
    Object.entries(validators).forEach(([f, v]) => { const e = v(form[f as keyof FormData] ?? ""); if (e) newErrors[f] = e; });
    setErrors(newErrors);
    if (Object.keys(newErrors).filter(k => requiredFields.includes(k) && newErrors[k]).length === 0) {
      alert("Form geçerli — backend entegrasyonu yakında!");
    }
  }

  // Ortak input props
  const ip = (field: keyof FormData) => ({
    value: form[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(field, e.target.value),
    onBlur: () => blur(field),
    error: errors[field],
    touched: touched[field],
  });

  const sp = (field: keyof FormData) => ({
    value: form[field],
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => set(field, e.target.value),
    error: errors[field],
    touched: touched[field],
  });

  return (
    <div style={{ minHeight:"100vh", background:"#F5F7FA", fontFamily:"Inter, sans-serif" }}>

      {/* ── HEADER ── */}
      <header style={{
        position:"sticky", top:0, zIndex:50, height:56,
        background:"#fff", borderBottom:"1px solid #E5E7EB",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 24px", boxShadow:"0 1px 8px rgba(0,0,0,0.06)",
      }}>
        <Link href="/login" style={{
          display:"flex", alignItems:"center", gap:8, textDecoration:"none",
          color:"#6B7280", fontSize:13, fontWeight:500,
        }}>
          <Icon d={icons.arrowL} w={18} />
          <span className="hidden sm:inline">Giriş Yap</span>
        </Link>

        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:30, height:30, borderRadius:9, background:"#1A3A5C", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:16, height:16, color:"#fff" }}><ShieldCheckIcon /></div>
          </div>
          <span style={{ fontWeight:700, fontSize:15, color:"#1A3A5C" }}>Alkan Sigorta</span>
        </div>

        <p style={{ fontSize:13, color:"#6B7280" }} className="hidden sm:block">
          Hesabınız var mı?{" "}
          <Link href="/login" style={{ color:"#4A90E2", fontWeight:700, textDecoration:"none" }}>Giriş Yap</Link>
        </p>
      </header>

      {/* ── CONTENT ── */}
      <div style={{ display:"flex", minHeight:"calc(100vh - 56px)" }}>

        {/* ── SOL: İKİ KOLONLU FORM ── */}
        <div style={{ flex:1, padding:"32px 24px 48px", display:"flex", justifyContent:"center" }}>
          <div style={{ width:"100%", maxWidth:880 }}>

            {/* Sayfa başlığı */}
            <div style={{ textAlign:"center", marginBottom:28 }}>
              <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:52, height:52, borderRadius:16, background:"rgba(26,58,92,0.09)", color:"#1A3A5C", marginBottom:14 }}>
                <div style={{ width:28, height:28 }}><ShieldCheckIcon /></div>
              </div>
              <h1 style={{ fontSize:28, fontWeight:800, color:"#1A3A5C", letterSpacing:"-0.03em", margin:"0 0 6px" }}>Yeni Hesap Oluştur</h1>
              <p style={{ fontSize:14, color:"#6B7280" }}>Tüm alanları eksiksiz doldurun</p>
            </div>

            {/* Form kartı */}
            <form onSubmit={submit} noValidate>
              <div style={{
                background:"#fff", borderRadius:20, border:"1px solid #E5E7EB",
                boxShadow:"0 2px 16px rgba(26,58,92,0.07)", overflow:"hidden",
              }}>

                {/* ── 1. KİŞİSEL BİLGİLER ── */}
                <div style={{ padding:"28px 32px", borderBottom:"1px solid #F3F4F6" }}>
                  <SectionLabel icon={icons.user}>Kişisel Bilgiler</SectionLabel>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <SInput id="r-ad" label="Ad" required icon={icons.user} placeholder="Ahmet" {...ip("ad")} />
                    <SInput id="r-soyad" label="Soyad" required icon={icons.user} placeholder="Yılmaz" {...ip("soyad")} />
                    <SInput id="r-tc" label="TC Kimlik No" required icon={icons.card} placeholder="12345678901"
                      value={form.tcNo} onChange={handleTcNo} onBlur={() => blur("tcNo")}
                      error={errors.tcNo} touched={touched.tcNo}
                      hint="11 haneli TC numaranız" inputMode="numeric" maxLength={11} />
                    <SInput id="r-dogum-yeri" label="Doğum Yeri" icon={icons.location} placeholder="İstanbul" {...ip("dogumYeri")} />
                    <div style={{ gridColumn:"1 / -1" }}>
                      <SInput id="r-dogum-tarihi" label="Doğum Tarihi" required icon={icons.calendar}
                        type="date" max={new Date(Date.now() - 18*365.25*86400000).toISOString().split("T")[0]}
                        value={form.dogumTarihi} onChange={e => set("dogumTarihi", e.target.value)}
                        onBlur={() => blur("dogumTarihi")} error={errors.dogumTarihi} touched={touched.dogumTarihi} />
                    </div>
                  </div>
                </div>

                {/* ── 2. HESAP BİLGİLERİ ── */}
                <div style={{ padding:"28px 32px", borderBottom:"1px solid #F3F4F6" }}>
                  <SectionLabel icon={icons.lock}>Hesap Bilgileri</SectionLabel>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <SInput id="r-email" label="E-posta" required icon={icons.email}
                      type="email" placeholder="ornek@email.com" autoComplete="email" {...ip("email")} />
                    <SInput id="r-pw" label="Şifre" required icon={icons.lock}
                      type={showPw ? "text" : "password"} placeholder="En az 6 karakter"
                      autoComplete="new-password"
                      rightEl={
                        <button type="button" onClick={() => setShowPw(v => !v)}
                          style={{ background:"none", border:"none", cursor:"pointer", color:"#9CA3AF", display:"flex", padding:4 }}>
                          <Icon d={showPw ? icons.eyeOff : icons.eyeOn} />
                        </button>
                      }
                      value={form.password} onChange={e => set("password", e.target.value)}
                      onBlur={() => blur("password")} error={errors.password} touched={touched.password}
                      hint="En az 6 karakter" />
                  </div>
                </div>

                {/* ── 3. İLETİŞİM BİLGİLERİ ── */}
                <div style={{ padding:"28px 32px", borderBottom:"1px solid #F3F4F6" }}>
                  <SectionLabel icon={icons.phone}>İletişim Bilgileri</SectionLabel>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <SSelect id="r-phone-country" label="Ülke Kodu" icon={icons.globe}
                      options={[{value:"TR",label:"🇹🇷 Türkiye (+90)"},{value:"DE",label:"🇩🇪 Almanya (+49)"},{value:"GB",label:"🇬🇧 İngiltere (+44)"},{value:"US",label:"🇺🇸 ABD (+1)"}]}
                      placeholder="Ülke seçiniz" {...sp("phoneCountry")}
                      onChange={e => set("phoneCountry", e.target.value)} />
                    <SInput id="r-phone" label="Telefon Numarası" required icon={icons.phone}
                      placeholder="5XXXXXXXXX" inputMode="numeric" maxLength={10}
                      hint="5 ile başlayan 10 haneli"
                      value={form.phoneNumber} onChange={handlePhone}
                      onBlur={() => blur("phoneNumber")} error={errors.phoneNumber} touched={touched.phoneNumber} />
                  </div>
                </div>

                {/* ── 4. ADRES BİLGİLERİ ── */}
                <div style={{ padding:"28px 32px" }}>
                  <SectionLabel icon={icons.home}>Adres Bilgileri</SectionLabel>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <SSelect id="r-addr-country" label="Adres Ülkesi" icon={icons.globe}
                      options={[{value:"TR",label:"Türkiye"},{value:"DE",label:"Almanya"},{value:"GB",label:"İngiltere"},{value:"US",label:"ABD"}]}
                      placeholder="Ülke seçiniz" {...sp("addressCountry")}
                      onChange={e => { set("addressCountry", e.target.value); set("addressCity",""); }} />
                    <SSelect id="r-addr-city" label="Şehir" icon={icons.location}
                      options={cityOptions[form.addressCountry] ?? []}
                      placeholder={form.addressCountry ? "Şehir seçiniz" : "Önce ülke seçiniz"}
                      disabled={!form.addressCountry} {...sp("addressCity")}
                      onChange={e => set("addressCity", e.target.value)} />
                    {/* Açık adres tam genişlik */}
                    <div style={{ gridColumn:"1 / -1", display:"flex", flexDirection:"column", gap:5 }}>
                      <label htmlFor="r-address" style={{ fontSize:12.5, fontWeight:600, color:"#374151", letterSpacing:"0.02em" }}>
                        Açık Adres
                      </label>
                      <div style={{ position:"relative" }}>
                        <span style={{ position:"absolute", left:12, top:13, color:"#9CA3AF", pointerEvents:"none", display:"flex" }}>
                          <Icon d={icons.home} />
                        </span>
                        <textarea id="r-address" rows={3} maxLength={250}
                          placeholder="Mahalle, cadde, sokak, bina no, daire..."
                          value={form.openAddress}
                          onChange={e => set("openAddress", e.target.value)}
                          onBlur={() => blur("openAddress")}
                          style={{
                            width:"100%", padding:"10px 12px 10px 38px",
                            border:`1.5px solid ${touched.openAddress && errors.openAddress ? "#D32F2F" : "#E5E7EB"}`,
                            borderRadius:10, fontSize:13.5, outline:"none",
                            background:"#fff", color:"#111827", resize:"none",
                            fontFamily:"inherit", lineHeight:1.55,
                            transition:"border-color .15s, box-shadow .15s",
                          }}
                          onFocus={e => (e.target.style.borderColor = "#1A3A5C")}
                        />
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between" }}>
                        {touched.openAddress && errors.openAddress
                          ? <p style={{ fontSize:11.5, color:"#D32F2F" }}>{errors.openAddress}</p>
                          : <span />}
                        <p style={{ fontSize:11.5, color:"#9CA3AF" }}>{form.openAddress.length}/250</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>{/* /kart */}

              {/* ── Buton & Link ── */}
              <div style={{ marginTop:24, display:"flex", flexDirection:"column", alignItems:"center", gap:14 }}>
                <button id="register-submit" type="submit" style={{
                  width:"100%", maxWidth:400, height:50,
                  background:"linear-gradient(135deg,#1A3A5C 0%,#2B4E73 100%)",
                  color:"#fff", border:"none", borderRadius:14, fontSize:15, fontWeight:700,
                  cursor:"pointer", boxShadow:"0 4px 16px rgba(26,58,92,0.28)",
                  transition:"transform .15s, box-shadow .15s", letterSpacing:"-0.01em",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow="0 6px 22px rgba(26,58,92,0.38)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform="translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow="0 4px 16px rgba(26,58,92,0.28)"; }}
                >
                  Kayıt Ol
                </button>
                <p style={{ fontSize:13.5, color:"#6B7280" }}>
                  Hesabınız var mı?{" "}
                  <Link href="/login" style={{ color:"#4A90E2", fontWeight:700, textDecoration:"none" }}>Giriş Yap</Link>
                </p>
                <p style={{ fontSize:11.5, color:"#9CA3AF" }}>© 2026 Alkan Sigorta. Tüm hakları saklıdır.</p>
              </div>

            </form>
          </div>
        </div>

        {/* ── SAĞ: MİNİ BRAND PANEL (büyük ekranlarda) ── */}
        <div className="hidden xl:flex" style={{
          width:300, flexShrink:0,
          background:"linear-gradient(160deg,#0d2137 0%,#1A3A5C 60%,#1e4a76 100%)",
          position:"sticky", top:56, height:"calc(100vh - 56px)",
          flexDirection:"column", justifyContent:"center", padding:"40px 32px",
          gap:28,
        }}>
          {/* Desen */}
          <div style={{ position:"absolute", inset:0, opacity:0.04, backgroundImage:"linear-gradient(rgba(255,255,255,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.7) 1px,transparent 1px)", backgroundSize:"30px 30px" }} />

          <div style={{ zIndex:1 }}>
            <div style={{ width:48, height:48, color:"rgba(255,255,255,0.85)", marginBottom:20 }}><ShieldCheckIcon /></div>
            <h3 style={{ color:"#fff", fontSize:22, fontWeight:800, lineHeight:1.3, letterSpacing:"-0.03em", marginBottom:12 }}>
              Neden Alkan Sigorta?
            </h3>
            {[
              "Anlık poliçe takibi",
              "Kolay ödeme yönetimi",
              "7/24 destek hattı",
              "Güvenli SSL bağlantı",
              "Hızlı başvuru süreci",
            ].map(t => (
              <div key={t} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <span style={{ width:20, height:20, borderRadius:"50%", background:"rgba(74,144,226,0.30)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"#7CB3F0" }}>
                  <Icon d={icons.check} w={11} />
                </span>
                <span style={{ color:"rgba(255,255,255,0.75)", fontSize:13.5 }}>{t}</span>
              </div>
            ))}
          </div>

          <div style={{ zIndex:1, paddingTop:24, borderTop:"1px solid rgba(255,255,255,0.10)" }}>
            {[["12K+","Aktif Poliçe"],["50K+","Müşteri"],["25+","Yıl Deneyim"]].map(([v,l]) => (
              <div key={l} style={{ marginBottom:12 }}>
                <p style={{ color:"#fff", fontWeight:700, fontSize:20, lineHeight:1 }}>{v}</p>
                <p style={{ color:"rgba(255,255,255,0.50)", fontSize:11.5 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
