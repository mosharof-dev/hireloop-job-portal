"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Select,
  Label,
  ListBox,
  Chip,
  Form,
  TextArea,
  TextField,
} from "@heroui/react";
import { FiUpload, FiMapPin, FiEdit2, FiX, FiBriefcase } from "react-icons/fi";
import { data } from "framer-motion/client";
import { createCompany } from "@/lib/actions/companies";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const [company, setCompany] = useState(recruiterCompany);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  // Handle Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      // FIX: Put your real ImgBB API key inside the quotes below!
      const apiKey = "7f3e5767c2e53c36b65c12bcafd71d9a";

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: imageFormData,
        },
      );

      const data = await response.json();
      if (data.success) {
        setLogoUrl(data.data.url);
      } else {
        alert("Image upload failed! Did you add your API key?");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Network error during image upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    data.logoUrl = logoUrl || company?.logoUrl;
    data.status = company && company?.status ? company.status : "Pending";
    data.recruiterId = recruiter.id;

    console.log("Final Form Data:", data);

    setCompany(data);

    const playLoad = await createCompany(data);

    if (playLoad.Indicator) {
      const newCompany = { ...data, _id: playLoad.Indicator };
      setCompany(newCompany);
      alert("Company profile saved successfully!");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-12 text-white bg-[#0a0a0a]">
      <div className="flex justify-between items-center mb-8  mx-auto">
        <div>
          <h1 className="text-2xl font-bold">My Company</h1>
          <p className="text-zinc-400 text-sm">Manage your business profile.</p>
        </div>
      </div>

      <div className=" mx-auto">
        {!company?._id ? (
          <div className="flex flex-col items-center justify-center p-12 border border-zinc-800 rounded-xl bg-[#121212] text-center">
            <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mb-4">
              <FiBriefcase className="text-2xl text-zinc-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">No Company Registered</h2>
            <p className="text-zinc-400 text-sm mb-6 max-w-md">
              Register a company profile before posting jobs.
            </p>
            <Button
              onPress={() => setIsModalOpen(true)}
              className="bg-white text-black font-medium"
            >
              Register Company
            </Button>
          </div>
        ) : (
          <div className="p-6 md:p-8 border border-zinc-800 rounded-xl bg-[#121212] flex flex-col gap-6 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              <div className="flex items-center gap-5">
                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt="Logo"
                    className="w-20 h-20 rounded-xl border border-zinc-700 object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center text-zinc-500 text-sm">
                    <FiUpload className="text-zinc-400" />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-bold mb-1">{company.name}</h2>
                  <div className="flex flex-wrap items-center gap-2 text-zinc-400 text-sm">
                    <span>{company.industry}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FiMapPin /> {company.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="flat"
                  className="bg-zinc-800 text-white"
                  onPress={() => setIsModalOpen(true)}
                >
                  <FiEdit2 className="mr-2" /> Edit Profile
                </Button>
                <Chip
                  color={
                    company.status === "Approved"
                      ? "success"
                      : company.status === "Rejected"
                        ? "danger"
                        : "warning"
                  }
                  variant="dot"
                >
                  {company.status}
                </Chip>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-sm font-medium text-zinc-400 mb-2">
                  About Company
                </h3>
                <p className="text-zinc-200 text-sm leading-relaxed">
                  {company.description}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-1">
                    Website
                  </h3>
                  <a
                    href={`https://${company.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 text-sm hover:underline"
                  >
                    {company.website}
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-400 mb-1">
                    Company Size
                  </h3>
                  <p className="text-zinc-200 text-sm">
                    {company.employeeCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#18181b] border border-zinc-800 rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start p-6 border-b border-zinc-800/50">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Company Details
                </h2>
                <p className="text-zinc-400 text-sm mt-1">
                  Enter your business details.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <Form onSubmit={onSubmit} className="p-6 flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* FIX: Removed || "" to stop React errors */}
                <TextField
                  isRequired
                  name="name"
                  className="flex flex-col gap-2 w-full"
                  defaultValue={company?.name}
                >
                  <Label className="text-sm font-medium text-zinc-200">
                    Company Name
                  </Label>
                  <Input
                    placeholder="e.g. Acme Corp"
                    className="bg-[#27272a] border-none rounded-lg px-3 py-2 text-white outline-none"
                  />
                </TextField>

                <div className="flex flex-col gap-2">
                  <Select
                    isRequired
                    className="w-full"
                    name="industry"
                    placeholder="Select industry"
                    defaultSelectedKeys={
                      company?.industry ? [company.industry] : []
                    }
                    classNames={{ trigger: "bg-[#27272a] border-none" }}
                  >
                    <Label className="text-sm font-medium text-zinc-200">
                      Industry / Category
                    </Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox className="bg-[#27272a]">
                        <ListBox.Item id="Technology" textValue="Technology">
                          Technology
                        </ListBox.Item>
                        <ListBox.Item id="Finance" textValue="Finance">
                          Finance
                        </ListBox.Item>
                        <ListBox.Item id="Healthcare" textValue="Healthcare">
                          Healthcare
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <TextField
                  isRequired
                  name="website"
                  className="flex flex-col gap-2 w-full"
                  defaultValue={company?.website}
                >
                  <Label className="text-sm font-medium text-zinc-200">
                    Website URL
                  </Label>
                  <div className="flex">
                    <span className="bg-[#27272a] text-zinc-400 text-sm px-3 py-2 rounded-l-lg border-r border-zinc-700 flex items-center">
                      https://
                    </span>
                    <Input
                      placeholder="www.company.com"
                      className="bg-[#27272a] rounded-r-lg border-none px-3 py-2 w-full text-white outline-none"
                    />
                  </div>
                </TextField>

                <TextField
                  isRequired
                  name="location"
                  className="flex flex-col gap-2 w-full"
                  defaultValue={company?.location}
                >
                  <Label className="text-sm font-medium text-zinc-200">
                    Location
                  </Label>
                  <div className="flex items-center bg-[#27272a] rounded-lg px-3">
                    <FiMapPin className="text-zinc-400 mr-2" />
                    <Input
                      placeholder="City, Country"
                      className="bg-transparent border-none py-2 w-full text-white outline-none"
                    />
                  </div>
                </TextField>

                <div className="flex flex-col gap-2">
                  <Select
                    isRequired
                    className="w-full"
                    name="employeeCount"
                    placeholder="Select range"
                    defaultSelectedKeys={
                      company?.employeeCount ? [company.employeeCount] : []
                    }
                    classNames={{ trigger: "bg-[#27272a] border-none" }}
                  >
                    <Label className="text-sm font-medium text-zinc-200">
                      Employee Count Range
                    </Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox className="bg-[#27272a]">
                        <ListBox.Item
                          id="1-10 employees"
                          textValue="1-10 employees"
                        >
                          1-10 employees
                        </ListBox.Item>
                        <ListBox.Item
                          id="11-50 employees"
                          textValue="11-50 employees"
                        >
                          11-50 employees
                        </ListBox.Item>
                        <ListBox.Item
                          id="51-200 employees"
                          textValue="51-200 employees"
                        >
                          51-200 employees
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-200">
                    Company Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 border border-dashed border-zinc-600 rounded-lg flex items-center justify-center bg-[#27272a] cursor-pointer hover:border-zinc-400 transition-colors">
                      {isUploading ? (
                        <span className="text-xs text-zinc-400">...</span>
                      ) : (
                        <FiUpload className="text-zinc-400" />
                      )}
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                        accept="image/png, image/jpeg"
                      />
                    </div>
                    <div className="text-xs text-zinc-400">
                      <p className="text-zinc-200 font-medium">Upload image</p>
                      <p>PNG, JPG up to 5MB</p>
                      {(logoUrl || company?.logoUrl) && (
                        <span className="text-green-500 mt-1 block">
                          Image Ready!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <TextField
                isRequired
                name="description"
                className="flex flex-col gap-2 w-full"
                defaultValue={company?.description}
              >
                <Label className="text-sm font-medium text-zinc-200">
                  Brief Description
                </Label>
                <TextArea
                  placeholder="Tell us about your company's mission..."
                  className="bg-[#27272a] border-none rounded-lg px-3 py-2 w-full text-white min-h-25 outline-none resize-none"
                />
              </TextField>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/50 mt-2">
                <Button
                  variant="flat"
                  className="bg-transparent text-white border border-zinc-700 hover:bg-zinc-800"
                  onPress={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-white text-black font-semibold"
                >
                  Save Company
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
