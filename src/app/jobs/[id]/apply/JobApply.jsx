"use client";

import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";
import { FiLink, FiFileText, FiSend, FiBriefcase } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { submitApplication } from "@/lib/actions/application";

export const JobApply = ({ job, applicant }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
 console.log(job, "Job data");
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = Object.fromEntries(new FormData(e.currentTarget));
        
    const applicationData = {
        jobId: job?._id,
        jobTitle: job?.jobTitle,
        companyName: job?.companyName,
        companyLogo: job?.companyLogo,
        status: "applied",
        applicantId: applicant?.id,
        applicantName: applicant?.name,
        applicantEmail: applicant?.email,
        ...formData
    };
   console.log("applicationData",applicationData);
    const res = await submitApplication(applicationData);
    if(res.error) {
        toast.error("Failed to submit application. Please try again.");
        setIsSubmitting(false);
        return;
    }
    if(res.insertedId) {
        toast.success("Application submitted successfully!");
        // router.push(`/jobs/${job?._id}`);
    } else {
        toast.error("Failed to submit application. Please try again.");
        setIsSubmitting(false);
    }

    console.log("Application Data (To be sent to DB):", applicationData);

    // Simulate API call for now
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Application submitted successfully!");
    //   router.push(`/jobs/${job?._id}`);
    }, 1500);
  };

  const textInputClass =
    "w-full text-white bg-[#1A1A1D] border border-zinc-800 hover:bg-[#242426] focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 rounded-xl h-12 px-10 text-[15px] placeholder:text-zinc-600 outline-none transition-all shadow-inner";
  const textAreaClass =
    "w-full text-white bg-[#1A1A1D] border border-zinc-800 hover:bg-[#242426] focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 rounded-xl p-4 text-[15px] placeholder:text-zinc-600 outline-none transition-all shadow-inner resize-y min-h-[150px]";

  return (
    <div className="min-h-[80vh] bg-[#09090b] py-12 px-4 sm:px-6 lg:px-8 flex justify-center selection:bg-blue-500/30 font-sans">
      <div className="w-full max-w-3xl">
        {/* Header Area */}
        <div className="mb-10 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-linear-to-br from-blue-500/20 to-indigo-500/10 border border-blue-500/20 mb-2 shadow-inner">
            <FiBriefcase className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Apply for{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
              {job?.jobTitle}
            </span>
          </h1>
          <p className="text-zinc-400 text-[15px] max-w-xl mx-auto leading-relaxed">
            Please provide your details below. Make sure your links are publicly
            accessible so the employer can view them properly.
          </p>
        </div>

        {/* Form Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-linear-to-r from-blue-600/10 to-indigo-600/10 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative bg-[#121214]/90 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl">
            <Form className="flex flex-col gap-8 w-full" onSubmit={onSubmit}>
              <TextField
                isRequired
                name="resumeLink"
                type="url"
                className="w-full flex flex-col gap-2.5 relative"
                validate={(value) => {
                  if (!value) return "Resume link is required";
                  try {
                    new URL(value);
                  } catch (_) {
                    return "Please enter a valid URL (e.g. https://...)";
                  }
                  return null;
                }}
              >
                <Label className="text-zinc-300 font-bold text-sm tracking-wide uppercase">
                  Resume Link *
                </Label>
                <div className="relative group/input">
                  <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within/input:text-blue-400 transition-colors pointer-events-none z-10" />
                  <Input
                    placeholder="https://drive.google.com/... or your personal site"
                    className={textInputClass}
                  />
                </div>
                <FieldError className="text-xs text-rose-500 font-medium mt-1" />
              </TextField>

              <TextField
                name="portfolioLink"
                type="url"
                className="w-full flex flex-col gap-2.5 relative"
                validate={(value) => {
                  if (value) {
                    try {
                      new URL(value);
                    } catch (_) {
                      return "Please enter a valid URL";
                    }
                  }
                  return null;
                }}
              >
                <Label className="text-zinc-300 font-bold text-sm tracking-wide uppercase flex items-center justify-between">
                  <span>
                    Portfolio Link{" "}
                    <span className="text-zinc-500 font-normal normal-case ml-2">
                      (Optional)
                    </span>
                  </span>
                </Label>
                <div className="relative group/input">
                  <FiLink className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within/input:text-blue-400 transition-colors pointer-events-none z-10" />
                  <Input
                    placeholder="https://github.com/yourusername or behance..."
                    className={textInputClass}
                  />
                </div>
                <FieldError className="text-xs text-rose-500 font-medium mt-1" />
              </TextField>

              <TextField
                isRequired
                name="bio"
                className="w-full flex flex-col gap-2.5"
                validate={(value) => {
                  if (!value) return "A short bio is required";
                  if (value.length < 50)
                    return "Bio should be at least 50 characters long";
                  return null;
                }}
              >
                <Label className="text-zinc-300 font-bold text-sm tracking-wide uppercase">
                  Short Bio / Cover Letter *
                </Label>
                <div className="relative group/input">
                  <FiFileText className="absolute left-4 top-5 w-4 h-4 text-zinc-500 group-focus-within/input:text-blue-400 transition-colors pointer-events-none z-10" />
                  <textarea
                    name="bio"
                    placeholder="Tell us why you are a great fit for this role, your background, and your key achievements..."
                    className={`${textAreaClass} pl-10`}
                  />
                </div>
                <FieldError className="text-xs text-rose-500 font-medium mt-1" />
              </TextField>

              <div className="pt-6 border-t border-white/5 mt-2">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-indigo-600 text-white py-7 text-[16px] font-bold shadow-[0_0_30px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_-15px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 active:scale-95 border-none"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting
                      ? "Submitting Application..."
                      : "Submit Application"}{" "}
                    {!isSubmitting && <FiSend className="w-5 h-5" />}
                  </span>
                </Button>
                <p className="text-center text-xs font-medium text-zinc-500 mt-5 flex items-center justify-center gap-1.5">
                  Your application will be sent directly to{" "}
                  {job?.companyName || "the employer"}.
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
