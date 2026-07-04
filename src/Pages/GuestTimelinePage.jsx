import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 إضافة الـ Navigation
import Project from "../Services/Project.model";
import "./Guesttimelinepage.css";

const statusLabels = {
  on_progress: "On Progress",
  pending: "Pending",
  completed: "Completed",
  closed: "Closed",
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function MilestonesTimeline() {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 👈 تفعيل الـ Navigation

  useEffect(() => {
    let isMounted = true;

    async function fetchMilestones() {
      try {
        const response = await Project.getMyGuestMilestones();
        const data = response || response?.data || [];

        if (isMounted) {
          setMilestones(data);
        }
      } catch {
        if (isMounted) {
          setError("تعذر تحميل المراحل، حاول مرة أخرى.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMilestones();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="page">
      <h1 className="title">Project Timeline Overview</h1>

      <p className="subtitle">
        Track the progress of key project milestones and phases. Each card
        represents a significant event in the project lifecycle.
      </p>

      {loading && <p className="statusText">loading...</p>}
      {error && <p className="statusText">{error}</p>}

      {!loading && !error && (
        <div className="timeline">
          <div className="timelineLine" />

          {milestones.map((milestone) => (
            <div key={milestone.id} className="timelineItem">
              <span className="timelineDot" />

              {/* 👈 إضافة حدث onClick وتعديل الـ style ليشير إلى أنه قابل للضغط */}
              <div 
                className="card" 
                onClick={() => navigate(`/guest/milestones/${milestone.id}`)} 
                style={{ cursor: 'pointer' }}
              >
                <div className="cardHeader">
                  <div className="iconWrapper">
                    <BulbIcon />
                  </div>

                  <div className="cardHeaderText">
                    <h2 className="cardTitle">{milestone.title}</h2>

                    <div className="cardDate">
                      <CalendarIcon />
                      <span>
                        {formatDate(milestone.start_date)} -{" "}
                        {formatDate(milestone.deadline)}
                      </span>
                    </div>
                  </div>

                  <span className="marksBadge">
                    {Number(milestone.max_score)} Marks
                  </span>
                </div>

                <p className="cardDescription">
                  {milestone.description}
                </p>

                {milestone.requirements?.length > 0 && (
                  <ul className="requirementsList">
                    {milestone.requirements.slice(0, 2).map((req) => (
                      <li key={req.id}>{req.requirement}</li>
                    ))}
                  </ul>
                )}

                <span className={`statusBadge ${milestone.status}`}>
                  {statusLabels[milestone.status] || milestone.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// الأيقونات تظل كما هي أسفل الملف...
function BulbIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 21h6M12 3a6 6 0 00-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0012 3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function CalendarIcon() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" /><path d="M16 3v4M8 3v4M3 10h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>; }