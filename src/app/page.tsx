"use client";

import React, { useState } from "react";
import {
  Button,
  Card,
  Badge,
  Input,
  Select,
  Spinner,
  Skeleton,
  SectionHeader,
  EmptyState,
  Alert,
  Modal,
  ProgressBar,
  Divider,
  Breadcrumb,
} from "@/components/ui";
import {
  DashboardStatCard,
  QuickActionCard,
  UpcomingPaymentCard,
  ActivityTimelineItem,
  WelcomeHeader,
  type Activity,
} from "@/components/domain";

// ─── Örnek veriler ──────────────────────────────────────────────────────────────
const sampleActivities: Activity[] = [
  { id: 1, type: "application", title: "Kasko Başvurusu", subtitle: "34 ABC 123 – Araç Sigortası", date: new Date(Date.now() - 86400000).toISOString(), status: "APPROVED" },
  { id: 2, type: "payment", title: "Taksit Ödemesi", subtitle: "Konut Sigortası – 2. Taksit", date: new Date(Date.now() - 2 * 86400000).toISOString(), status: "PAID" },
  { id: 3, type: "policy", title: "Sağlık Poliçesi Yenileme", subtitle: "Bireysel Sağlık – 2025/2026", date: new Date(Date.now() - 5 * 86400000).toISOString(), status: "PENDING" },
  { id: 4, type: "application", title: "Konut Sigortası Başvurusu", subtitle: "Cadde No: 45 Daire 3", date: new Date(Date.now() - 10 * 86400000).toISOString(), status: "REJECTED" },
];

// ─── Showcase Sections ──────────────────────────────────────────────────────────
function Section({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return (
    <section id={id} className="mb-xxl">
      <div className="flex items-center gap-sm mb-lg">
        <div className="w-1 h-6 rounded-full bg-primary flex-shrink-0" />
        <h2 className="text-headline-md text-text-primary">{title}</h2>
      </div>
      {children}
    </section>
  );
}

// ─── Main Showcase Page ─────────────────────────────────────────────────────────
export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  return (
    <div className="min-h-screen bg-background-light">
      {/* ── Welcome Header ── */}
      <WelcomeHeader
        userName="Design System"
        onLogout={() => alert("Çıkış yapıldı")}
      />

      {/* ── Breadcrumb & Nav ── */}
      <div className="page-container">
        <div className="py-md">
          <Breadcrumb
            items={[
              { label: "Ana Sayfa", onClick: () => {} },
              { label: "Design System" },
            ]}
          />
        </div>
      </div>

      <div className="page-container page-content">

        {/* ═══════════════════════════════════════════════════════════
            1. COLOR PALETTE
        ═══════════════════════════════════════════════════════════ */}
        <Section title="Color Palette" id="colors">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-md">
            {[
              { name: "Primary",          hex: "#1A3A5C", cls: "bg-primary" },
              { name: "Primary Light",    hex: "#2B4E73", cls: "bg-primary-light" },
              { name: "Primary Dark",     hex: "#0F2438", cls: "bg-primary-dark" },
              { name: "Secondary",        hex: "#4A90E2", cls: "bg-secondary" },
              { name: "Secondary Light",  hex: "#7CB3F0", cls: "bg-secondary-light" },
              { name: "Secondary Dark",   hex: "#2868B8", cls: "bg-secondary-dark" },
              { name: "Success",          hex: "#388E3C", cls: "bg-status-success" },
              { name: "Warning",          hex: "#F57C00", cls: "bg-status-warning" },
              { name: "Error",            hex: "#D32F2F", cls: "bg-status-error" },
              { name: "Info",             hex: "#1976D2", cls: "bg-status-info" },
              { name: "Surface",          hex: "#FFFFFF", cls: "bg-surface border border-border" },
              { name: "Surface Variant",  hex: "#F0F2F5", cls: "bg-surface-variant" },
            ].map(({ name, hex, cls }) => (
              <div key={name} className="card p-md">
                <div className={`${cls} rounded-small mb-md`} style={{ height: 56 }} />
                <p className="text-title-sm text-text-primary">{name}</p>
                <p className="text-caption text-text-tertiary mt-xs font-mono">{hex}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            2. TYPOGRAPHY
        ═══════════════════════════════════════════════════════════ */}
        <Section title="Typography" id="typography">
          <div className="card p-lg space-y-md">
            <div>
              <p className="text-overline text-text-tertiary mb-sm">DISPLAY</p>
              <p className="text-display-lg">Display Large · 32px Bold</p>
              <p className="text-display-md">Display Medium · 28px Bold</p>
              <p className="text-display-sm">Display Small · 24px SemiBold</p>
            </div>
            <Divider />
            <div>
              <p className="text-overline text-text-tertiary mb-sm">HEADLINE</p>
              <p className="text-headline-lg">Headline Large · 22px SemiBold</p>
              <p className="text-headline-md">Headline Medium · 20px SemiBold</p>
              <p className="text-headline-sm">Headline Small · 18px SemiBold</p>
            </div>
            <Divider />
            <div>
              <p className="text-overline text-text-tertiary mb-sm">TITLE</p>
              <p className="text-title-lg">Title Large · 18px Medium</p>
              <p className="text-title-md">Title Medium · 16px Medium</p>
              <p className="text-title-sm">Title Small · 14px Medium</p>
            </div>
            <Divider />
            <div>
              <p className="text-overline text-text-tertiary mb-sm">BODY</p>
              <p className="text-body-lg">Body Large · 16px Regular — Sigorta poliçeniz başarıyla işleme alındı.</p>
              <p className="text-body-md text-text-secondary">Body Medium · 14px Regular — Poliçe detaylarını görüntülemek için tıklayın.</p>
              <p className="text-body-sm text-text-tertiary">Body Small · 12px Regular — Son güncelleme: 12.06.2026</p>
            </div>
            <Divider />
            <div>
              <p className="text-overline text-text-tertiary mb-sm">LABEL & CAPTION</p>
              <p className="text-label-lg">Label Large · 14px SemiBold</p>
              <p className="text-label-md text-text-secondary">Label Medium · 12px SemiBold</p>
              <p className="text-caption text-text-tertiary">Caption · 12px Regular</p>
              <p className="text-overline text-text-secondary">Overline · 10px SemiBold Uppercase</p>
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            3. BUTTONS
        ═══════════════════════════════════════════════════════════ */}
        <Section title="Buttons" id="buttons">
          <div className="card p-lg space-y-lg">
            {/* Variants */}
            <div>
              <p className="text-overline text-text-tertiary mb-md">VARIANTS</p>
              <div className="flex flex-wrap gap-md items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            <Divider />
            {/* Sizes */}
            <div>
              <p className="text-overline text-text-tertiary mb-md">SIZES</p>
              <div className="flex flex-wrap gap-md items-center">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <Divider />
            {/* States */}
            <div>
              <p className="text-overline text-text-tertiary mb-md">STATES</p>
              <div className="flex flex-wrap gap-md items-center">
                <Button loading>Yükleniyor</Button>
                <Button disabled>Disabled</Button>
                <Button
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  }
                >
                  İkonlu Buton
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            4. BADGES
        ═══════════════════════════════════════════════════════════ */}
        <Section title="Badges" id="badges">
          <div className="card p-lg">
            <div className="flex flex-wrap gap-md items-center">
              <Badge variant="success" dot>Onaylandı</Badge>
              <Badge variant="pending" dot>Beklemede</Badge>
              <Badge variant="error" dot>Reddedildi</Badge>
              <Badge variant="info" dot>Bilgi</Badge>
              <Badge variant="neutral">Nötr</Badge>
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            5. FORM ELEMENTS
        ═══════════════════════════════════════════════════════════ */}
        <Section title="Form Elements" id="forms">
          <div className="card p-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <Input
                label="Ad Soyad"
                placeholder="Ahmet Yılmaz"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
              <Input
                label="Hatalı Alan"
                placeholder="Örnek değer"
                error="Bu alan zorunludur"
                defaultValue="hatalı@"
              />
              <Input
                label="Hint ile Alan"
                placeholder="TC Kimlik No"
                hint="11 haneli TC Kimlik numaranızı giriniz"
                type="text"
              />
              <Input
                label="Disabled Alan"
                defaultValue="Değiştirilemez"
                disabled
              />
              <Select
                label="Sigorta Türü"
                options={[
                  { value: "", label: "Seçiniz..." },
                  { value: "kasko", label: "Kasko" },
                  { value: "trafik", label: "Trafik" },
                  { value: "konut", label: "Konut Sigortası" },
                  { value: "saglik", label: "Sağlık Sigortası" },
                ]}
              />
              <Input
                label="Ara"
                placeholder="Poliçe ara..."
                leftIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                }
              />
            </div>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            6. DASHBOARD STAT CARDS (mobil dashboard_stat_card.dart)
        ═══════════════════════════════════════════════════════════ */}
        <Section title="Dashboard Stat Cards" id="stat-cards">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
            <DashboardStatCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>}
              title="Başvurular"
              value="24"
              accent="blue"
              onClick={() => {}}
            />
            <DashboardStatCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
              title="Aktif Poliçe"
              value="12"
              accent="teal"
              onClick={() => {}}
            />
            <DashboardStatCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>}
              title="Bekleyen"
              value="5"
              accent="orange"
            />
            <DashboardStatCard
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>}
              title="Toplam Borç"
              value="8.450₺"
              accent="green"
              onClick={() => {}}
            />
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            7. QUICK ACTION CARDS (mobil quick_action_card.dart)
        ═══════════════════════════════════════════════════════════ */}
        <Section title="Quick Action Cards" id="quick-actions">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-md">
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>, title: "Yeni Başvuru", subtitle: "Başvuru Yap", accent: "blue" as const },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>, title: "Başvurular", subtitle: "Listele", accent: "orange" as const },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Poliçelerim", subtitle: "Görüntüle", accent: "teal" as const },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, title: "Ödemeler", subtitle: "Tahsilat", accent: "green" as const },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>, title: "Yenile", subtitle: "Güncelle", accent: "purple" as const },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, title: "Profil", subtitle: "Hesabım", accent: "blueGrey" as const },
            ].map((item) => (
              <QuickActionCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                accent={item.accent}
                onClick={() => {}}
              />
            ))}
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            8. UPCOMING PAYMENT CARDS (mobil upcoming_payment_card.dart)
        ═══════════════════════════════════════════════════════════ */}
        <Section title="Upcoming Payment Cards" id="payments">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <UpcomingPaymentCard
              title="Kasko Sigortası"
              amount={1250.50}
              dueDate={new Date(Date.now() + 3 * 86400000).toISOString()}
              installmentNumber={3}
              onClick={() => {}}
            />
            <UpcomingPaymentCard
              title="Konut Sigortası"
              amount={450.00}
              dueDate={new Date(Date.now() - 2 * 86400000).toISOString()}
              installmentNumber={1}
              onClick={() => {}}
            />
            <UpcomingPaymentCard
              title="Sağlık Sigortası"
              amount={3800.00}
              dueDate={new Date(Date.now() + 15 * 86400000).toISOString()}
              installmentNumber={6}
              onClick={() => {}}
            />
            <UpcomingPaymentCard
              title="Trafik Sigortası"
              amount={680.25}
              dueDate={new Date(Date.now()).toISOString()}
              installmentNumber={2}
              onClick={() => {}}
            />
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            9. ACTIVITY TIMELINE (mobil activity_timeline_item.dart)
        ═══════════════════════════════════════════════════════════ */}
        <Section title="Activity Timeline" id="timeline">
          <div className="card p-lg">
            {sampleActivities.map((activity, idx) => (
              <ActivityTimelineItem
                key={activity.id}
                activity={activity}
                isLast={idx === sampleActivities.length - 1}
              />
            ))}
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            10. ALERTS
        ═══════════════════════════════════════════════════════════ */}
        <Section title="Alerts" id="alerts">
          <div className="space-y-md">
            <Alert variant="success" title="İşlem Başarılı">Başvurunuz başarıyla kaydedildi. En kısa sürede size dönüş yapılacaktır.</Alert>
            <Alert variant="error" title="Hata Oluştu" onClose={() => {}}>Sunucuya bağlanırken bir sorun oluştu. Lütfen tekrar deneyin.</Alert>
            <Alert variant="warning">Poliçenizin son ödeme tarihi yaklaşmaktadır. Gecikme yaşamamak için ödemenizi yapınız.</Alert>
            <Alert variant="info">Yeni sigorta ürünlerimiz hakkında bilgi almak için temsilcinizle iletişime geçin.</Alert>
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            11. FEEDBACK (Loading, Skeleton, Empty State)
        ═══════════════════════════════════════════════════════════ */}
        <Section title="Feedback States" id="feedback">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {/* Loading */}
            <div className="card p-lg flex flex-col items-center justify-center gap-md" style={{ minHeight: 160 }}>
              <Spinner size="lg" />
              <p className="text-body-sm text-text-secondary">Yükleniyor...</p>
            </div>

            {/* Skeleton */}
            <div className="card p-lg space-y-sm">
              <Skeleton height="1.25rem" width="60%" />
              <Skeleton height="1rem" />
              <Skeleton height="1rem" width="80%" />
              <Skeleton height="2.5rem" rounded />
            </div>

            {/* Empty State */}
            <EmptyState
              icon={
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                </svg>
              }
              title="Kayıt bulunamadı"
              description="Arama kriterlerinize uygun poliçe bulunamadı."
              action={<Button size="sm">Filtreleri Temizle</Button>}
            />
          </div>
        </Section>

        {/* ═══════════════════════════════════════════════════════════
            12. PROGRESS & MODAL
        ═══════════════════════════════════════════════════════════ */}
        <Section title="Progress & Modal" id="misc">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="card p-lg space-y-md">
              <p className="text-title-md text-text-primary font-semibold mb-md">Progress Bars</p>
              <ProgressBar value={75} label="Başvuru Tamamlama" />
              <ProgressBar value={45} color="#4A90E2" label="Poliçe Durumu" />
              <ProgressBar value={90} color="#388E3C" label="Ödeme Takibi" />
            </div>
            <div className="card p-lg flex flex-col items-center justify-center gap-md" style={{ minHeight: 200 }}>
              <p className="text-title-md text-text-primary font-semibold">Modal Demo</p>
              <Button onClick={() => setModalOpen(true)}>Modal Aç</Button>
            </div>
          </div>
        </Section>

      </div>{/* /page-container */}

      {/* ── Modal ── */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Çıkış Yap"
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>İptal</Button>
            <Button variant="danger" onClick={() => setModalOpen(false)}>Çıkış Yap</Button>
          </>
        }
      >
        <p className="text-body-md text-text-secondary">
          Hesabınızdan çıkmak istediğinize emin misiniz? Tüm oturum bilgileriniz silinecektir.
        </p>
      </Modal>
    </div>
  );
}