import { useState } from "react";
import Project from "../Services/Project.model";
import {
  FaExclamationTriangle,
  FaLightbulb,
  FaRegCheckCircle,
  FaRegClock,
  FaCloudUploadAlt,
  FaPaperPlane,
} from "react-icons/fa";
import "./reportProblem.css";
import StudentSidebar from '../Components/StudentSidebar'; 

export default function ReportProblemPage() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject || !description) {
      alert("Please fill in all required fields.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("description", description);

      if (attachment) {
        formData.append("attachment", attachment);
      }

      await Project.reportProblem(formData);
      alert("Report submitted successfully");

      setSubject("");
      setDescription("");
      setAttachment(null);
    } catch (error) {
      console.log(error);
      alert("Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    // الكلاس المميز الجديد لعزل الصفحة بالكامل
    <div className="report-problem-page-scope">
      <div className="report-wrapper">
        {/* السايد بار الأيسر/الأيمن الخارجي للتطبيق */}
        <div className="sidebar-wrapperr">
          <StudentSidebar />
        </div>
        
        {/* الكارت الأبيض الرئيسي الداخلي لنموذج المشكلة */}
        <div className="report-main-card">
          {/* Header Section */}
          <div className="report-header">
            <div className="header-text">
              <div className="title-row">
                <FaExclamationTriangle className="main-icon" />
                <h1>Report a Problem</h1>
              </div>
              <p>
                Let us know what went wrong. Our team will review your report and get back to you as soon as possible.
              </p>
            </div>
            
            {/* Illustration built with pure CSS */}
            <div className="header-illustration">
              <div className="illustration-clipboard">
                <div className="clipboard-clip"></div>
                <div className="clipboard-lines">
                  <div className="clip-line short-line"></div>
                  <div className="clip-grid"></div>
                </div>
              </div>
              <div className="illustration-bubble">?</div>
              <div className="illustration-check-bg">✓</div>
            </div>
          </div>

          {/* Body Content Wrapper */}
          <div className="report-body-padding">
            <div className="report-content">
              
              {/* Left: Form */}
              <div className="form-section">
                {/* Subject */}
                <div className="field-group">
                  <label>Subject <span className="required">*</span></label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Write a short title for your issue"
                  />
                </div>

                {/* Description */}
                <div className="field-group">
                  <label>Describe your issue <span className="required">*</span></label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please describe your issue in as much detail as possible..."
                  ></textarea>
                </div>

                {/* File Upload */}
                <div className="field-group">
                  <label>
                    Attach File <span className="optional">(optional)</span>
                  </label>
                  <label className="upload-box">
                    <input
                      type="file"
                      className="hidden-input"
                      onChange={(e) => setAttachment(e.target.files[0])}
                    />
                    <div className="upload-row">
                      <FaCloudUploadAlt className="upload-icon" />
                      <span className="upload-text-blue">Click to upload</span>
                      <span className="upload-text-gray">or drag and drop</span>
                    </div>
                    <p className="upload-hint">
                      {attachment ? attachment.name : "PNG, JPG or PDF (Max. 5MB)"}
                    </p>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="button-row">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setSubject("");
                      setDescription("");
                      setAttachment(null);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="submit-btn"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    <FaPaperPlane size={12} />
                    {loading ? "Submitting..." : "Submit Report"}
                  </button>
                </div>
              </div>

              {/* Right: Side Cards */}
              <div className="side-section">
                {/* Before You Submit */}
                <div className="info-card">
                  <div className="card-title">
                    <FaLightbulb className="side-icon" />
                    <h3>Before you submit</h3>
                  </div>
                  <p className="side-subtitle">Please check the following:</p>
                  <ul>
                    <li>
                      <FaRegCheckCircle className="check-icon" />
                      <span>Make sure your information is correct.</span>
                    </li>
                    <li>
                      <FaRegCheckCircle className="check-icon" />
                      <span>Provide clear details about the issue.</span>
                    </li>
                    <li>
                      <FaRegCheckCircle className="check-icon" />
                      <span>Attach screenshots if possible.</span>
                    </li>
                  </ul>
                </div>

                {/* What Happens Next */}
                <div className="info-card">
                  <div className="card-title">
                    <FaRegClock className="side-icon" />
                    <h3>What happens next?</h3>
                  </div>
                  <ul className="steps-list">
                    <li>
                      <div className="step-number">1</div>
                      <span>Your report will be sent to our support team.</span>
                    </li>
                    <li>
                      <div className="step-number">2</div>
                      <span>We will review it and may contact you for more info.</span>
                    </li>
                    <li>
                      <div className="step-number">3</div>
                      <span>You will receive a response as soon as possible.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}