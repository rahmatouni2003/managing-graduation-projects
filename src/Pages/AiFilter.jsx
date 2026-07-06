import { useState, useEffect, useMemo } from "react";
import { Search, Folder, XCircle, FileCheck2 } from "lucide-react";
import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";
import Project from "../services/Project.model";
import "./AIFilter.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function AIFilterPage() {
  const [proposals, setProposals] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [similarityLevels, setSimilarityLevels] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);


  const [actionLoadingKey, setActionLoadingKey] = useState(null);

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
    loadProposals();
  }, []);

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

  // ✅ الفلترة بتحصل هنا على الداتا اللي عندنا already من الـ API
  // كل ما اليوزر يغيّر فلتر، الليستة دي بتتحدث تلقائي من غير ما نطلب من السيرفر تاني
  const filteredProposals = useMemo(() => {
    return proposals.filter((proposal) => {
      // فلتر الـ status
      if (filters.status && proposal.status) {
        if (proposal.status !== filters.status) return false;
      }

      // فلتر الـ department
      if (filters.department_id) {
        const proposalDeptId =
          proposal.department?.id ?? proposal.department_id;
        if (String(proposalDeptId) !== String(filters.department_id)) {
          return false;
        }
      }

      // فلتر الـ similarity level
      if (filters.similarity_level) {
        if (proposal.similarity_level !== filters.similarity_level) {
          return false;
        }
      }

      // فلتر الـ search (بيبحث في العنوان، الوصف، واسم التيم)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const title = proposal.title?.toLowerCase() || "";
        const description = proposal.description?.toLowerCase() || "";
        const teamName = proposal.team?.name?.toLowerCase() || "";
        const studentNames =
          proposal.team?.members
            ?.map((m) => m.name?.toLowerCase() || "")
            .join(" ") || "";

        const matchesSearch =
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          teamName.includes(searchTerm) ||
          studentNames.includes(searchTerm);

        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [proposals, filters]);

  // ✅ دالة موحدة تتعامل مع القبول والرفض
  // بنعمل مفتاح فريد لكل زرار (proposalId-status) عشان يبقى مستقل عن الزرار التاني
  const handleProposalAction = async (proposalId, status) => {
    const actionKey = `${proposalId}-${status}`;
    setActionLoadingKey(actionKey);
    try {
      const res = await Project.sendProposalApprovalStatus(proposalId, status);

      const successMessage =
        res?.message ||
        (status === "approved"
          ? "Proposal approved successfully"
          : "Proposal rejected successfully");

      toast.success(successMessage);

      // شيل الـ proposal من الليستة الحالية (لأنها كانت pending)
      setProposals((prev) => prev.filter((p) => p.proposal_id !== proposalId));

      // تحديث الإحصائيات محليًا
      setStatistics((prev) => ({
        ...prev,
        total_pending: (prev.total_pending || 1) - 1,
        total_approved:
          status === "approved"
            ? (prev.total_approved || 0) + 1
            : prev.total_approved,
        total_rejected:
          status === "rejected"
            ? (prev.total_rejected || 0) + 1
            : prev.total_rejected,
      }));
    } catch (err) {
      console.error(err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        (status === "approved"
          ? "Failed to approve proposal"
          : "Failed to reject proposal");
      toast.error(errorMessage);
    } finally {
      setActionLoadingKey(null);
    }
  };

  const handleApprove = (proposalId) =>
    handleProposalAction(proposalId, "approved");

  const handleReject = (proposalId) =>
    handleProposalAction(proposalId, "rejected");

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

  const defaultAvatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Jack",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
  ];

  return (
    <div className="ai-filter-container">
      {/* مكوّن الـ Toaster لازم يتحط مرة واحدة في الصفحة */}
      <Toaster position="top-right" reverseOrder={false} />

      <Sidebar active="ai-filter" />

      <div className="ai-filter-content">
        <Header />

        <main className="ai-filter-main">
          <h1 className="ai-filter-title">AI Project Ideas Filter</h1>

          <div className="ai-filter-statistics-bar">
            <div className="ai-filter-stat-item pendingg">
              <span className="ai-filter-stat-badge">
                <Folder size={16} className="ai-filter-icon-orange" />
                <strong>{statistics.total_pending ?? 0}</strong> Pending
                Reviews
              </span>
            </div>
            <div className="ai-filter-stat-divider"></div>
            <div className="ai-filter-stat-item high-sim">
              <span className="ai-filter-stat-badge">
                <XCircle size={16} className="ai-filter-icon-red" />
                <strong>{statistics.high_similarity ?? 0}</strong> High
                Similarity
              </span>
            </div>
            <div className="ai-filter-stat-divider"></div>
            <div className="ai-filter-stat-item approved">
              <span className="ai-filter-stat-badge">
                <FileCheck2 size={16} className="ai-filter-icon-green" />
                <strong>{statistics.total_approved ?? 0}</strong> Approved
              </span>
            </div>
          </div>

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

          <div className="ai-filter-proposals-list">
            {loading && <p className="status-message">Loading proposals...</p>}

            {!loading && proposals.length === 0 && (
              <p className="status-message">No proposals available yet.</p>
            )}

            {!loading && proposals.length > 0 && filteredProposals.length === 0 && (
              <div className="ai-filter-no-results">
                <p className="status-message">
                  No proposals match the selected filters.
                </p>
                <button
                  className="ai-filter-btn-clear-filters"
                  onClick={() =>
                    setFilters({
                      search: "",
                      department_id: "",
                      track: "",
                      similarity_level: "",
                      status: "",
                    })
                  }
                >
                  Clear Filters
                </button>
              </div>
            )}

            {!loading &&
              filteredProposals.map((proposal) => {
                const simInfo = getSimilarityInfo(proposal.similarity_level);

                // ✅ كل زرار بيتحقق من مفتاحه الخاص بيه بس (proposalId + status)
                // فبقى الزرار التاني مش بيتأثر خالص لما زرار غيره يكون شغال
                const isApproveLoading =
                  actionLoadingKey === `${proposal.proposal_id}-approved`;
                const isRejectLoading =
                  actionLoadingKey === `${proposal.proposal_id}-rejected`;

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
                            {proposal.category || ""}
                          </span>
                          <span className="ai-filter-tag ai-filter-tag-blue">
                            {proposal.department?.name || ""}
                          </span>
                          <span className="ai-filter-tag ai-filter-tag-blue">
                            {proposal.project_type || ""}
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
                          Team {proposal.team?.name || ""}
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
                          {proposal.submitted_date || ""}
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
                        disabled={isApproveLoading}
                        className="ai-filter-btn-action ai-filter-btn-approve"
                      >
                        {isApproveLoading ? "..." : "Approve Idea"}
                      </button>
                      <button
                        onClick={() => handleReject(proposal.proposal_id)}
                        disabled={isRejectLoading}
                        className="ai-filter-btn-action ai-filter-btn-reject"
                      >
                        {isRejectLoading ? "..." : "Reject Idea"}
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
