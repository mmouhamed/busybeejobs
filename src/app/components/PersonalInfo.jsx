import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export const PersonalInfo = ({ formData, handleInputChange, onValidChange }) => {
  const [isValid, setIsValid] = useState(false);
  const t = useTranslations();

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    
    // Update the specific name field (firstName, middleName, lastName)
    const updatedFormData = { ...formData, [name]: value };
  
    // Combine first, middle, and last names into one fullName field
    const { firstName, middleName, lastName } = updatedFormData;
    
    // Construct the fullName without extra spaces
    updatedFormData.fullName = [firstName, middleName, lastName]
      .filter(Boolean) // Removes empty strings
      .join(" "); // Joins non-empty strings with a space
  
    handleInputChange({ target: { name: "fullName", value: updatedFormData.fullName } });
    handleInputChange({ target: { name, value } }); // Update individual name fields
  };
  useEffect(() => {
    const form = document.querySelector("form");
    if (form) {
      const isFormValid = form.checkValidity();
      setIsValid(isFormValid);
      onValidChange(isFormValid);
    }
  }, [formData, onValidChange]);

  return (
    <div className="section">
      <h2>{t("PersonalInfo.header", "Personal Info")}</h2>
      <form>
        <br />
        <label>
          {t(
            "PersonalInfo.fullNameInstructions",
            "Please enter your full legal name as shown on a government-issued ID"
          )}
        </label>
        <div className="name-fields">
          <label>
            {t("PersonalInfo.firstName", "First Name:")}
            <input
              type="text"
              name="firstName"
              value={formData.firstName || ""}
              required
              onChange={handleNameChange}
            />
          </label>
          <label>
            {t("PersonalInfo.middleName", "Middle Name:")}
            <input
              type="text"
              name="middleName"
              value={formData.middleName || ""}
              onChange={handleNameChange}
            />
          </label>
          <label>
            {t("PersonalInfo.lastName", "Last Name:")}
            <input
              type="text"
              name="lastName"
              value={formData.lastName || ""}
              required
              onChange={handleNameChange}
            />
          </label>
        </div>
        <label>
          {t("PersonalInfo.address", "Address:")}
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            required
            onChange={handleInputChange}
          />
        </label>
        <label>
          {t("PersonalInfo.phone", "Phone:")}
          <input
            type="tel"
            name="phone"
            value={formData.phone || ""}
            required
            onChange={handleInputChange}
          />
        </label>
        <label>
          {t("PersonalInfo.sex", "Sex:")}
          <select
            name="sex"
            value={formData.sex || ""}
            required
            onChange={handleInputChange}
          >
            <option value="" disabled>
              {t("PersonalInfo.select", "Select")}
            </option>
            <option value="Male">{t("PersonalInfo.male", "Male")}</option>
            <option value="Female">{t("PersonalInfo.female", "Female")}</option>
          </select>
        </label>
        <label>
          {t("PersonalInfo.dob", "DOB:")}
          <input
            type="date"
            name="dob"
            value={formData.dob || ""}
            required
            onChange={handleInputChange}
          />
        </label>
        <label>
          {t("PersonalInfo.ssn", "SSN:")}
          <input
            type="text"
            name="ssn"
            value={formData.ssn || ""}
            required
            onChange={handleInputChange}
          />
        </label>
      </form>
    </div>
  );
};
