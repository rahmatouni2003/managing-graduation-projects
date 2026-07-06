import {
  FaSearch,
  FaRegFileAlt,
  FaBookOpen,
  FaUserFriends,
  FaCalendarAlt,
  FaClock,
  FaLink,
} from "react-icons/fa";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdErrorOutline, MdExpandMore } from "react-icons/md";
import { useEffect, useState } from "react";
import landing from "../assets/homee2.jpg"; // صورة الغلاف الخلفية للـ Hero
import Auth from "../services/Auth.model";
import "./Home.css";

function Home() {
  const [open, setOpen] = useState(true);
  const [homeData, setHomeData] = useState(null);

useEffect(() => {
  let mounted = true;
  const fetchHome = async () => {
    try {
      const res = await Auth.getHome();
      if (mounted) {
        // بما أن extractResponseData تعيد res.data تلقائياً، خزن res مباشرة
        setHomeData(res); 
      }
    } catch (err) {
      console.log(err);
    }
  };
  fetchHome();
  return () => {
    mounted = false;
  };
}, []);

if (!homeData) return null;

const {
  user = {},
  project_rules = {},
  project_guidelines = [],
  project = {},
  meetings = [],
  next_deadline = null,
  last_feedback = {},
  important_notes = [],
  supervisors = [],
  milestone_committee = { members: [] }, // تأمين الكائن الداخلي والمصفوفة التابعة له
} = homeData;

  // حساب الموعد النهائي ديناميكياً من حقل project1_team_formation_deadline إذا كان الـ next_deadline فارغاً
  const calculateDaysLeft = () => {
    if (next_deadline && next_deadline.days_left) return next_deadline.days_left;
    if (project_rules?.project1_team_formation_deadline) {
      const deadline = new Date(project_rules.project1_team_formation_deadline);
      const today = new Date();
      const diffTime = deadline - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 3; // قيمة افتراضية كالصورة تماماً
  };

  // دالة مساعدة لتنسيق وتعديل أسماء الاجتماعات بناءً على منشئ الاجتماع أو العنوان
  const getMeetingDisplayTitle = (meeting) => {
    if (meeting.title === "meeting1") return "meeting1";
    return "meeting2";
  };

  return (
    <div className="home-page">
      <div className="homee-container">
        
        {/* ==================== HERO SECTION ==================== */}
        <div className="hero">
          <img src={landing} alt="AI Banner" />
          <div className="overlay" />

          <div className="hero-content">
            <h2>Welcome {user?.name || "Aliya Othman"} 👋🏻</h2>
            <div className="home-search-box">
              <FaSearch />
              <input
                type="text"
                placeholder="Search Projects or Students"
              />
            </div>
          </div>
        </div>

        {/* ==================== PROJECT SECTION ==================== */}
        <div className="project-section">
          <h3> {project?.title}</h3>
          <p className="project-desc">
            {project?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"}
          </p>

          {/* ==================== PROJECT GUIDELINES ==================== */}
          <div className="guidelines-card">
            <div className="guidelines-header" onClick={() => setOpen(!open)}>
              <div className="title">
                <FaRegFileAlt className="guidelines-icon" />
                <span>Project Guidelines</span>
              </div>
              <MdExpandMore className={`arrow-icon ${open ? "rotate" : ""}`} />
            </div>

            {open && (
              <div className="guidelines-body">
                <ul>
                  {project_guidelines?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ==================== DEADLINE ALERT ==================== */}
          <div className="deadline-alert">
            <MdErrorOutline className="alert-icon" />
            <span>Next deadline in {calculateDaysLeft()} days</span>
          </div>

          {/* ==================== UPCOMING MEETINGS ==================== */}
          <div className="meeting-card">
            <h4>Upcoming Meetings</h4>
            <div className="meetings-list-wrapper">
              {meetings?.map((meeting, index) => (
                <div className="meeting-item" key={meeting.id || index}>
                  <div className="meeting-left">
                    <img 
                      className="meeting-avatar-img" 
                      src={`https://i.pravatar.cc/150?u=${meeting.created_by?.id || index}`} 
                      alt="Avatar" 
                    />
                    <div className="meeting-info">
                      <h5>{getMeetingDisplayTitle(meeting)}</h5>
                      <p>{meeting.created_by?.name || "Dr. Ahmed El-Naggar"}</p>
                    </div>
                  </div>

                  <div className="meeting-right-details">
                    <div className="meeting-time-block">
                      <div className="time-row">
                        <FaCalendarAlt />
                        <span>{meeting.date || "Mon, Jan 27, 2026"}</span>
                      </div>
                      <div className="time-row">
                        <FaClock />
                        <span>{meeting.time || "10:00 AM"}</span>
                      </div>
                    </div>

                    {/* استخدام رابط حقيقي قادم من الـ API بدلاً من التثبيت الاستاتيكي */}
                    <a 
                      href={meeting.meeting_link?.startsWith('http') ? meeting.meeting_link : `https://meet.google.com/${meeting.meeting_link}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="meeting-google-link"
                    >
                      <FaLink />
                      <span>https://meet.google.com/{meeting.meeting_link?.substring(0, 8)}...</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ==================== BOTTOM INFO CARDS ==================== */}
          <div className="cards-gridd">
            
            {/* 1. Last Feedback Card */}
            <div className="info-card">
              <div className="home-card-title">
                <FaBookOpen className="card-title-icon" />
                <span>Last Feedback</span>
              </div>
              <div className="feedback-box">
                {last_feedback?.text || "Excellent work on the design system! The color palette is cohesive and..."}
              </div>
              <div className="card-footer">
                <div className="creator-info">
                  <span>Created By</span>
                  <b>{last_feedback?.feedback_by?.name || "Doctor 5"}</b>
                </div>
                <span className="feedback-date">
                  {last_feedback?.feedback_at ? last_feedback.feedback_at.split(' ')[0] : "2026-07-02"}
                </span>
              </div>
            </div>

            {/* 2. Important Notes Card */}
            <div className="info-card">
              <div className="home-card-title">
                <HiOutlineSpeakerphone className="card-title-icon" />
                <span>Important Notes</span>
              </div>
              <ul className="notes-list">
                {important_notes?.map((note, i) => (
                  <li key={i}>
                    {note.text} {note.location ? `Discussion will be in ${note.location}` : ""}
                  </li>
                ))}
                {/* عنصر إضافي لملء الفراغ متناسق مع حجم الصورة الافتراضية */}
                <li className="placeholder-note">Lorem Ipsum dolor sit</li>
              </ul>
            </div>

            {/* 3. Supervisors Card */}
            <div className="info-card">
              <div className="home-card-title">
                <FaUserFriends className="card-title-icon" />
                <span>Supervisors</span>
              </div>
              <div className="people-scroll-container">
                {supervisors?.map((sup) => (
                  <div className="person-row" key={sup.id}>
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sup.name}`}
                      alt={sup.name}
                    />
                    <div className="person-meta">
                      <span className="p-name">{sup.name}</span>
                      <span className="p-role">{sup.role?.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Supervising Committee Card */}
            <div className="info-card">
              <div className="home-card-title">
                <FaUserFriends className="card-title-icon" />
                <span>Supervising Committee</span>
              </div>
              <div className="people-scroll-container committee-grid">
                {milestone_committee?.members?.map((member) => (
                  <div className="person-row" key={member.id}>
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}`}
                      alt={member.name}
                    />
                    <div className="person-meta">
                      <span className="p-name">{member.name}</span>
                      <span className="p-role">{member.role?.toUpperCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;