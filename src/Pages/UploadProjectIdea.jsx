const UploadProjectIdea = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">
            Upload Project Idea <span>💡</span>
          </h2>
          <p className="text-sm text-gray-500">
            Start your graduation project by submitting your idea.
          </p>
        </div>

        <img
          src="https://i.pravatar.cc/40"
          className="w-10 h-10 rounded-full"
        />
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl p-6 shadow">
        <div className="grid grid-cols-2 gap-6">
          {/* Left */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Enter your project name"
                className="w-full border border-[#D9D9D9] rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Project Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Write a short overview of your project idea and what it aims to achieve."
                className="w-full border border-[#D9D9D9] rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Problem Statement <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Describe the main problem"
                className="w-full border border-[#D9D9D9] rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Department <span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-[#D9D9D9] rounded p-2 mt-1">
                <option>CS</option>
                <option>IT</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Proposed Solution / Objectives{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Explain how your project will solve the problem"
                className="w-full border border-[#D9D9D9] rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Project Type <span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-[#D9D9D9] rounded p-2 mt-1">
                <option>Application</option>
                <option>Research</option>
              </select>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Team Name <span className="text-red-500">*</span>
              </label>
              <input
                placeholder="Team Alpha"
                className="w-full border border-[#D9D9D9] rounded p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Team Leader <span className="text-red-500">*</span>
              </label>
              <select className="w-full border border-[#D9D9D9] rounded p-2 mt-1">
                <option>Student Name</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                value="Software Engineering"
                className="w-full border border-[#D9D9D9] rounded p-2 mt-1"
                readOnly
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Tools / Technologies <span className="text-red-500">*</span>
              </label>
              <div className="border border-[#D9D9D9] rounded p-2 mt-1">
                <div className="flex gap-2 flex-wrap">
                  {["Figma", "React", "Python", "Firebase"].map((tool) => (
                    <span
                      key={tool}
                      className="bg-gray-100 px-2 py-1 rounded text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <button className="text-xs text-blue-600 mt-2">
                  + Add Tool
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Attach Files (if any)
              </label>
              <div className="border border-dashed border-[#D9D9D9] rounded p-4 text-center text-sm text-gray-500 mt-1">
                Drag & drop your file here or click to upload
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">
                Project Picture
              </label>
              <div className="border border-dashed border-[#D9D9D9] rounded p-4 text-center text-sm text-gray-500 mt-1">
                Drag & drop picture here or click to upload
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-6">
          <button className="bg-blue-600 text-white px-10 py-2 rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadProjectIdea;