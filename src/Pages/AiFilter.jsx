import { useState, useEffect } from "react";
import { Search, Folder, XCircle, FileCheck2 } from "lucide-react";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import Project from "../services/Project.model";
import "./AIFilter.css";
import { useNavigate } from "react-router-dom";

export default function AIFilterPage() {
  const [proposals, setProposals] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [similarityLevels, setSimilarityLevels] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleViewDetails = (proposalId) => {
    navigate(`/admin/proposals/${proposalId}`);
  };

  const [filters, setFilters] = useState({
    search: "",
    department_id: "",
    track: "",
    similarity_level: "",
    status: "pending",
  });

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    loadProposals();
  }, [filters]);

  const loadFilterOptions = async () => {
    try {
      const filtersRes = await Project.getStatusesAndSimilarity_levels();
      setStatuses(filtersRes?.statuses || []);
      setSimilarityLevels(filtersRes?.similarity_levels || []);

      const deptRes = await Project.getDepartments();
      setDepartments(deptRes || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadProposals = async () => {
    setLoading(true);
    try {
      const res = await Project.getProposals();
      setProposals(res?.data || []);
      setStatistics(res?.statistics || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (proposalId) => console.log("Approve", proposalId);
  const handleReject = (proposalId) => console.log("Reject", proposalId);

  const getSimilarityInfo = (level) => {
    switch (level) {
      case "high":
        return { class: "ai-filter-sim-high", label: "High" };
      case "medium":
        return { class: "ai-filter-sim-medium", label: "Medium" };
      default:
        return { class: "ai-filter-sim-low", label: "Low" };
    }
  };

  // روابط أفاتار افتراضية جاهزة واحترافية للـ Fallback والكارت التجريبي
  const defaultAvatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
  ];

  return (
    <div className="ai-filter-container">
      <Sidebar active="ai-filter" />

      <div className="ai-filter-content">
        <Header />

        <main className="ai-filter-main">
          <h1 className="ai-filter-title">AI Project Ideas Filter</h1>

          {/* شريط الإحصائيات العلوي */}
          <div className="ai-filter-statistics-bar">
            <div className="ai-filter-stat-item pendingg">
              <span className="ai-filter-stat-badge">
                <Folder size={16} className="ai-filter-icon-orange" />
                <strong>{statistics.total_pending ?? 12}</strong> Pending
                Reviews
              </span>
            </div>
            <div className="ai-filter-stat-divider"></div>
            <div className="ai-filter-stat-item high-sim">
              <span className="ai-filter-stat-badge">
                <XCircle size={16} className="ai-filter-icon-red" />
                <strong>{statistics.high_similarity ?? 3}</strong> High
                Similarity
              </span>
            </div>
            <div className="ai-filter-stat-divider"></div>
            <div className="ai-filter-stat-item approved">
              <span className="ai-filter-stat-badge">
                <FileCheck2 size={16} className="ai-filter-icon-green" />
                <strong>{statistics.total_approved ?? 8}</strong> Approved
              </span>
            </div>
          </div>

          {/* شريط الفلاتر والبحث */}
          <div className="ai-filter-filters-wrapper">
            <div className="ai-filter-search-container">
              <Search size={18} className="ai-filter-search-icon" />
              <input
                type="text"
                placeholder="Search by team, project, or student"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="ai-filter-search-input"
              />
            </div>

            <div className="ai-filter-select-group">
              <div className="ai-filter-select-wrapper">
                <span className="ai-filter-label">Department:</span>
                <select
                  value={filters.department_id}
                  onChange={(e) =>
                    setFilters({ ...filters, department_id: e.target.value })
                  }
                  className="ai-filter-select"
                >
                  <option value="">All</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ai-filter-select-wrapper">
                <span className="ai-filter-label">Similarity:</span>
                <select
                  value={filters.similarity_level}
                  onChange={(e) =>
                    setFilters({ ...filters, similarity_level: e.target.value })
                  }
                  className="ai-filter-select"
                >
                  <option value="">All</option>
                  {similarityLevels.map((lvl) => (
                    <option key={lvl.value} value={lvl.value}>
                      {lvl.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ai-filter-select-wrapper">
                <span className="ai-filter-label">Status:</span>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters({ ...filters, status: e.target.value })
                  }
                  className="ai-filter-select"
                >
                  <option value="pending">Pending</option>
                  {statuses.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* قائمة الكروت */}
          <div className="ai-filter-proposals-list">
            {loading && <p className="status-message">Loading proposals...</p>}
            {!loading && proposals.length === 0 && (
              /* كارت تجريبي متطابق مع الصورة تماماً في حال لم تأتِ بيانات من الـ API */
              <div className="ai-filter-proposal-card">
                <div className="ai-filter-proposal-header">
                  <div className="proposal-info">
                    <h3 className="ai-filter-proposal-title">Robot ccc</h3>
                    <p className="ai-filter-proposal-description">
                      AI-powered system for managing patient diagnosis and
                      appointments using machine learning
                    </p>
                    <div className="ai-filter-tags-container">
                      <span className="ai-filter-tag ai-filter-tag-blue">
                        AI
                      </span>
                      <span className="ai-filter-tag ai-filter-tag-lightblue">
                        Healthcare
                      </span>
                      <span className="ai-filter-tag ai-filter-tag-purple">
                        Data Science
                      </span>
                    </div>
                  </div>

                  <div className="ai-filter-similarity-badge ai-filter-sim-high">
                    <span className="ai-filter-score-part">95%</span>
                    <span className="ai-filter-label-part">High</span>
                  </div>
                </div>

                <div className="ai-filter-proposal-meta">
                  <div className="ai-filter-meta-left">
                    <span className="ai-filter-team-id">Team Alpha</span>
                    <span className="team-members-count">, Members: 6</span>
                    <div className="ai-filter-avatar-group">
                      {defaultAvatars.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt="member avatar"
                          className="ai-filter-avatar"
                        />
                      ))}
                      <span className="ai-filter-avatar-more">+2</span>
                    </div>
                    <span className="ai-filter-submission-date">
                      Nov 5, 2025
                    </span>
                  </div>

                  <div className="ai-filter-meta-right">
                    <span className="ai-filter-match-details">
                      Matched with:{" "}
                      <strong>AI Medical Assistant (Team Delta)</strong>
                    </span>
                    <button
                      onClick={() => handleViewDetails(1)}
                      className="ai-filter-btn-view-details"
                    >
                      View Details
                    </button>
                  </div>
                </div>

                <div className="ai-filter-actions-container">
                  <button
                    onClick={() => handleApprove(1)}
                    className="ai-filter-btn-action ai-filter-btn-approve"
                  >
                    Approve Idea
                  </button>
                  <button
                    onClick={() => handleReject(1)}
                    className="ai-filter-btn-action ai-filter-btn-reject"
                  >
                    Reject Idea
                  </button>
                </div>
              </div>
            )}

            {/* عرض البيانات القادمة من السيرفر بشكل ديناميكي */}
            {!loading &&
              proposals.map((proposal) => {
                const simInfo = getSimilarityInfo(proposal.similarity_level);
                return (
                  <div
                    key={proposal.proposal_id}
                    className="ai-filter-proposal-card"
                  >
                    <div className="ai-filter-proposal-header">
                      <div className="proposal-info">
                        <h3 className="ai-filter-proposal-title">
                          {proposal.title}
                        </h3>
                        <p className="ai-filter-proposal-description">
                          {proposal.description}
                        </p>
                        <div className="ai-filter-tags-container">
                          <span className="ai-filter-tag ai-filter-tag-blue">
                            {proposal.category || "AI"}
                          </span>
                          <span className="ai-filter-tag ai-filter-tag-blue">
                            {proposal.department?.name || "Healthcare"}
                          </span>
                          <span className="ai-filter-tag ai-filter-tag-blue">
                            {proposal.project_type || "Data Science"}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`ai-filter-similarity-badge ${simInfo.class}`}
                      >
                        <span className="ai-filter-score-part">
                          {proposal.similarity_score}%
                        </span>
                        <span className="ai-filter-label-part">
                          {simInfo.label}
                        </span>
                      </div>
                    </div>

                    <div className="ai-filter-proposal-meta">
                      <div className="ai-filter-meta-left">
                        <span className="ai-filter-team-id">
                          Team {proposal.team?.name || "Alpha"}
                        </span>
                        <span className="team-members-count">
                          , Members: {proposal.team?.members_count || 0}
                        </span>
                        <div className="ai-filter-avatar-group">
                          {proposal.team?.members
                            ?.slice(0, 4)
                            .map((member, idx) => (
                              <img
                                key={member.id || idx}
                                src={
                                  member.image ||
                                  defaultAvatars[idx % defaultAvatars.length]
                                }
                                alt={member.name || "member"}
                                className="ai-filter-avatar"
                              />
                            ))}
                          {proposal.team?.members_count > 4 && (
                            <span className="ai-filter-avatar-more">
                              +{proposal.team.members_count - 4}
                            </span>
                          )}
                        </div>
                        <span className="ai-filter-submission-date">
                          {proposal.submitted_date || "Nov 5, 2025"}
                        </span>
                      </div>

                      <div className="ai-filter-meta-right">
                        {proposal.similarity_details && (
                          <span className="ai-filter-match-details">
                            Matched with:{" "}
                            <strong>
                              {
                                proposal.similarity_details
                                  .matched_proposal_title
                              }
                            </strong>{" "}
                            ({proposal.similarity_details.score}%)
                          </span>
                        )}
                        <button
                          onClick={() =>
                            handleViewDetails(proposal.proposal_id)
                          }
                          className="ai-filter-btn-view-details"
                        >
                          View Details
                        </button>
                      </div>
                    </div>

                    <div className="ai-filter-actions-container">
                      <button
                        onClick={() => handleApprove(proposal.proposal_id)}
                        className="ai-filter-btn-action ai-filter-btn-approve"
                      >
                        Approve Idea
                      </button>
                      <button
                        onClick={() => handleReject(proposal.proposal_id)}
                        className="ai-filter-btn-action ai-filter-btn-reject"
                      >
                        Reject Idea
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </main>
      </div>
    </div>
  );
}
