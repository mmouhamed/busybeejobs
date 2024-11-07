"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export const W4I9Info = ({ formData, handleInputChange, onValidChange }) => {
  const [isValid, setIsValid] = useState(false);
  const t = useTranslations("W4I9Info");

  const handleInputChangeInternal = (e) => {
    handleInputChange(e);
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

  const handleNumberInput = (e) => {
    // Ensure that the input is a valid number and prevent invalid inputs
    e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    handleInputChangeInternal(e);
  };

  return (
    <div className="section">
      <h2>{t("header")}</h2>
      <form>
        <label>
          {t("maritalStatus")}
          <select
            name="maritalStatus"
            value={formData.maritalStatus || ''}
            required
            onChange={handleInputChangeInternal}
          >
            <option value="" disabled>
              {t("select")}
            </option>
            <option value="Married">{t("married")}</option>
            <option value="Single">{t("single")}</option>
          </select>
        </label>
        <label>
          {t("dependents")}
          <input
            type="number"
            name="dependents"
            value={formData.dependents || ''}
            required
            onChange={handleNumberInput}
          />
        </label>
        <label>
          {t("occupationType")}
          <select
            name="occupationType"
            value={formData.occupationType || ''}
            required
            onChange={handleInputChangeInternal}
          >
            <option value="" disabled>
              {t("select")}
            </option>
            <option value="Part time">{t("partTime")}</option>
            <option value="Full time">{t("fullTime")}</option>
          </select>
        </label>
        <label>
          {t("wacNumber")}
          <input
            type="text"
            name="wacNumber"
            value={formData.wacNumber || ''}
            required
            onChange={handleInputChangeInternal}
            placeholder={t("wacPlaceholder")}
          />
        </label>
        <label>
          {t("wacExpiration")}
          <input
            type="date"
            name="wacExpiration"
            value={formData.wacExpiration || ''}
            required
            onChange={handleInputChangeInternal}
          />
        </label>
      </form>
    </div>
  );
};
