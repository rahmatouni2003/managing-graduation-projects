import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Search, Users } from "lucide-react";
import StudentService from "../services/Student.model";
import "./NotInTeamHome.css";

// رسمة الـ SVG التوضيحية المقاربة للصورة تماماً
const TeamIllustration = () => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="nth-illustration">
    <circle cx="60" cy="60" r="18" fill="#D1D9E6" opacity="0.5" />
    <ellipse cx="60" cy="105" rx="22" ry="30" fill="#D1D9E6" opacity="0.4" />
    <circle cx="265" cy="75" r="15" fill="#D1D9E6" opacity="0.4" />
    <ellipse cx="265" cy="115" rx="18" ry="25" fill="#D1D9E6" opacity="0.3" />
    <circle cx="300" cy="90" r="12" fill="#D1D9E6" opacity="0.25" />
    <rect x="85" y="148" width="155" height="10" rx="3" fill="#C8D0DC" />
    <rect x="100" y="110" width="125" height="85" rx="6" fill="#E8EDF3" />
    <rect x="104" y="114" width="117" height="68" rx="4" fill="#BCC8D8" opacity="0.5" />
    <rect x="104" y="114" width="117" height="68" rx="4" fill="url(#screenGrad)" opacity="0.7" />
    <circle cx="110" cy="72" r="22" fill="#C68642" />
    <path d="M88 72 Q88 48 110 48 Q132 48 132 72" fill="#2C1A0E" />
    <rect x="90" y="90" width="42" height="60" rx="10" fill="#E8B84B" />
    <path d="M132 110 Q155 105 168 118" stroke="#C68642" strokeWidth="12" strokeLinecap="round" />
    <circle cx="165" cy="80" r="20" fill="#FDBCB4" />
    <path d="M145 80 Q145 58 165 58 Q185 58 185 80" fill="#2C1A0E" />
    <rect x="148" y="97" width="36" height="55" rx="9" fill="#4A90D9" />
    <ellipse cx="155" cy="148" rx="8" ry="5" fill="#FDBCB4" />
    <ellipse cx="175" cy="148" rx="8" ry="5" fill="#FDBCB4" />
    <circle cx="222" cy="65" r="22" fill="#D4956A" />
    <path d="M200 65 Q200 42 222 42 Q244 42 244 65" fill="#1A1A2E" />
    <rect x="204" y="83" width="40" height="65" rx="10" fill="#607D8B" />
    <path d="M204 100 Q185 108 175 120" stroke="#D4956A" strokeWidth="11" strokeLinecap="round" />
    <circle cx="75" cy="35" r="13" fill="#E8EDF3" />
    <circle cx="75" cy="30" r="5" fill="#B0BEC5" />
    <ellipse cx="75" cy="43" rx="7" ry="5" fill="#B0BEC5" />
    <circle cx="255" cy="40" r="11" fill="#E8EDF3" />
    <circle cx="255" cy="35" r="4" fill="#B0BEC5" />
    <ellipse cx="255" cy="47" rx="6" ry="4" fill="#B0BEC5" />
    <circle cx="295" cy="65" r="9" fill="#E8EDF3" />
    <circle cx="295" cy="61" r="3" fill="#B0BEC5" />
    <ellipse cx="295" cy="71" rx="5" ry="3.5" fill="#B0BEC5" />
    <defs>
      <linearGradient id="screenGrad" x1="104" y1="114" x2="221" y2="182" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A8C4E0" />
        <stop offset="1" stopColor="#7BA7CC" />
      </linearGradient>
    </defs>
  </svg>
);

export default function NotInTeamHome() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [guidelinesOpen, setGuidelinesOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    StudentService.getHome()
      .then((res) => {
        setHomeData(res);
      })
      .catch(() => setError("حدث خطأ أثناء تحميل البيانات."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="nth-centered">
        <div className="nth-spinner" />
      </div>
    );
  }

  if (error) return <div className="nth-centered">{error}</div>;
  if (!homeData) return null;

  const { project_guidelines, welcome_message } = homeData;

  return (
    <div className="nth-page">

      {/* ── 1. الجزء العلوي المنحني (خلفية بنفسجية خفيفة) ── */}
      <div className="nth-top-container">
        <div className="nth-header-content">
          <div className="nth-welcome-top">
            <TeamIllustration />
            <h1 className="nth-welcome-heading">{welcome_message} ! 👏</h1>
          </div>
          
          <div className="nth-search-wrapper">
            <Search size={18} className="nth-search-icon" />
            <input
              type="text"
              className="nth-search-input"
              placeholder="Search Projects or Students"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* ── 2. الجزء الأوسط الممتد (الخلفية البيضاء للأزرار والنصوص) ── */}
      <div className="nth-middle-white-section">
        <div className="nth-middle-content">
          <h2 className="nth-no-team-title">You aren’t in a team yet</h2>
          <p className="nth-no-team-sub">Find a team to join or start your own!</p>
          
          <div className="nth-actions">
            <button className="nth-btn-outline">
              <Search size={16} />
              Find a Team
            </button>
            <button className="nth-btn-filled">
              <Users size={16} />
              Start a Team
            </button>
          </div>
        </div>
      </div>

{/* ── 3. الجزء السفلي (بطاقة الإرشادات الممتدة) ── */}
<div className="nth-bottomm-container">
  <div className="nth-guidelines-card">
    <button
      className="nth-guidelines-header"
      onClick={() => setGuidelinesOpen((o) => !o)}
    >
      <span className="nth-guidelines-title">
        <span className="nth-guidelines-icon">
          <Users size={18} style={{ marginRight: '6px' }} />
        </span>
        Project Guidelines
      </span>
      {guidelinesOpen ? <ChevronUp size={18} color="#4a4a6a" /> : <ChevronDown size={18} color="#4a4a6a" />}
    </button>

    {guidelinesOpen && (
      <ul className="nth-guidelines-list">
        {project_guidelines.map((item, i) => (
          <li key={i} className="nth-guidelines-item">
            <span className="nth-bullet" />
            {item}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

    </div>
  );
}