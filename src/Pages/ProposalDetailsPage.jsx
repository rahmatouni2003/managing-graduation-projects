import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Chip,
  Avatar,
  AvatarGroup,
  Button,
  CircularProgress,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

import Header from "../components/adminHeader";
import Sidebar from "../components/adminSidebar";

import Project from "../Services/Project.model";
import "./ProposalDetails.css";

const SECTION_LABELS = {
  objectives: "Title Similarity",
  technology_stack: "Feature Similarity",
  solution_approach: "Keywords Match",
};

function scoreBarColor(key) {
  if (key === "objectives") return "#e74c3c"; // Red
  if (key === "technology_stack") return "#f5a623"; // Orange
  return "#2ecc71"; // Green
}

const COLOR_MAP = { red: "#e74c3c", orange: "#f5a623", green: "#2ecc71" };

function DonutChart({ percentage, color }) {
  const strokeColor = COLOR_MAP[color] || "#e74c3c";
  const radius = 72;
  const stroke = 14;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const dash = (Math.min(percentage, 100) / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2} className="aif-donut-svg">
      <circle
        stroke="#f0f0f0"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={strokeColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${circumference}`}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        transform={`rotate(-90 ${radius} ${radius})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em" className="aif-donut-text">
        {Math.round(percentage)}%
      </text>
    </svg>
  );
}

export default function AIFilterPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [actionLoadingKey, setActionLoadingKey] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await Project.getProposalsDetails(id);
        if (isMounted) {
          setData(res);
          setSelectedIndex(0);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleProposalAction = async (proposalId, status) => {
    const actionKey = `${proposalId}-${status}`;
    setActionLoadingKey(actionKey);
    try {
      const res = await Project.sendProposalApprovalStatus(proposalId, status);
      const successMessage =
        res?.message ||
        (status === "approved"
          ? "Proposal approved successfully"
          : status === "rejected"
          ? "Proposal rejected successfully"
          : "Proposal sent for edit");

      // تم التعديل هنا: مسح أي توستات قديمة معلقة قبل إظهار التوست الجديد لتفادي تراكمها
      toast.dismiss(); 
      toast.success(successMessage);

      // هنا نقوم بعمل تأخير بسيط جداً أو مسح التوست فوراً عند الانتقال لكي لا تلاحقك للصفحة التالية
      setTimeout(() => {
        toast.dismiss();
        navigate("/admin/ai-filter");
      }, 1500); // تظهر الرسالة ثانية ونصف ثم تختفي تماماً مع الانتقال

    } catch (err) {
      console.error(err);
      const errorMessage = err?.response?.data?.message || err?.message || "Action failed";
      toast.dismiss();
      toast.error(errorMessage);
    } finally {
      setActionLoadingKey(null);
    }
  };

  const handleApprove = (proposalId) => handleProposalAction(proposalId, "approved");
  const handleReject = (proposalId) => handleProposalAction(proposalId, "rejected");
  const handleSendForEdit = (proposalId) => handleProposalAction(proposalId, "edit");

  return (
    <Box className="aif-layout">
      {/* تم تحديد مدة عرض التوست الافتراضية (duration) بـ 1500 ملي ثانية لضمان اختفائها التلقائي السريع */}
      <Toaster position="top-right" reverseOrder={false} toastOptions={{ duration: 1500 }} />
      <Header />
      <Sidebar />
      <Box component="main" className="aif-main">
        {loading && (
          <Box className="aif-loading">
            <CircularProgress />
          </Box>
        )}
        {!loading && error && (
          <Box className="aif-error">
            <Typography>{error}</Typography>
          </Box>
        )}
        {!loading && !error && data && (
          <AIFilterContent
            data={data}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            actionLoadingKey={actionLoadingKey}
            onApprove={handleApprove}
            onReject={handleReject}
            onSendForEdit={handleSendForEdit}
          />
        )}
      </Box>
    </Box>
  );
}

function AIFilterContent({
  data,
  selectedIndex,
  setSelectedIndex,
  actionLoadingKey,
  onApprove,
  onReject,
  onSendForEdit,
}) {
  const { proposal, department, team, similarities } = data;
  const selected = similarities[selectedIndex];

  const techList =
    proposal.technologies
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) || [];

  const isApproveLoading = actionLoadingKey === `${proposal.id}-approved`;
  const isRejectLoading = actionLoadingKey === `${proposal.id}-rejected`;
  const isEditLoading = actionLoadingKey === `${proposal.id}-edit`;
  const isAnyActionLoading = isApproveLoading || isRejectLoading || isEditLoading;

  return (
    <Box className="aif-content">
      <Typography className="aif-page-title">{proposal.title}</Typography>

      {/* Summary Banner */}
      <Box className="aif-summary-banner">
        <Box className="aif-summary-left">
          <Typography className="aif-summary-desc">{proposal.description}</Typography>
          <Box className="aif-tags">
            {department?.name && <Chip label={department.name} className="aif-chip" />}
            {techList.map((t) => (
              <Chip key={t} label={t} className="aif-chip" />
            ))}
          </Box>
        </Box>
        <Box className="aif-summary-right">
          <Typography className="aif-team-label">
            Team {team?.name || "Alpha"} , Members: {team?.members_count ?? 0}
          </Typography>
          <Box className="aif-avatar-row">
            <AvatarGroup max={4} className="aif-avatar-group">
              {team?.members?.map((m) => (
                <Avatar key={m.id} src={m.image || undefined} alt={m.name}>
                  {m.name?.[0]?.toUpperCase()}
                </Avatar>
              ))}
            </AvatarGroup>
          </Box>
          <Typography className="aif-date">{proposal.submitted_at || "Nov 5, 2025"}</Typography>
        </Box>
      </Box>

      {/* Body: Card List + Side Details Panel */}
      <Box className="aif-body">
        <Box className="aif-list">
          {similarities.map((sim, idx) => (
            <Box
              key={sim.proposal_id}
              className={`aif-card ${idx === selectedIndex ? "aif-card-active" : ""}`}
              onClick={() => setSelectedIndex(idx)}
            >
              <Box className="aif-card-info">
                <Typography className="aif-card-title">{sim.title}</Typography>
                <Typography className="aif-card-desc">{sim.description}</Typography>
                <Box className="aif-tags">
                  {sim.technologies
                    ?.split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .map((t) => (
                      <Chip key={t} size="small" label={t} className="aif-chip-sm" />
                    ))}
                </Box>
              </Box>
              
              {/* Custom Badge to perfectly match image */}
              <Box className={`aif-badge-container aif-badge-${sim.similarity_color}`}>
                <Box className="aif-badge-left">
                  <Typography className="aif-badge-percent">
                    {Math.round(sim.similarity_score)}%
                  </Typography>
                </Box>
                <Box className="aif-badge-right">
                  <Typography className="aif-badge-label">
                    {sim.similarity_level === "high"
                      ? "High"
                      : sim.similarity_level === "medium"
                      ? "Medium"
                      : "Low"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Side Detail Panel */}
        {selected && (
          <Box className="aif-detail-panel">
            <Typography className="aif-detail-title">{selected.title}</Typography>

            <Box className="aif-donut-wrap">
              <DonutChart percentage={selected.similarity_score} color={selected.similarity_color} />
            </Box>

            <Box className="aif-status-row">
              <Typography className="aif-status-label">Status:</Typography>
              <Typography className={`aif-status-value aif-status-${selected.similarity_color}`}>
                {selected.similarity_level === "high" ? "High Risk" : selected.similarity_level === "medium" ? "Medium Risk" : "Low Risk"}
              </Typography>
            </Box>

            <Box className="aif-scores">
              {Object.entries(selected.section_scores || {}).map(([key, value]) => (
                <Box key={key} className="aif-score-row">
                  <Typography className="aif-score-label">
                    {SECTION_LABELS[key] || key}:
                  </Typography>
                  <Box className="aif-score-bar-bg">
                    <Box
                      className="aif-score-bar-fill"
                      style={{ width: `${value}%`, backgroundColor: scoreBarColor(key) }}
                    />
                  </Box>
                  <Typography className="aif-score-value">{Math.round(value)}%</Typography>
                </Box>
              ))}
            </Box>

            <Typography className="aif-similar-to">
              Similar To: <span className="aif-similar-highlight">AI Medical Assistant (Team Delta)</span>
            </Typography>

            <Box className="aif-insights">
              <Typography className="aif-insights-title">AI Insights</Typography>
              <Typography className="aif-insights-text">
                The idea shares similar core functionality and target domain with a previously submitted project. However, implementation approach and features show moderate variation.
              </Typography>
            </Box>

            {/* Action Buttons arranged exactly like the design */}
            <Box className="aif-actions-wrapper">
              <Box className="aif-actions-row">
                <Button
                  className="aif-btn-approve"
                  disabled={isAnyActionLoading}
                  onClick={() => onApprove(proposal.id)}
                >
                  {isApproveLoading ? "..." : "Approve Idea"}
                </Button>
                <Button
                  className="aif-btn-reject"
                  disabled={isAnyActionLoading}
                  onClick={() => onReject(proposal.id)}
                >
                  {isRejectLoading ? "..." : "Reject Idea"}
                </Button>
              </Box>
              <Button
                className="aif-btn-edit"
                disabled={isAnyActionLoading}
                onClick={() => onSendForEdit(proposal.id)}
              >
                {isEditLoading ? "..." : "Send For Edit"}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}