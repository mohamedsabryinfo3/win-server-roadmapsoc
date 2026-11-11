'use client';

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  COURSES,
  LEVELS,
  STAGES,
  FULL_STAGES,
  EXCLUDED_TOPICS,
  SOC_PLAN,
  type CourseId,
  type LevelId,
  type Stage,
} from "@/lib/track-data";

const STORAGE_KEY_SOC = "ws-to-soc-progress-v1";
const STORAGE_KEY_FULL = "ws-to-full-progress-v1";

type TrackId = "soc" | "full";

const TRACKS: { id: TrackId; name: string; title: string; subtitle: string; storageKey: string; stages: Stage[] }[] = [
  {
    id: "soc",
    name: "مسار SOC",
    title: "من Windows Server إلى الـ SOC",
    subtitle:
      "مسار واحد مرتب من قوائم محمد طناني 2022 وعبير 2019. الفيديوهات المسئولة عن مسار الأمن السيبراني و SOC فقط. اضغط على الدائرة عند إنهاء الفيديو، ويتحفظ تقدمك في متصفحك.",
    storageKey: STORAGE_KEY_SOC,
    stages: STAGES,
  },
  {
    id: "full",
    name: "مسار WINDOWS SERVER",
    title: "مسار Windows Server الكامل",
    subtitle:
      "كل فيديوهات Windows Server من قوائم محمد طناني 2022 وعبير 2019 بدون حذف. كل فيديو له بديل أو مكمل من القائمة التانية. اضغط على الدائرة عند إنهاء الفيديو، ويتحفظ تقدمك في متصفحك.",
    storageKey: STORAGE_KEY_FULL,
    stages: FULL_STAGES,
  },
];

function getTrack(id: TrackId) {
  return TRACKS.find((t) => t.id === id)!;
}

type Filters = {
  level: "all" | LevelId;
  course: "all" | CourseId;
  hideCompleted: boolean;
};

type Tab = "track" | "excluded" | "plan" | "comparison";

function itemKey(stageId: number, idx: number) {
  return `${stageId}-${idx}`;
}

function loadProgress(storageKey: string): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function Home() {
  const [trackId, setTrackId] = useState<TrackId>("soc");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [filters, setFilters] = useState<Filters>({
    level: "all",
    course: "all",
    hideCompleted: false,
  });
  const [activeTab, setActiveTab] = useState<Tab>("track");
  const [mounted, setMounted] = useState(false);

  const track = getTrack(trackId);
  const stages = track.stages;

  useEffect(() => {
    // Sync from localStorage on client mount (hydration-safe)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCompleted(loadProgress(track.storageKey));
    setMounted(true);
  }, [track.storageKey]);

  const saveProgress = useCallback(
    (data: Record<string, boolean>) => {
      try {
        localStorage.setItem(track.storageKey, JSON.stringify(data));
      } catch {}
    },
    [track.storageKey]
  );

  const toggleItem = useCallback(
    (key: string) => {
      setCompleted((prev) => {
        const next = { ...prev };
        if (next[key]) {
          delete next[key];
        } else {
          next[key] = true;
        }
        saveProgress(next);
        return next;
      });
    },
    [saveProgress]
  );

  const totalCount = useMemo(
    () => stages.reduce((acc, s) => acc + s.items.length, 0),
    [stages]
  );

  const completedCount = useMemo(
    () =>
      stages.reduce(
        (acc, s) => acc + s.items.filter((_, i) => completed[itemKey(s.id, i)]).length,
        0
      ),
    [completed, stages]
  );

  const percent = totalCount ? Math.round((completedCount / totalCount) * 100) : 0;

  const nextItem = (() => {
    for (const s of stages) {
      for (let i = 0; i < s.items.length; i++) {
        if (!completed[itemKey(s.id, i)]) {
          return { stageId: s.id, stageTitle: s.title, index: i };
        }
      }
    }
    return null;
  })();

  const goToNext = useCallback(() => {
    if (!nextItem) return;
    const el = document.querySelector(`[data-key="${itemKey(nextItem.stageId, nextItem.index)}"]`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      (el as HTMLElement).classList.add("item--flash");
      setTimeout(() => (el as HTMLElement).classList.remove("item--flash"), 1200);
    }
  }, [nextItem]);

  const resetProgress = useCallback(() => {
    if (typeof window === "undefined") return;
    if (window.confirm(`متأكد إنك تصفر تقدم ${track.name} كله؟`)) {
      setCompleted({});
      saveProgress({});
    }
  }, [saveProgress, track.name]);

  const exportProgress = useCallback(() => {
    const blob = new Blob([JSON.stringify(completed, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${track.id}-progress.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [completed, track.id]);

  const importProgress = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          if (typeof data === "object" && data) {
            setCompleted(data);
            saveProgress(data);
          }
        } catch {}
      };
      reader.readAsText(file);
    };
    input.click();
  }, [saveProgress]);

  const courseById = useCallback(
    (id: CourseId) => COURSES.find((c) => c.id === id)!,
    []
  );
  const levelById = useCallback((id: LevelId) => LEVELS.find((l) => l.id === id)!, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{globalStyles}</style>

      {/* HERO */}
      <header className="hero">
        <div className="container">
          {/* TRACK SWITCHER */}
          <div className="track-switcher">
            {TRACKS.map((t) => (
              <button
                key={t.id}
                className={`track-btn ${trackId === t.id ? "track-btn--active" : ""}`}
                onClick={() => {
                  setTrackId(t.id);
                  setActiveTab("track");
                  setFilters({ level: "all", course: "all", hideCompleted: false });
                }}
              >
                {t.name}
              </button>
            ))}
          </div>

          <h1 className="hero__title">{track.title}</h1>
          <p className="hero__subtitle">{track.subtitle}</p>

          {/* PROGRESS */}
          <div className="progress">
            <div className="progress__head">
              <span className="progress__percent">{mounted ? `${percent}%` : "0%"}</span>
              <span className="progress__next">
                {mounted
                  ? nextItem
                    ? `التالي: ${nextItem.stageTitle}`
                    : "خلصت المسار كامل 🎉"
                  : "التالي: أساسيات الشبكات"}
              </span>
            </div>
            <div className="progress__bar">
              <div className="progress__fill" style={{ width: `${percent}%` }} />
            </div>
            <div className="progress__meta">
              <span>
                {mounted ? `${completedCount} من ${totalCount} فيديو منتهي` : ""}
              </span>
              <button className="btn btn--link" onClick={goToNext}>
                اذهب للفيديو التالي
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === "track" ? "tab--active" : ""}`}
              onClick={() => setActiveTab("track")}
            >
              المسار
            </button>
            {trackId === "soc" && (
              <>
                <button
                  className={`tab ${activeTab === "excluded" ? "tab--active" : ""}`}
                  onClick={() => setActiveTab("excluded")}
                >
                  اللي اتشال
                </button>
                <button
                  className={`tab ${activeTab === "plan" ? "tab--active" : ""}`}
                  onClick={() => setActiveTab("plan")}
                >
                  خطة الـ SOC
                </button>
              </>
            )}
            {trackId === "full" && (
              <button
                className={`tab ${activeTab === "comparison" ? "tab--active" : ""}`}
                onClick={() => setActiveTab("comparison")}
              >
                مقارنة القائمتين
              </button>
            )}
          </div>
        </div>
      </header>

      {/* FILTERS */}
      {activeTab === "track" && (
        <section className="container filters">
          <div className="filters__row">
            <span className="filters__label">النوع:</span>
            <div className="chips">
              {[
                { v: "all", label: "كل الأنواع" },
                { v: "basic", label: "أساسي" },
                { v: "support", label: "دعم" },
                { v: "optional", label: "اختياري" },
              ].map((l) => (
                <button
                  key={l.v}
                  className={`chip ${filters.level === l.v ? "chip--active" : ""}`}
                  onClick={() => setFilters((f) => ({ ...f, level: l.v as Filters["level"] }))}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filters__row">
            <span className="filters__label">القائمة:</span>
            <div className="chips">
              {[
                { v: "all", label: "كل القوائم" },
                { v: "tanany2022", label: "طناني 2022" },
                { v: "abeer2019", label: "عبير 2019" },
              ].map((c) => (
                <button
                  key={c.v}
                  className={`chip ${filters.course === c.v ? "chip--active" : ""}`}
                  onClick={() => setFilters((f) => ({ ...f, course: c.v as Filters["course"] }))}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filters__row filters__row--actions">
            <label className="switch">
              <input
                type="checkbox"
                checked={filters.hideCompleted}
                onChange={(e) => setFilters((f) => ({ ...f, hideCompleted: e.target.checked }))}
              />
              <span className="switch__track">
                <span className="switch__thumb" />
              </span>
              <span className="switch__label">إخفاء المنتهي</span>
            </label>
            <button className="btn btn--ghost" onClick={resetProgress}>
              تصفير التقدم
            </button>
            <button className="btn btn--ghost" onClick={exportProgress}>
              تصدير التقدم
            </button>
            <button className="btn btn--ghost" onClick={importProgress}>
              استيراد التقدم
            </button>
          </div>
        </section>
      )}

      {/* MAIN */}
      <main className="container main">
        {activeTab === "track" && (
          <TrackView
            stages={stages}
            filters={filters}
            completed={completed}
            toggleItem={toggleItem}
            courseById={courseById}
            levelById={levelById}
            mounted={mounted}
          />
        )}

        {activeTab === "excluded" && (
          <div className="card excluded-card">
            <h2 className="excluded-card__title">الفيديوهات اللي اتشالت خارج المسار</h2>
            <p className="excluded-card__desc">
              كل الموضوعات دي مش مرتبطة مباشرة بمسار الـ SOC، فتم حذفها من القائمتين
              معاً. لو احتجتها بعدين هتلاقيها في الكورسات الأصلية.
            </p>
            <ul className="excluded-list">
              {EXCLUDED_TOPICS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "plan" && (
          <div className="card plan-card">
            <h2 className="plan-card__title">خطة الـ SOC بعد ما تخلص الفيديوهات</h2>
            <p className="plan-card__desc">
              الفيديوهات دي بتبني أساس Windows Server و Active Directory. باقي المسار
              عملي في تحليل اللوجات والاستجابة للحوادث.
            </p>
            <table className="plan-table">
              <thead>
                <tr>
                  <th>الشهر</th>
                  <th>الهدف</th>
                </tr>
              </thead>
              <tbody>
                {SOC_PLAN.map((row) => (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                    <td>{row.goal}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="plan-card__h3">ليه القائمتين الاتنين؟</h3>
            <p className="plan-card__desc">
              القائمتين (طناني 2022 وعبير 2019) تقريباً نفس المحتوى، لكن كل فيديو من
              قائمة ليه نظير في التانية. <strong>طناني 2022</strong> أحدث وأكثر
              تركيزاً، و<strong>عبير 2019</strong> أعمق في تفاصيل الـ Disaster
              Recovery و GPO الأمنية. شوف الاتنين لو وقتك بيسمح، أو اختر واحد وزود
              عليه فيديوهات التانية لما تحتاج تفصيل أكتر.
            </p>

            <h3 className="plan-card__h3">اللي متشال من القائمتين</h3>
            <ul className="plan-card__list">
              <li>تثبيت Windows 11 / 10 و WDS / MDT (تجهيز بس)</li>
              <li>IIS و FTP (إدارة سيرفرات الويب)</li>
              <li>WSUS و FSRM و DAC (إدارة تفصيلية)</li>
              <li>NLB و Failover Cluster و iSCSI (توافر عالٍ)</li>
              <li>DFS و BranchCache و Work Folders و Print Servers</li>
              <li>IPAM و NIC Teaming و Cables و Orientation</li>
            </ul>
          </div>
        )}

        {activeTab === "comparison" && (
          <ComparisonView stages={stages} />
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <p>
            المشروع مفتوح المصدر للنشر على GitHub و Vercel. التقدم بيتتحفظ محلياً في
            المتصفح فقط.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ===================== Track View ===================== */
function TrackView({
  stages: trackStages,
  filters,
  completed,
  toggleItem,
  courseById,
  levelById,
  mounted,
}: {
  stages: Stage[];
  filters: Filters;
  completed: Record<string, boolean>;
  toggleItem: (key: string) => void;
  courseById: (id: CourseId) => (typeof COURSES)[number];
  levelById: (id: LevelId) => (typeof LEVELS)[number];
  mounted: boolean;
}) {
  const stages = useMemo(() => {
    return trackStages.map((stage) => {
      const filtered = stage.items
        .map((it, i) => ({ item: it, index: i }))
        .filter(({ item, index }) => {
          if (filters.level !== "all" && item.level !== filters.level) return false;
          if (filters.course !== "all" && item.course !== filters.course) return false;
          if (filters.hideCompleted && completed[itemKey(stage.id, index)]) return false;
          return true;
        });
      return { stage, filtered };
    }).filter(({ filtered }) => filtered.length > 0);
  }, [trackStages, filters, completed]);

  if (stages.length === 0) {
    return (
      <div className="empty">
        <div className="empty__title">مفيش فيديوهات بالفلتر ده</div>
        <div>جرّب فلتر مختلف أو صفّر التقدم.</div>
      </div>
    );
  }

  return (
    <>
      {stages.map(({ stage, filtered }) => {
        const stageDone = mounted
          ? stage.items.filter((_, i) => completed[itemKey(stage.id, i)]).length
          : 0;
        const stageTotal = stage.items.length;
        const stagePct = stageTotal ? Math.round((stageDone / stageTotal) * 100) : 0;

        return (
          <section className="stage" key={stage.id} id={`stage-${stage.id}`}>
            <div className="stage__head">
              <span className="stage__num">{stage.id}</span>
              <h2 className="stage__title">{stage.title}</h2>
            </div>
            <div className="stage__subtitle">
              <span>{stage.subtitle}</span>
              <span className="stage__count">
                {stageDone}/{stageTotal}
              </span>
            </div>
            <div className="stage__bar">
              <div className="stage__bar-fill" style={{ width: `${stagePct}%` }} />
            </div>
            <ul className="stage__items">
              {filtered.map(({ item, index }, displayIdx) => {
                const key = itemKey(stage.id, index);
                const isDone = mounted && !!completed[key];
                const course = courseById(item.course);
                const level = levelById(item.level);
                return (
                  <li
                    key={key}
                    data-key={key}
                    className={`item ${isDone ? "item--done" : ""}`}
                    onClick={() => toggleItem(key)}
                    role="checkbox"
                    aria-checked={isDone}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleItem(key);
                      }
                    }}
                  >
                    <span className="item__circle" />
                    <span className="item__num">{displayIdx + 1}</span>
                    <div className="item__body">
                      <span className="item__title">{item.title}</span>
                      <div className="item__badges">
                        <span className={`badge badge--course ${item.course}`}>
                          {course.short}
                          <span className="badge badge--num">#{item.num}</span>
                        </span>
                        <span className={`badge badge--level ${item.level}`}>
                          {level.name}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </>
  );
}

/* ===================== Comparison View ===================== */
function ComparisonView({ stages }: { stages: Stage[] }) {
  const stats = useMemo(() => {
    let tananyCount = 0;
    let abeerCount = 0;
    let bothCount = 0;
    let totalItems = 0;
    const stageStats = stages.map((stage) => {
      let t = 0;
      let a = 0;
      stage.items.forEach((it) => {
        totalItems++;
        if (it.course === "tanany2022") t++;
        if (it.course === "abeer2019") a++;
      });
      // If a stage has items from both courses, count as "both"
      if (t > 0 && a > 0) bothCount++;
      tananyCount += t;
      abeerCount += a;
      return { stage, tanany: t, abeer: a, total: stage.items.length };
    });
    return { tananyCount, abeerCount, bothCount, totalItems, stageStats };
  }, [stages]);

  return (
    <>
      <div className="card comparison-card">
        <h2 className="comparison-card__title">مقارنة قائمة طناني 2022 وعبير 2019</h2>
        <p className="comparison-card__desc">
          المسار الكامل بيجمع الفيديوهات من القائمتين معاً، وكل موضوع ليه بديل من القائمة
          التانية لو موجود. الجدول تحت بيوضح توزيع الفيديوهات في كل مرحلة.
        </p>

        <div className="comparison-stats">
          <div className="stat-box stat-box--tanany">
            <div className="stat-box__num">{stats.tananyCount}</div>
            <div className="stat-box__label">طناني 2022</div>
          </div>
          <div className="stat-box stat-box--abeer">
            <div className="stat-box__num">{stats.abeerCount}</div>
            <div className="stat-box__label">عبير 2019</div>
          </div>
          <div className="stat-box stat-box--total">
            <div className="stat-box__num">{stats.totalItems}</div>
            <div className="stat-box__label">إجمالي الفيديوهات</div>
          </div>
          <div className="stat-box stat-box--both">
            <div className="stat-box__num">{stats.bothCount}</div>
            <div className="stat-box__label">مرحلة في القائمتين</div>
          </div>
        </div>
      </div>

      <div className="card comparison-card" style={{ marginTop: 16 }}>
        <h3 className="plan-card__h3">التوزيع حسب المرحلة</h3>
        <table className="plan-table">
          <thead>
            <tr>
              <th>المرحلة</th>
              <th>طناني 2022</th>
              <th>عبير 2019</th>
              <th>الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            {stats.stageStats.map(({ stage, tanany, abeer, total }) => (
              <tr key={stage.id}>
                <td>{stage.id}. {stage.title}</td>
                <td><span className="badge badge--course tanany2022">{tanany}</span></td>
                <td><span className="badge badge--course abeer2019">{abeer}</span></td>
                <td><strong>{total}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ===================== Styles ===================== */
const globalStyles = `
:root {
  --bg: #0b1120;
  --bg-soft: #111827;
  --bg-card: #161f33;
  --bg-card-hover: #1b2540;
  --border: #1f2a44;
  --border-soft: #1a2238;
  --text: #e5e9f0;
  --text-soft: #9aa6bf;
  --text-mute: #6b7689;
  --primary: #38bdf8;
  --primary-strong: #0ea5e9;
  --primary-soft: rgba(56, 189, 248, 0.12);
  --accent: #f59e0b;
  --basic: #22c55e;
  --basic-soft: rgba(34, 197, 94, 0.14);
  --support: #f59e0b;
  --support-soft: rgba(245, 158, 11, 0.14);
  --optional: #94a3b8;
  --optional-soft: rgba(148, 163, 184, 0.14);
  --tanany: #0ea5e9;
  --tanany-soft: rgba(14, 165, 233, 0.14);
  --abeer: #f59e0b;
  --abeer-soft: rgba(245, 158, 11, 0.14);
  --radius: 14px;
  --radius-sm: 8px;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

* { box-sizing: border-box; }

body {
  background: var(--bg) !important;
  color: var(--text) !important;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 20px;
}

.hero {
  background: linear-gradient(180deg, #0c1322 0%, var(--bg) 100%);
  border-bottom: 1px solid var(--border);
  padding: 48px 0 32px;
}

.hero__title {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 900;
  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  margin-bottom: 14px;
  line-height: 1.2;
}

.hero__subtitle {
  color: var(--text-soft);
  font-size: 15px;
  max-width: 760px;
  line-height: 1.7;
}

.progress {
  margin-top: 28px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 18px 22px;
  box-shadow: var(--shadow);
}

.progress__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.progress__percent {
  font-size: 26px;
  font-weight: 900;
  color: var(--primary);
  font-family: var(--font-inter), monospace;
}

.progress__next {
  font-size: 13px;
  color: var(--text-soft);
}

.progress__bar {
  height: 10px;
  background: var(--bg-soft);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-strong), #818cf8);
  border-radius: 999px;
  transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.progress__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--text-soft);
  flex-wrap: wrap;
  gap: 10px;
}

.btn {
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text);
  cursor: pointer;
  transition: all 0.18s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
}

.btn:hover {
  background: var(--bg-card-hover);
  border-color: var(--primary);
  color: var(--primary);
}

.btn--link {
  background: transparent;
  border: none;
  color: var(--primary);
  padding: 4px 8px;
}

.btn--link:hover { background: var(--primary-soft); }
.btn--ghost { background: transparent; }

.tabs {
  display: flex;
  gap: 4px;
  margin-top: 24px;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}

.tab {
  font-size: 14px;
  font-weight: 600;
  padding: 12px 18px;
  background: transparent;
  color: var(--text-soft);
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.18s ease;
  font-family: inherit;
}

.tab:hover { color: var(--text); }

.tab--active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.track-switcher {
  display: flex;
  gap: 8px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.track-btn {
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  padding: 10px 22px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-soft);
  cursor: pointer;
  transition: all 0.2s ease;
}

.track-btn:hover {
  color: var(--text);
  border-color: var(--primary);
  transform: translateY(-1px);
}

.track-btn--active {
  background: linear-gradient(135deg, var(--primary-strong), #818cf8);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 4px 14px rgba(56, 189, 248, 0.3);
}

.comparison-card__title {
  font-size: 22px;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 10px;
}

.comparison-card__desc {
  color: var(--text-soft);
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.8;
}

.comparison-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.stat-box {
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 16px;
  text-align: center;
  border-top: 3px solid var(--border);
}

.stat-box--tanany { border-top-color: var(--tanany); }
.stat-box--abeer { border-top-color: var(--abeer); }
.stat-box--total { border-top-color: var(--primary); }
.stat-box--both { border-top-color: var(--basic); }

.stat-box__num {
  font-size: 28px;
  font-weight: 900;
  font-family: var(--font-inter), monospace;
  color: var(--text);
  margin-bottom: 4px;
}

.stat-box--tanany .stat-box__num { color: var(--tanany); }
.stat-box--abeer .stat-box__num { color: var(--abeer); }
.stat-box--total .stat-box__num { color: var(--primary); }
.stat-box--both .stat-box__num { color: var(--basic); }

.stat-box__label {
  font-size: 12px;
  color: var(--text-soft);
  font-weight: 600;
}

.filters {
  padding: 22px 20px;
  margin-top: 22px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.filters__row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.filters__row--actions {
  border-top: 1px solid var(--border-soft);
  padding-top: 14px;
  margin-top: 4px;
}

.filters__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-soft);
  min-width: 50px;
}

.chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.chip {
  font-size: 13px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-soft);
  cursor: pointer;
  transition: all 0.18s ease;
  font-family: inherit;
}

.chip:hover { color: var(--text); border-color: var(--primary); }

.chip--active {
  background: var(--primary-soft);
  border-color: var(--primary);
  color: var(--primary);
}

.switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
}

.switch input { display: none; }

.switch__track {
  width: 38px;
  height: 22px;
  background: var(--bg-soft);
  border: 1px solid var(--border);
  border-radius: 999px;
  position: relative;
  transition: background 0.2s ease;
}

.switch__thumb {
  position: absolute;
  top: 50%;
  right: 3px;
  width: 16px;
  height: 16px;
  background: var(--text-soft);
  border-radius: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease;
}

.switch input:checked + .switch__track {
  background: var(--primary-soft);
  border-color: var(--primary);
}

.switch input:checked + .switch__track .switch__thumb {
  right: calc(100% - 19px);
  background: var(--primary);
}

.switch__label { font-size: 13px; color: var(--text-soft); }

.main { padding: 30px 20px 60px; }

.stage { margin-bottom: 32px; }

.stage__head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}

.stage__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 10px;
  background: linear-gradient(135deg, var(--primary-strong), #818cf8);
  color: #fff;
  font-weight: 800;
  font-size: 15px;
  border-radius: 8px;
  font-family: var(--font-inter), monospace;
}

.stage__title { font-size: 22px; font-weight: 800; color: var(--text); }

.stage__subtitle {
  color: var(--text-soft);
  font-size: 13px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.stage__count {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--primary);
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-inter), monospace;
}

.stage__bar {
  height: 4px;
  background: var(--bg-card);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 14px;
  border: 1px solid var(--border-soft);
}

.stage__bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--basic), #38bdf8);
  border-radius: 999px;
  transition: width 0.4s ease;
}

.stage__items { list-style: none; display: grid; gap: 8px; padding: 0; margin: 0; }

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  transition: all 0.18s ease;
  cursor: pointer;
}

.item:hover {
  background: var(--bg-card-hover);
  border-color: var(--primary);
  transform: translateX(-2px);
}

.item--flash {
  animation: flashItem 1.2s ease;
}

@keyframes flashItem {
  0%, 100% { background: var(--bg-card); }
  30% { background: var(--primary-soft); border-color: var(--primary); }
}

.item--done { opacity: 0.55; }

.item--done .item__title {
  text-decoration: line-through;
  text-decoration-color: var(--primary);
}

.item__circle {
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid var(--border);
  background: transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
  position: relative;
}

.item:hover .item__circle { border-color: var(--primary); }

.item--done .item__circle {
  background: var(--primary);
  border-color: var(--primary);
}

.item--done .item__circle::after {
  content: "";
  width: 12px;
  height: 7px;
  border-left: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(-45deg) translateY(-1px);
  display: block;
}

.item__num {
  flex-shrink: 0;
  font-family: var(--font-inter), monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--text-mute);
  min-width: 24px;
  text-align: center;
}

.item__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.item__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  word-break: break-word;
  font-family: var(--font-inter), system-ui, sans-serif;
  direction: ltr;
  text-align: right;
}

.item__badges {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.badge--course {
  background: var(--bg-soft);
  color: var(--text-soft);
  border: 1px solid var(--border);
}

.badge--course.tanany2022 {
  background: var(--tanany-soft);
  color: var(--tanany);
  border-color: var(--tanany);
}

.badge--course.abeer2019 {
  background: var(--abeer-soft);
  color: var(--abeer);
  border-color: var(--abeer);
}

.badge--num {
  background: transparent;
  border: none;
  color: inherit;
  font-family: var(--font-inter), monospace;
  padding: 0;
}

.badge--level.basic {
  background: var(--basic-soft);
  color: var(--basic);
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.badge--level.support {
  background: var(--support-soft);
  color: var(--support);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.badge--level.optional {
  background: var(--optional-soft);
  color: var(--optional);
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
}

.excluded-card__title,
.plan-card__title {
  font-size: 22px;
  font-weight: 800;
  color: var(--text);
  margin-bottom: 10px;
}

.excluded-card__desc,
.plan-card__desc {
  color: var(--text-soft);
  font-size: 14px;
  margin-bottom: 18px;
  line-height: 1.8;
}

.excluded-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 8px;
  padding: 0;
}

.excluded-list li {
  background: var(--bg-soft);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  color: var(--text-soft);
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.excluded-list li::before {
  content: "✕";
  color: #ef4444;
  font-weight: 800;
}

.plan-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 24px;
  font-size: 13px;
}

.plan-table th,
.plan-table td {
  text-align: right;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border-soft);
}

.plan-table th {
  background: var(--bg-soft);
  color: var(--primary);
  font-weight: 700;
}

.plan-table td:first-child {
  font-family: var(--font-inter), monospace;
  font-weight: 700;
  color: var(--text-soft);
  white-space: nowrap;
}

.plan-card__h3 {
  font-size: 17px;
  font-weight: 800;
  color: var(--text);
  margin: 20px 0 10px;
}

.plan-card__list {
  list-style: none;
  display: grid;
  gap: 6px;
  padding: 0;
}

.plan-card__list li {
  background: var(--bg-soft);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-sm);
  padding: 10px 14px;
  color: var(--text-soft);
  font-size: 13px;
  position: relative;
  padding-right: 28px;
}

.plan-card__list li::before {
  content: "—";
  position: absolute;
  right: 12px;
  color: var(--primary);
  font-weight: 800;
}

.footer {
  border-top: 1px solid var(--border);
  padding: 24px 0;
  text-align: center;
  color: var(--text-mute);
  font-size: 12px;
  margin-top: auto;
}

.empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-mute);
}

.empty__title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--text-soft);
}

@media (max-width: 640px) {
  .hero { padding: 32px 0 20px; }
  .hero__title { font-size: 26px; }
  .hero__subtitle { font-size: 14px; }
  .stage__title { font-size: 18px; }
  .item { padding: 10px 12px; }
  .item__title { font-size: 13px; }
  .filters__label { min-width: auto; }
  .excluded-list { grid-template-columns: 1fr; }
}

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border); border-radius: 999px; }
::-webkit-scrollbar-thumb:hover { background: var(--primary); }
`;
