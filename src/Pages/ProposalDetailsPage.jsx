import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import Project from "../services/Project.model";
import "./ProposalDetails.css";

export default function ProposalDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDetails();
  }, [id]);

const loadDetails = async () => {
  setLoading(true);
  setError(null);
  try {
    const res = await Project.getProposalsDetails(id);
    console.log("Proposal Details Response:", res);

    if (res?.proposal) {
      setDetails(res);
    } else {
      setError(res?.message || "تعذر تحميل التفاصيل");
    }
  } catch (err) {
    console.error(err);
    setError("حدث خطأ أثناء تحميل التفاصيل");
  } finally {
    setLoading(false);
  }
};

  const handleApprove = () => console.log("Approve", id);
  const handleReject = () => console.log("Reject", id);


  const getRiskInfo = (level) => {
    switch (level) {
      case "high":
        return { label: "High Risk", class: "risk-high", color: "#ef4444" };
      case "medium":
        return { label: "Medium Risk", class: "risk-medium", color: "#f59e0b" };
      case "low":
        return { label: "Low Risk", class: "risk-low", color: "#22c55e" };
      default:
        return { label: "No Risk Data", class: "risk-none", color: "#94a3b8" };
    }
  };

  if (loading) {
    return (
      <div className="proposal-details-container">
        <Sidebar active="ai-filter" />
        <div className="proposal-details-content">
          <Header />
          <main className="proposal-details-main">
            <p className="status-message">Loading details...</p>
          </main>
        </div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="proposal-details-container">
        <Sidebar active="ai-filter" />
        <div className="proposal-details-content">
          <Header />
          <main className="proposal-details-main">
            <p className="status-message error">{error || "لا توجد بيانات"}</p>
            <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
          </main>
        </div>
      </div>
    );
  }

  const { proposal, department, team, similarities, similarity_stats } = details;

  // أعلى تطابق (لو موجود)
  const topMatch = similarities?.[0];
  const overallScore = similarity_stats?.highest_score ?? 0;
  const riskInfo = getRiskInfo(similarity_stats?.highest_level);

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="proposal-details-container">
      <Sidebar active="ai-filter" />
      <div className="proposal-details-content">
        <Header />
        <main className="proposal-details-main">
          <button className="btn-back" onClick={() => navigate(-1)}>
            ← Back to Proposals
          </button>

          <div className="proposal-summary-card">
            <div className="proposal-info">
              <h1 className="proposal-title">{proposal.title}</h1>
              <p className="proposal-description">{proposal.description}</p>
              <div className="tags-container">
                {proposal.category && <span className="tag tag-blue">{proposal.category}</span>}
                {department?.name && <span className="tag tag-lightblue">{department.name}</span>}
                {proposal.technologies && <span className="tag tag-purple">{proposal.technologies}</span>}
              </div>
            </div>

            <div className="team-info">
              <span className="team-id">Team #{team?.id}</span>
              <span className="team-members-count">, Members: {team?.members_count ?? 0}</span>
              <div className="avatar-group">
                {team?.members?.slice(0, 4).map((member, idx) => (
                  <img
                    key={member.id || idx}
                    src={member.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name || idx}`}
                    alt={member.name || "member"}
                    className="avatar"
                  />
                ))}
              </div>
              <span className="submission-date">{proposal.submitted_at}</span>
            </div>
          </div>

          <div className="proposal-details-grid">
            {/* العمود الشمال: باقي تفاصيل المقترح */}
            <div className="left-column">
              <div className="detail-block">
                <h3>Problem Statement</h3>
                <p>{proposal.problem_statement || "—"}</p>
              </div>
              <div className="detail-block">
                <h3>Solution</h3>
                <p>{proposal.solution || "—"}</p>
              </div>
              {proposal.attachment_file && (
                <a
                  href={proposal.attachment_file}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-attachment"
                >
                  View Attachment
                </a>
              )}

              {similarities?.length > 0 && (
                <div className="detail-block">
                  <h3>All Matches ({similarities.length})</h3>
                  {similarities.map((sim, idx) => (
                    <div key={idx} className="match-row">
                      <span>{sim.matched_proposal?.title || "—"}</span>
                      <span>{sim.matched_team?.name ? `Team ${sim.matched_team.name}` : ""}</span>
                      <span className="match-score">{sim.score}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* العمود اليمين: كارت التشابه زي الصورة */}
            <div className="right-column">
              <div className="similarity-summary-card">
                <h3 className="similarity-card-title">{proposal.title}</h3>

                <div className="score-circle-wrapper">
                  <svg viewBox="0 0 120 120" className="score-circle">
                    <circle cx="60" cy="60" r="54" className="score-circle-bg" />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      className="score-circle-fill"
                      style={{
                        stroke: riskInfo.color,
                        strokeDasharray: circumference,
                        strokeDashoffset: dashOffset,
                      }}
                    />
                  </svg>
                  <span className="score-circle-label">{overallScore ?? 0}%</span>
                </div>

                <div className={`status-badge ${riskInfo.class}`}>
                  Status: {riskInfo.label}
                </div>

                <div className="similarity-bars">
                  <div className="similarity-bar-row">
                    <span>Title Similarity:</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill bar-red"
                        style={{ width: `${topMatch?.title_similarity ?? 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="similarity-bar-row">
                    <span>Feature Similarity:</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill bar-orange"
                        style={{ width: `${topMatch?.feature_similarity ?? 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="similarity-bar-row">
                    <span>Keywords Match:</span>
                    <div className="bar-track">
                      <div
                        className="bar-fill bar-green"
                        style={{ width: `${topMatch?.keywords_similarity ?? 0}%` }}
                      />
                    </div>
                  </div>
                </div>

                {topMatch && (
                  <p className="similar-to-text">
                    Similar To:{" "}
                    <strong>
                      {topMatch.matched_proposal?.title}
                      {topMatch.matched_team?.name ? ` (Team ${topMatch.matched_team.name})` : ""}
                    </strong>
                  </p>
                )}

                {similarities?.length === 0 && (
                  <p className="no-similarity-text">No similar proposals found.</p>
                )}

                {topMatch?.ai_insight && (
                  <div className="ai-insights-box">
                    <h4>AI Insights</h4>
                    <p>{topMatch.ai_insight}</p>
                  </div>
                )}

                <div className="detail-actions">
                  <button className="btn-action btn-approvee" onClick={handleApprove}>
                    Approve Idea
                  </button>
                  <button className="btn-action btn-rejectt" onClick={handleReject}>
                    Reject Idea
                  </button>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}