import React from "react";
import "./NotInTeam.css";
import { ChevronUp, ChevronDown, Search, Users } from "lucide-react";
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const TeamIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TeamIllustration = () => (
  <svg viewBox="0 0 320 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="illustration">
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

export default function NotInTeam() {
  return (
    <div className="not-in-team-page">
      <div className="not-in-team-card">
        <div className="not-in-team-illustration-wrapper">
          <TeamIllustration />
        </div>
        <h2 className="not-in-team-title">You aren't in a team yet</h2>
        <p className="not-in-team-subtitle">Find a team to join or start your own!</p>
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
  );
}
