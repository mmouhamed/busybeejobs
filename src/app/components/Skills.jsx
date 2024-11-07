import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export const Skills = ({ formData, handleInputChange, onValidChange }) => {
  const [skillsData, setSkillsData] = useState({
    workedAsCleaner: false,
    bufferMachine: false,
    carpetCleaningMachine: false,
    vacuumCleaner: false,
    other: false,
    otherSpec: '',
  });
  const [isValid, setIsValid] = useState(false);
  const t = useTranslations("Skills");

  useEffect(() => {
    if (formData.skills) {
      setSkillsData({
        workedAsCleaner: formData.skills.workedAsCleaner || false,
        bufferMachine: formData.skills.bufferMachine || false,
        carpetCleaningMachine: formData.skills.carpetCleaningMachine || false,
        vacuumCleaner: formData.skills.vacuumCleaner || false,
        other: formData.skills.other || false,
        otherSpec: formData.skills.otherSpec || '',
      });
    }
  }, [formData]);

  useEffect(() => {
    validateForm(skillsData);
  }, [skillsData]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const updatedSkillsData = { ...skillsData, [name]: checked };
    if (name === "other" && !checked) {
      updatedSkillsData.otherSpec = '';
    }
    setSkillsData(updatedSkillsData);
    handleInputChange({ target: { name: 'skills', value: updatedSkillsData } });
    validateForm(updatedSkillsData);
  };

  const handleTextInputChange = (e) => {
    const { name, value } = e.target;
    const updatedSkillsData = { ...skillsData, [name]: value };
    setSkillsData(updatedSkillsData);
    handleInputChange({ target: { name: 'skills', value: updatedSkillsData } });
    validateForm(updatedSkillsData);
  };

  const validateForm = (data) => {
    const isFormValid = !data.other || (data.other && data.otherSpec.trim() !== '');
    setIsValid(isFormValid);
    onValidChange(isFormValid);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{t("header")}</h2>
      <form className="space-y-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="workedAsCleaner"
            name="workedAsCleaner"
            checked={skillsData.workedAsCleaner}
            onChange={handleCheckboxChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="workedAsCleaner" className="ml-2 block text-sm text-gray-900">
            {t("workedAsCleaner")}
          </label>
        </div>

        <fieldset className="border border-gray-200 rounded-md p-4">
          <legend className="text-lg font-medium text-gray-900 px-2">{t("operatedOrTrained")}</legend>
          <div className="space-y-4">
            {['bufferMachine', 'carpetCleaningMachine', 'vacuumCleaner', 'other'].map((skill) => (
              <div key={skill} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id={skill}
                    name={skill}
                    type="checkbox"
                    checked={skillsData[skill]}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor={skill} className="font-medium text-gray-700">{t(skill)}</label>
                </div>
              </div>
            ))}
            {skillsData.other && (
              <input
                type="text"
                name="otherSpec"
                value={skillsData.otherSpec}
                onChange={handleTextInputChange}
                placeholder={t("otherSpecPlaceholder")}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            )}
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Skills;