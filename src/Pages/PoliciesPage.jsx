import React from "react";
import {
  FaBookOpen,
  FaUser,
  FaUsers,
  FaFileAlt,
  FaShieldAlt,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaDesktop,
  FaUserLock,
  FaExchangeAlt
} from "react-icons/fa";

import StudentSidebar from "../Components/StudentSidebar";
import "./policies.css"; // 👈 مهم جدًا

const policiesData = [
  {
    icon: FaUser,
    title: "User Responsibilities",
    rules: [
      "Students must provide accurate and complete information.",
      "Each user is responsible for maintaining the confidentiality of their account.",
      "Any misuse of the platform may result in restricted access."
    ]
  },
  {
    icon: FaUsers,
    title: "Team Formation Rules",
    rules: [
      "Each team must follow the minimum and maximum number of members defined.",
      "Students are responsible for sending and accepting team requests appropriately.",
      "Once a team is finalized, changes may require supervisor approval."
    ]
  },
  {
    icon: FaFileAlt,
    title: "Project Submission Guidelines",
    rules: [
      "All required files must be submitted before the specified deadlines.",
      "Late submissions may be subject to penalties based on course regulations.",
      "Submitted work must be original and comply with academic integrity policies."
    ]
  },
  {
    icon: FaShieldAlt,
    title: "Academic Integrity",
    rules: [
      "Plagiarism, copying, or submitting work that is not your own is strictly prohibited.",
      "Any violation may lead to academic penalties as per university rules."
    ]
  },
  {
    icon: FaChalkboardTeacher,
    title: "Final Discussion Policy",
    rules: [
      "Each team will be assigned a discussion committee consisting of three professors and one teaching assistant.",
      "The schedule (date, time, and location) will be announced through the platform.",
      "Attendance is mandatory for all team members."
    ]
  },
  {
    icon: FaClipboardCheck,
    title: "Evaluation & Feedback",
    rules: [
      "Project evaluation is divided into coursework and final discussion.",
      "Coursework grades are assigned by the supervisor.",
      "Final discussion grades are determined by the assigned committee.",
      "Feedback provided by supervisors is part of the evaluation process."
    ]
  },
  {
    icon: FaDesktop,
    title: "System Usage Rules",
    rules: [
      "Users must not attempt to misuse, hack, or disrupt the platform.",
      "Any suspicious activity may result in account suspension."
    ]
  },
  {
    icon: FaUserLock,
    title: "Privacy & Data Usage",
    rules: [
      "User data is used solely for academic and administrative purposes.",
      "The platform does not share personal data with external parties."
    ]
  },
  {
    icon: FaExchangeAlt,
    title: "Changes to Policies",
    rules: [
      "The platform administration reserves the right to update these policies when necessary.",
      "Users will be notified of any significant changes."
    ]
  }
];

export default function GraduationProjectPolicies() {
  return (
    <div className="page-container">

      {/* Sidebar */}
      <div className="sidebar-wrapper">
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <main className="main-contentt">

        <h1 className="page-title">
          <FaBookOpen />
          Terms & Policies
        </h1>

        {/* Introduction */}
        <div className="intro-card">

          <div className="intro-header">
            <div className="intro-icon">
              <FaBookOpen />
            </div>

            <h2 className="intro-title">Introduction</h2>
          </div>

          <div className="intro-text">
            <p>
              This platform is designed to support students, teaching assistants, and academic staff in managing graduation projects, team collaboration, and evaluation processes.
            </p>

            <p>
              By using this system, you agree to follow all academic and platform-related rules stated below.
            </p>
          </div>

        </div>

        {/* Policies Grid */}
        <div className="policies-grid">

          {policiesData.map((policy, index) => {
            const IconComponent = policy.icon;

            return (
              <div className="policy-card" key={index}>

                <div className="policy-header">
                  <div className="policy-icon">
                    <IconComponent />
                  </div>

                  <h2 className="policy-title">
                    {policy.title}
                  </h2>
                </div>

                <div className="divider"></div>

                <ul className="rules">
                  {policy.rules.map((rule, i) => (
                    <li key={i}>{rule}</li>
                  ))}
                </ul>

              </div>
            );
          })}

        </div>

      </main>

    </div>
  );
}