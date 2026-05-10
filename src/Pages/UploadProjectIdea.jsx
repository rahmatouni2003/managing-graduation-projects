import {
  FaPaperclip,
  FaChevronDown,
  FaLightbulb,
} from "react-icons/fa";
import "./uploadProjectIdea.css";

export default function UploadProjectIdea() {
  return (
    <div className="upload-page">
      {/* Header */}
      <div className="upload-header">
        <div>
          <div className="title-row">
            <h1>Upload Project Idea</h1>
            <FaLightbulb className="bulb-icon" />
          </div>

          <p>
            Start your graduation project by submitting your ideas.
          </p>
        </div>


      </div>

      {/* Main Card */}
      <div className="upload-card">
        <div className="form-grid">

          {/* LEFT SIDE */}
          <div className="form-column">

            <div className="field-group">
              <label>
                Project Title <span>*</span>
              </label>

              <input
                type="text"
                placeholder="Enter your project name"
              />
            </div>

            <div className="field-group">
              <label>
                Project Description <span>*</span>
              </label>

              <textarea
                placeholder="Write a short overview of your project idea and what it aims to achieve."
              ></textarea>
            </div>

            <div className="field-group">
              <label>
                Problem Statement <span>*</span>
              </label>

              <textarea
                placeholder="Describe the main problem"
              ></textarea>
            </div>

            <div className="field-group">
              <label>
                Department <span>*</span>
              </label>

              <div className="select-wrapper">
                <select>
                  <option>CS</option>
                  <option>IT</option>
                  <option>IS</option>
                </select>

                <FaChevronDown className="select-icon" />
              </div>
            </div>

            <div className="field-group">
              <label>
                Proposed Solution / Objectives <span>*</span>
              </label>

              <textarea
                placeholder="Explain how your project will solve the problem and what objectives it will achieve."
              ></textarea>
            </div>

            <div className="field-group">
              <label>Project Type</label>

              <div className="select-wrapper">
                <select>
                  <option>Application</option>
                  <option>Website</option>
                  <option>AI Model</option>
                </select>

                <FaChevronDown className="select-icon" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="form-column">

            <div className="field-group">
              <label>
                Team Leader <span>*</span>
              </label>

              <div className="select-wrapper">
                <select>
                  <option>Student Name</option>
                </select>

                <FaChevronDown className="select-icon" />
              </div>
            </div>

            <div className="field-group">
              <label>
                Category <span>*</span>
              </label>

              <input
                type="text"
                value="Software Engineering"
                readOnly
              />
            </div>

            <div className="field-group">
              <label>
                Tools / Technologies <span>*</span>
              </label>

              <div className="tools-box">
                <div className="tools-list">
                  <span>Figma</span>
                  <span>React</span>
                  <span>Python</span>
                  <span>Firebase</span>
                </div>

                <button>+ Add Tool</button>
              </div>
            </div>

            <div className="field-group">
              <label>Attach Files (if any) :</label>

              <div className="upload-box">
                <FaPaperclip />

                <span>
                  Drag & drop your file here or click to upload
                </span>
              </div>
            </div>

            <div className="field-group">
              <label>Project Picture :</label>

              <div className="upload-box">
                <FaPaperclip />

                <span>
                  Drag & drop picture here or click to upload
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="submit-wrapper">
          <button className="submit-btn">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}