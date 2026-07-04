import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// تأكدي من مسار استيراد ملف الـ model الصحيح، هنا نفترض وجود دالة showMilestone داخل كلاس الـ Milestones
import Milestones from "../Services/Milestones.model"; 
import "./GuestMilestoneDetailsPage.css";

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function MilestoneDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [milestone, setMilestone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        // استدعاء الدالة المذكورة في سؤالك
        const response = await Milestones.showMilestone(id);
        const data = response?.data || response;
        setMilestone(data);
      } catch {
        setError("تعذر تحميل تفاصيل المرحلة.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDetails();
  }, [id]);

  if (loading) return <div className="details-container"><p className="statusText">loading...</p></div>;
  if (error) return <div className="details-container"><p className="statusText">{error}</p></div>;
  if (!milestone) return null;

  return (
    <div className="details-container">
      <button className="backk-btn" onClick={() => navigate(-1)}>
        ← Back to Timeline
      </button>

      {/* القسم الأول: تفاصيل المهمة */}
      <div className="details-section-card">
        <h2 className="section-title">Task Details</h2>
        <div className="detail-row">
          <span className="detail-label">Name :</span>
          <span className="detail-value">{milestone.title}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Description :</span>
          <span className="detail-value description-text">{milestone.description}</span>
        </div>
        
        <div className="date-item">
          <CalendarIcon />
          <span className="detail-label">Assigned Date :</span>
          <span className="detail-value">{formatDate(milestone.start_date)}</span>
        </div>

        <div className="date-item due">
          <ClockIcon />
          <span className="detail-label">Due Date :</span>
          <span className="detail-value">{formatDate(milestone.deadline)}</span>
        </div>
      </div>

      {/* القسم الثاني: المتطلبات */}
      {milestone.requirements && milestone.requirements.length > 0 && (
        <div className="details-section-card">
          <h2 className="section-title">Requirements</h2>
          <ul className="details-requirements-list">
            {milestone.requirements.map((req) => (
              <li key={req.id}>
                <span className="bullet-dot"></span>
                {req.requirement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* القسم الثالث: الملاحظات */}
      <div className="details-section-card">
        <h2 className="section-title">Notes</h2>
        <p className="notes-text">
          {milestone.notes || "No extra notes available for this phase."}
        </p>
      </div>
    </div>
  );
}

// أيقونات مبسطة متوافقة مع التصميم المرفق
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2f7bf0" strokeWidth="2" className="info-icon">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a3ffc" strokeWidth="2" className="info-icon">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  );
}