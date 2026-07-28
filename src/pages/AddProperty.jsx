import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiMaximize,
  FiUser,
  FiPhone,
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
} from "react-icons/fi";

// Zod Validation Schema
const propertySchema = z.object({
  uploaderRole: z.enum(["Owner", "Agent", "Builder"], {
    required_error: "Please select who is uploading.",
  }),
  intent: z.enum(["Rent/Lease", "Sell"], {
    required_error: "Please select an intent.",
  }),
  category: z.enum(["Residential", "Commercial"], {
    required_error: "Please select a category.",
  }),
  propertyType: z.string().min(1, "Please select a property type."),
  bhk: z.string().optional(),
  sqft: z.string().min(1, "Square footage is required."),
  location: z.string().min(5, "Please enter a detailed location."),
  price: z.string().min(1, "Price is required."),
  details: z
    .string()
    .min(20, "Please provide at least 20 characters of details."),
  sellerName: z.string().min(2, "Seller name is required."),
  sellerNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number."),
});

const RESIDENTIAL_TYPES = ["Flat/Apartment", "Individual House", "Plot/Land"];
const COMMERCIAL_TYPES = [
  "Office",
  "Retail",
  "Plot/Land",
  "Storage",
  "Industry",
  "Other",
];

export default function AddProperty() {
  const [images, setImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      uploaderRole: "Owner",
      intent: "Sell",
      category: "Residential",
      propertyType: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedType = watch("propertyType");
  const showBhk =
    !["Plot/Land", "Storage", "Industry", "Retail"].includes(selectedType) &&
    selectedType !== "";

  // Reset property type when category changes to prevent invalid states
  useEffect(() => {
    setValue("propertyType", "");
  }, [selectedCategory, setValue]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 8) {
      setImageError("You can only upload up to 8 images.");
      return;
    }
    setImageError("");

    // Create preview URLs
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substring(7),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (idToRemove) => {
    setImages((prev) => prev.filter((img) => img.id !== idToRemove));
    if (imageError) setImageError("");
  };

  const onSubmit = async (data) => {
    if (images.length < 2) {
      setImageError(
        "Please upload at least 2 images to showcase the property.",
      );
      return;
    }

    setIsSubmitting(true);
    // Mock API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form Data:", data);
    console.log(
      "Images:",
      images.map((i) => i.file),
    );

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Clean up previews to avoid memory leaks
    images.forEach((img) => URL.revokeObjectURL(img.preview));
  };

  // Shared component for Custom Radio Buttons (Cards)
  const RadioCard = ({ name, value, currentVal, label, colSpan = 1 }) => {
    const isSelected = currentVal === value;
    return (
      <label className={`cursor-pointer group relative col-span-${colSpan}`}>
        <input
          type="radio"
          value={value}
          className="peer sr-only"
          {...register(name)}
        />
        <div
          className={`
    p-4 rounded-xl border-2 text-center transition-all duration-200
    ${
      isSelected
        ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-lg"
        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
    }
  `}
        >
          <span className="font-semibold text-sm">{label || value}</span>
        </div>
      </label>
    );
  };

  if (submitSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto py-20 px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100"
        >
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Property Listed Successfully!
          </h2>
          <p className="text-gray-500 mb-8">
            Your property is now under review and will be live shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            Post Another Property
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[900px] mx-auto pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Post Your Property
        </h1>
        <p className="text-gray-500 mt-2">
          Fill in the details below to list your property on the market.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
        {/* SECTION 1: Basic Classification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">
              1
            </span>
            Basic Details
          </h2>

          <div className="space-y-6">
            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Who is uploading?
              </label>
              <div className="grid grid-cols-3 gap-3">
                <RadioCard
                  name="uploaderRole"
                  value="Owner"
                  currentVal={watch("uploaderRole")}
                />
                <RadioCard
                  name="uploaderRole"
                  value="Agent"
                  currentVal={watch("uploaderRole")}
                />
                <RadioCard
                  name="uploaderRole"
                  value="Builder"
                  currentVal={watch("uploaderRole")}
                />
              </div>
            </div>

            {/* Intent & Category */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Property Intent
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <RadioCard
                    name="intent"
                    value="Sell"
                    currentVal={watch("intent")}
                  />
                  <RadioCard
                    name="intent"
                    value="Rent/Lease"
                    currentVal={watch("intent")}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Property Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <RadioCard
                    name="category"
                    value="Residential"
                    currentVal={selectedCategory}
                  />
                  <RadioCard
                    name="category"
                    value="Commercial"
                    currentVal={selectedCategory}
                  />
                </div>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Property Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(selectedCategory === "Residential"
                  ? RESIDENTIAL_TYPES
                  : COMMERCIAL_TYPES
                ).map((type) => (
                  <RadioCard
                    key={type}
                    name="propertyType"
                    value={type}
                    currentVal={selectedType}
                  />
                ))}
              </div>
              {errors.propertyType && (
                <p className="mt-2 text-xs text-red-500 font-medium">
                  {errors.propertyType.message}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: Property Specifics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">
              2
            </span>
            Property Specifics
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <AnimatePresence mode="popLayout">
              {showBhk && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    BHK
                  </label>
                  <select
                    {...register("bhk")}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all"
                  >
                    <option value="">Select BHK</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5+">5+ BHK</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Square Footage
              </label>
              <div className="relative">
                <FiMaximize className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  placeholder="e.g. 1500"
                  {...register("sqft")}
                  className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                    errors.sqft
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-50"
                  }`}
                />
              </div>
              {errors.sqft && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.sqft.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (in ₹)
              </label>
              <div className="relative">
                <FiDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  placeholder="e.g. 7500000"
                  {...register("price")}
                  className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                    errors.price
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-50"
                  }`}
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className={showBhk ? "" : "sm:col-span-2"}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Street, Area, City"
                  {...register("location")}
                  className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                    errors.location
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-50"
                  }`}
                />
              </div>
              {errors.location && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Details
            </label>
            <textarea
              rows="4"
              placeholder="Describe the property, amenities, nearby facilities..."
              {...register("details")}
              className={`w-full bg-gray-50 px-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white resize-none ${
                errors.details
                  ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                  : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-50"
              }`}
            />
            {errors.details && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.details.message}
              </p>
            )}
          </div>
        </motion.div>

        {/* SECTION 3: Contact & Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100"
        >
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">
              3
            </span>
            Seller & Media
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Seller Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("sellerName")}
                  className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                    errors.sellerName
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-50"
                  }`}
                />
              </div>
              {errors.sellerName && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.sellerName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Seller Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="10-digit number"
                  {...register("sellerNumber")}
                  className={`w-full bg-gray-50 pl-11 pr-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-4 focus:bg-white ${
                    errors.sellerNumber
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-50"
                  }`}
                />
              </div>
              {errors.sellerNumber && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.sellerNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* Photo Upload Zone */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Property Photos
              </label>
              <span className="text-xs font-medium text-gray-500">
                Min 2, Max 8 ({images.length}/8)
              </span>
            </div>

            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                imageError
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-indigo-300"
              }`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={images.length >= 8}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-indigo-500 mb-2">
                  <FiUploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  Click or drag images to upload
                </p>
                <p className="text-xs text-gray-500">JPG, PNG up to 5MB</p>
              </div>
            </div>

            {imageError && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-xs font-medium">
                <FiAlertCircle className="w-4 h-4 shrink-0" />
                {imageError}
              </div>
            )}

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="relative group rounded-xl overflow-hidden aspect-[4/3] border border-gray-200"
                  >
                    <img
                      src={img.preview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Form Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#0066FF] hover:bg-[#0055D4] text-white px-10 py-4 rounded-xl text-base font-semibold transition-all duration-300 shadow-[0_8px_20px_rgb(0,102,255,0.25)] hover:shadow-[0_8px_25px_rgb(0,102,255,0.35)] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none flex items-center gap-2"
          >
            {isSubmitting ? (
              <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              "Post Property"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
