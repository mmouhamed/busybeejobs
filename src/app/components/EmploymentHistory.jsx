"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export const EmploymentHistory = ({ formData, handleInputChange, onValidChange }) => {
  const [employmentRecords, setEmploymentRecords] = useState(formData.employmentHistory || [
    { employerName: '', employerNumber: '', supervisor: '', jobTitle: '', startDate: '', endDate: '', reasonForLeaving: '' }
  ]);
  const [isValid, setIsValid] = useState(false);
  const t = useTranslations("EmploymentHistory");

  // Sync formData with local state
  useEffect(() => {
    if (Array.isArray(formData.employmentHistory)) {
      setEmploymentRecords(formData.employmentHistory);
    } else {
      setEmploymentRecords([
        { employerName: '', employerNumber: '', supervisor: '', jobTitle: '', startDate: '', endDate: '', reasonForLeaving: '' }
      ]);
    }
  }, [formData.employmentHistory]);

  useEffect(() => {
    validateForm();
  }, [employmentRecords]);

  const handleRecordChange = (index, e) => {
    const { name, value } = e.target;
    const newRecords = [...employmentRecords];
    newRecords[index] = { ...newRecords[index], [name]: value };
    setEmploymentRecords(newRecords);
    handleInputChange({ target: { name: 'employmentHistory', value: newRecords } }); // Update parent state
    validateForm();
  };

  const addEmploymentRecord = () => {
    setEmploymentRecords([
      ...employmentRecords,
      { employerName: '', employerNumber: '', supervisor: '', jobTitle: '', startDate: '', endDate: '', reasonForLeaving: '' }
    ]);
  };

  const deleteEmploymentRecord = (index) => {
    const newRecords = employmentRecords.filter((_, i) => i !== index);
    setEmploymentRecords(newRecords);
    handleInputChange({ target: { name: 'employmentHistory', value: newRecords } }); // Update parent state
    validateForm();
  };

  const validateForm = () => {
    const isFormValid = employmentRecords.every(record => {
      return Object.values(record).every(value => value.trim() !== '');
    });
    setIsValid(isFormValid);
    onValidChange(isFormValid);
  };

  return (
    <div className="employment-history-container">
      <h2>{t("header")}</h2>

      {employmentRecords.map((record, index) => (
        <div key={index} className="employment-record">
          <div className="record-fields">
            <label htmlFor={`employerName-${index}`}>
              {t("employerName")}
              <input
                type="text"
                id={`employerName-${index}`}
                name="employerName"
                value={record.employerName}
                required
                onChange={(e) => handleRecordChange(index, e)}
              />
            </label>
            <label htmlFor={`employerNumber-${index}`}>
              {t("employerNumber")}
              <input
                type="text"
                id={`employerNumber-${index}`}
                name="employerNumber"
                value={record.employerNumber}
                required
                onChange={(e) => handleRecordChange(index, e)}
              />
            </label>
            <label htmlFor={`supervisor-${index}`}>
              {t("supervisor")}
              <input
                type="text"
                id={`supervisor-${index}`}
                name="supervisor"
                value={record.supervisor}
                required
                onChange={(e) => handleRecordChange(index, e)}
              />
            </label>
            <label htmlFor={`jobTitle-${index}`}>
              {t("jobTitle")}
              <input
                type="text"
                id={`jobTitle-${index}`}
                name="jobTitle"
                value={record.jobTitle}
                required
                onChange={(e) => handleRecordChange(index, e)}
              />
            </label>
            <label htmlFor={`startDate-${index}`}>
              {t("startDate")}
              <input
                type="date"
                id={`startDate-${index}`}
                name="startDate"
                value={record.startDate}
                required
                onChange={(e) => handleRecordChange(index, e)}
              />
            </label>
            <label htmlFor={`endDate-${index}`}>
              {t("endDate")}
              <input
                type="date"
                id={`endDate-${index}`}
                name="endDate"
                value={record.endDate}
                required
                onChange={(e) => handleRecordChange(index, e)}
              />
            </label>
            <label htmlFor={`reasonForLeaving-${index}`}>
              {t("reasonForLeaving")}
              <input
                type="text"
                id={`reasonForLeaving-${index}`}
                name="reasonForLeaving"
                value={record.reasonForLeaving}
                required
                onChange={(e) => handleRecordChange(index, e)}
              />
            </label>
          </div>
          <button
            type="button"
            className="delete-button"
            onClick={() => deleteEmploymentRecord(index)}
          >
            {t("deleteEmployment")}
          </button>
        </div>
      ))}

      <button type="button" className="add-button" onClick={addEmploymentRecord}>
        {t("addAnotherEmployment")}
      </button>
    </div>
  );
};
