import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export const ApplicantQuestions = ({ formData, handleInputChange, onValidChange }) => {
  const [isValid, setIsValid] = useState(false);
  const t = useTranslations("ApplicantQuestions");

  const handleInputChangeInternal = (e) => {
    const { name, type, checked, value } = e.target;
    // Check if the input is a checkbox
    if (type === 'checkbox') {
      handleInputChange({
        target: {
          name,
          value: checked, // Set value to true or false based on checked state
        },
      });
    } else {
      handleInputChange(e);
    }
  };

  // Check form validity whenever formData changes
  useEffect(() => {
    const form = document.querySelector('form');
    if (form) {
      const isFormValid = form.checkValidity();
      setIsValid(isFormValid);
      onValidChange(isFormValid);
    }
  }, [formData, onValidChange]);

  const handlePhoneInput = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    let formattedPhone = "+1 ";
    if (input.length > 1) {
      formattedPhone += input.slice(1, 4) + (input.length > 4 ? " " : "");
      formattedPhone += input.slice(4, 7) + (input.length > 7 ? " " : "");
      formattedPhone += input.slice(7, 11);
    }
    e.target.value = formattedPhone.trim();
    handleInputChangeInternal(e);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t("header")}</h2>
      <form className="space-y-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700">{t("previousEmployment")}</span>
            <input
              type="text"
              name="previousEmployment"
              value={formData.previousEmployment || ''}
              required
              onChange={handleInputChangeInternal}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="attendancePunctuality"
              checked={formData.attendancePunctuality || false}
              required
              onChange={handleInputChangeInternal}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="text-gray-700">{t("attendancePunctuality")}</span>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="eligibleForEmployment"
              checked={formData.eligibleForEmployment || false}
              required
              onChange={handleInputChangeInternal}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="text-gray-700">{t("eligibleForEmployment")}</span>
          </div>

          <label className="block">
            <span className="text-gray-700">{t("availableStartDate")}</span>
            <input
              type="date"
              name="availableStartDate"
              value={formData.availableStartDate || ''}
              required
              onChange={handleInputChangeInternal}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">{t("anotherJob")}</span>
            <input
              type="text"
              name="anotherJob"
              value={formData.anotherJob || ''}
              required
              onChange={handleInputChangeInternal}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="flexibleSchedule"
              checked={formData.flexibleSchedule || false}
              required
              onChange={handleInputChangeInternal}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="text-gray-700">{t("flexibleSchedule")}</span>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="availableForHolidays"
              checked={formData.availableForHolidays || false}
              required
              onChange={handleInputChangeInternal}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="text-gray-700">{t("availableForHolidays")}</span>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="validDriversLicense"
              checked={formData.validDriversLicense || false}
              required
              onChange={handleInputChangeInternal}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="text-gray-700">{t("validDriversLicense")}</span>
          </div>

          <label className="block">
            <span className="text-gray-700">{t("criminalRecord")}</span>
            <textarea
              name="criminalRecord"
              value={formData.criminalRecord || ''}
              required
              onChange={handleInputChangeInternal}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="3"
            ></textarea>
          </label>

          <label className="block">
            <span className="text-gray-700">{t("emergencyContactName")}</span>
            <input
              type="text"
              name="emergencyContactName"
              value={formData.emergencyContactName || ''}
              required
              onChange={handleInputChangeInternal}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">{t("emergencyContactRelation")}</span>
            <input
              type="text"
              name="emergencyContactRelation"
              value={formData.emergencyContactRelation || ''}
              required
              onChange={handleInputChangeInternal}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">{t("emergencyContactNumber")}</span>
            <input
              type="tel"
              name="emergencyContactNumber"
              placeholder={t("phonePlaceholder")}
              value={formData.emergencyContactNumber || ''}
              required
              onChange={handlePhoneInput}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        </div>
      </form>
    </div>
  );
};
