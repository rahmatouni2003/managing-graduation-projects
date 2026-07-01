import { useEffect, useState } from "react";
import Requests from "../Services/Requests.model";
import "./NotInTeamRequests.css";

// السهم الخلفي المطابق للصورة الكلاسيكية
const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const TeamIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="17" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M15 20c.3-2.2 1.7-3.8 4-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const StudentIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M4 4v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M4 5l14 4-14 4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

function Avatar({ name, image }) {
  if (image) {
    return <img src={image} alt={name} className="nitrAvatarImg" />;
  }
  const initial = name ? name.trim().charAt(0).toUpperCase() : "?";
  return <div className="nitrAvatarFallback">{initial}</div>;
}

// بادج الحالة الخاص بـ Sent (Accepted / Declined / Pending)
function StatusBadge({ status }) {
  const map = {
    accepted: { label: "Accepted", className: "nitrStatusAccepted" },
    rejected: { label: "Declined", className: "nitrStatusDeclined" },
    declined: { label: "Declined", className: "nitrStatusDeclined" },
    pending: { label: "Pending", className: "nitrStatusPending" },
  };
  const conf = map[status] || map.pending;
  return <span className={`nitrStatusBadge ${conf.className}`}>{conf.label}</span>;
}

// التابات الفرعية المطابقة للصورة تماماً (All | Teams | Students)
const FILTERS = [
  { key: "all", label: "All" },
  { key: "team_join", label: "Teams" },
  { key: "team_form", label: "Students" },
];

export default function NotInTeamRequests() {
  const [activeMainTab, setActiveMainTab] = useState("received"); // received | sent
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Received state
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [respondingId, setRespondingId] = useState(null);

  // Sent state
  const [sentRequests, setSentRequests] = useState([]);
  const [sentLoading, setSentLoading] = useState(true);
  const [sentError, setSentError] = useState(null);

  useEffect(() => {
    if (activeMainTab === "received") {
      fetchReceivedRequests();
    } else {
      fetchSentRequests();
    }
  }, [activeMainTab]);

  const fetchReceivedRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await Requests.getReceivedRequests();
      const list = res?.data ?? [];
      setRequests(Array.isArray(list) ? list : []);
    } catch {
      setError("Failed to load requests. Please try again.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSentRequests = async () => {
    setSentLoading(true);
    setSentError(null);
    try {
      const res = await Requests.getSentRequests();
      // الشكل: { success, data: { data: [...], ... } } (paginator)
      const list = res?.data?.data ?? res?.data ?? [];
      setSentRequests(Array.isArray(list) ? list : []);
    } catch {
      setSentError("Failed to load sent requests. Please try again.");
      setSentRequests([]);
    } finally {
      setSentLoading(false);
    }
  };

  const handleRespond = async (id, status) => {
    setRespondingId(id);
    try {
      await Requests.requestRespond(id, status);
      setRequests((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setError("An error occurred while processing your request.");
    } finally {
      setRespondingId(null);
    }
  };

  const handleAccept = (id) => handleRespond(id, "accepted");
  const handleReject = (id) => handleRespond(id, "rejected");

  const matchesFilter = (r) => (activeFilter === "all" ? true : r.request_type === activeFilter);

  const matchesSearch = (r, personKey) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    const person = r[personKey];
    return (
      person?.name?.toLowerCase().includes(q) ||
      person?.track?.toLowerCase().includes(q) ||
      r.team?.leader_name?.toLowerCase().includes(q) ||
      r.team?.members?.some((m) => m.name?.toLowerCase().includes(q))
    );
  };

  const filteredRequests = (Array.isArray(requests) ? requests : [])
    .filter(matchesFilter)
    .filter((r) => matchesSearch(r, "from_user"));

  const filteredSentRequests = (Array.isArray(sentRequests) ? sentRequests : [])
    .filter(matchesFilter)
    .filter((r) => matchesSearch(r, "to_user"));

  return (
    <div className="nitrPage">
      {/* الـ Header بعد ضبط توزيع العناصر ليطابق الصورة */}
      <div className="nitrHeader">
        <div className="nitrHeaderLeft">
          <button className="nitrBackBtn" aria-label="Back">
            <BackIcon />
          </button>
          <h1 className="nitrTitle">Requests</h1>
        </div>
        <button className="nitrSendBtn">Send New Requests</button>
      </div>

      {/* تابات التنقل الرئيسية (Received / Sent) تقع تحت الـ Header مباشرة */}
      <div className="nitrMainTabs">
        <button
          className={`nitrMainTab ${activeMainTab === "received" ? "nitrMainTabActive" : ""}`}
          onClick={() => setActiveMainTab("received")}
        >
          Received
        </button>
        <button
          className={`nitrMainTab ${activeMainTab === "sent" ? "nitrMainTabActive" : ""}`}
          onClick={() => setActiveMainTab("sent")}
        >
          Sent
        </button>
      </div>

      {/* الـ Card الأبيض الرئيسي */}
      <div className="nitrCard">
        {/* حقل البحث */}
        <div className="nitrSearchWrapper">
          <span className="nitrSearchIcon">
            <SearchIcon />
          </span>
          <input
            className="nitrSearchInput"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* الفلاتر الفرعية المدمجة (All | Teams | Students) */}
        <div className="nitrFilters">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`nitrFilterBtn ${activeFilter === f.key ? "nitrFilterBtnActive" : ""}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* قائمة الطلبات */}
        <div className="nitrList">
          {activeMainTab === "received" && (
            <>
              {loading && <p className="nitrStateText">Loading requests...</p>}
              {error && <p className="nitrStateText">{error}</p>}
              {!loading && !error && filteredRequests.length === 0 && (
                <p className="nitrStateText">No requests found.</p>
              )}

              {!loading &&
                !error &&
                filteredRequests.map((req) => {
                  const isTeamJoin = req.request_type === "team_join";
                  const avatars = isTeamJoin
                    ? [req.from_user, ...(req.team?.members ?? [])]
                    : [req.from_user];

                  return (
                    <div key={req.id} className="nitrRow">
                      <div className="nitrRowLeft">
                        <span className={`nitrBadge ${isTeamJoin ? "nitrBadgeTeam" : "nitrBadgeStudent"}`}>
                          {isTeamJoin ? <TeamIcon /> : <StudentIcon />}
                          {isTeamJoin ? "Team Invite" : "Student Request"}
                        </span>
                      </div>

                      <div className="nitrRowMembers">
                        {avatars.map((person, idx) => (
                          <div className="nitrMember" key={person?.id ?? idx}>
                            <Avatar name={person?.name} image={person?.profile_image} />
                            <div className="nitrMemberInfo">
                              <span className={`nitrMemberName ${idx === 0 && isTeamJoin ? "nitrMemberNameHighlight" : ""}`}>
                                {person?.name}
                              </span>
                              <span className="nitrMemberTrack">{person?.track}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="nitrRowActions">
                        <button
                          className="nitrAcceptBtn"
                          disabled={respondingId === req.id}
                          onClick={() => handleAccept(req.id)}
                        >
                          Accept
                        </button>
                        <button
                          className="nitrRejectBtn"
                          disabled={respondingId === req.id}
                          onClick={() => handleReject(req.id)}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  );
                })}
            </>
          )}

          {activeMainTab === "sent" && (
            <>
              {sentLoading && <p className="nitrStateText">Loading requests...</p>}
              {sentError && <p className="nitrStateText">{sentError}</p>}
              {!sentLoading && !sentError && filteredSentRequests.length === 0 && (
                <p className="nitrStateText">No requests found.</p>
              )}

              {!sentLoading &&
                !sentError &&
                filteredSentRequests.map((req) => {
                  const isTeamJoin = req.request_type ;
                  // لو الـ API رجع أعضاء الفريق نعرضهم، لو مش موجودين نعرض بس الشخص المُرسل له
                  const avatars = isTeamJoin
                    ? req.team?.members?.length
                      ? req.team.members
                      : [req.to_user]
                    : [req.to_user];

                  return (
                    <div key={req.id} className="nitrRow">
                      <div className="nitrRowLeft">
                        {isTeamJoin ? (
                          <span className="nitrBadge nitrBadgeTeam">
                            <TeamIcon />
                            { req.request_type}
                          </span>
                        ) : (
                          <span className="nitrBadge nitrBadgeStudent" style={{ visibility: "hidden" }}>
                            <StudentIcon />
                          </span>
                        )}
                      </div>

                      <div className="nitrRowMembers">
                        {avatars.map((person, idx) => (
                          <div className="nitrMember" key={person?.id ?? idx}>
                            <Avatar name={person?.name} image={person?.profile_image} />
                            <div className="nitrMemberInfo">
                              <span className="nitrMemberName">{person?.name}</span>
                              <span className="nitrMemberTrack">{person?.track}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="nitrRowActions">
                        <StatusBadge status={req.status} />
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}