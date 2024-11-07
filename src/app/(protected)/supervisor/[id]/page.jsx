"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";
import "./id.css";
import "../../../components/form.css"

const ApplicationDetail = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations();

  const [siteLocation, setSiteLocation] = useState("");
  const [position, setPosition] = useState("");
  const [hireDate, setHireDate] = useState("");


  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await fetch(`/api/applications/${id}`);
        if (response.ok) {
          const data = await response.json();
          setApplication(data.application);
        } else {
          throw new Error("Failed to fetch application data.");
        }
      } catch (error) {
        console.error("Failed to fetch application:", error);
        toast.error("There was an error fetching the application.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchApplication();
    }
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!application) {
    return <p>No application found.</p>;
  }

  // Format the application details similar to the Review component
  const formatEmploymentHistory = (employmentHistory) => {
    if (!employmentHistory || !employmentHistory.length) return t('EmploymentHistory.noHistory');
    return employmentHistory.map((job, index) => (
      <div key={index}>
        <h3>{t('EmploymentHistory.jobNumber', { number: index + 1 })}</h3>
        <p><strong>{t('EmploymentHistory.employerName')}</strong> {job.employerName || t('EmploymentHistory.noInfo')}</p>
        <p><strong>{t('EmploymentHistory.employerNumber')}</strong> {job.employerNumber || t('EmploymentHistory.noInfo')}</p>
        <p><strong>{t('EmploymentHistory.supervisor')}</strong> {job.supervisor || t('EmploymentHistory.noInfo')}</p>
        <p><strong>{t('EmploymentHistory.jobTitle')}</strong> {job.jobTitle || t('EmploymentHistory.noInfo')}</p>
        <p><strong>{t('EmploymentHistory.startDate')}</strong> {job.startDate || t('EmploymentHistory.noInfo')}</p>
        <p><strong>{t('EmploymentHistory.endDate')}</strong> {job.endDate || t('EmploymentHistory.noInfo')}</p>
        <p><strong>{t('EmploymentHistory.reasonForLeaving')}</strong> {job.reasonForLeaving || t('EmploymentHistory.noInfo')}</p>
      </div>
    ));
  };

  const formatSkills = (skills) => {
    if (!skills) {
      return t('Skills.noSkills');
    }
    return (
      <div>
        <h3>{t('Skills.workedAsCleaner')}</h3>
        <p>{skills.workedAsCleaner ? t('Skills.yes') : t('Skills.no')}</p>
        <h3>{t('Skills.bufferMachine')}</h3>
        <p>{skills.bufferMachine ? t('Skills.yes') : t('Skills.no')}</p>
        <h3>{t('Skills.carpetCleaningMachine')}</h3>
        <p>{skills.carpetCleaningMachine ? t('Skills.yes') : t('Skills.no')}</p>
        <h3>{t('Skills.vacuumCleaner')}</h3>
        <p>{skills.vacuumCleaner ? t('Skills.yes') : t('Skills.no')}</p>
        <h3>{t('Skills.other')}</h3>
        <p>{skills.other ? `${t('Skills.yes')} (${skills.otherSpec || t('Skills.notSpecified')})` : t('Skills.no')}</p>
      </div>
    );
  };

  const formatApplicantQuestions = (questions) => {
    if (!questions || Object.keys(questions).length === 0) {
      return <p>{t('ApplicantQuestions.noResponses')}</p>;
    }

    return (
      <div>
        <h3>{t('ApplicantQuestions.previousEmployment')}</h3>
        <p>{questions.previousEmployment ? questions.previousEmployment : t('ApplicantQuestions.noInfo')}</p>

        <h3>{t('ApplicantQuestions.attendancePunctuality')}</h3>
        <p>{questions.attendancePunctuality === true ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

        <h3>{t('ApplicantQuestions.eligibleForEmployment')}</h3>
        <p>{questions.eligibleForEmployment === true ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

        <h3>{t('ApplicantQuestions.availableStartDate')}</h3>
        <p>{questions.availableStartDate || t('ApplicantQuestions.noInfo')}</p>

        <h3>{t('ApplicantQuestions.anotherJob')}</h3>
        <p>{questions.anotherJob === true ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

        <h3>{t('ApplicantQuestions.flexibleSchedule')}</h3>
        <p>{questions.flexibleSchedule === true ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

        <h3>{t('ApplicantQuestions.availableForHolidays')}</h3>
        <p>{questions.availableForHolidays === true ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

        <h3>{t('ApplicantQuestions.validDriversLicense')}</h3>
        <p>{questions.validDriversLicense === true ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

        <h3>{t('ApplicantQuestions.criminalRecord')}</h3>
        <p>{questions.criminalRecord ? questions.criminalRecord : t('ApplicantQuestions.noInfo')}</p>

        <h3>{t('ApplicantQuestions.emergencyContactName')}</h3>
        <p>{questions.emergencyContactName || t('ApplicantQuestions.noInfo')}</p>

        <h3>{t('ApplicantQuestions.emergencyContactRelation')}</h3>
        <p>{questions.emergencyContactRelation || t('ApplicantQuestions.noInfo')}</p>

        <h3>{t('ApplicantQuestions.emergencyContactNumber')}</h3>
        <p>{questions.emergencyContactNumber || t('ApplicantQuestions.noInfo')}</p>
    </div>
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siteLocation,
          position,
          hireDate,
          supervisorStatus: true, // Set status to true upon submission
        }),
      });
  
      if (response.ok) {
        toast.success("Application updated successfully.");
        router.push("/supervisor"); // Redirect back to the supervisor dashboard
      } else {
        throw new Error("Failed to update application.");
      }
    } catch (error) {
      console.error("Failed to update application:", error);
      toast.error("There was an error updating the application.");
    }
  };
  

  return (
    <div className="review-section">
      <h1>For Supervisors</h1>
      <form onSubmit={handleSubmit} className="ml-10">
        <div>
          <label htmlFor="siteLocation">Site Location:</label>
          <input
            id="siteLocation"
            type="text"
            value={siteLocation}
            onChange={(e) => setSiteLocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input
            id="position"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="hireDate">Hire Date:</label>
          <input
            id="hireDate"
            type="date"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
          />
        </div>
        <button className="add-button" style={{width: "120px"}} type="submit">Submit</button>
      </form>
      <h1>Review Application</h1>
      <div className="review-content">
        <h2>{t('PersonalInfo.header')}</h2>
        {application.personalInfo ? (
          <div>
            <h3>{t('PersonalInfo.fullName')}</h3>
            <p>{application.personalInfo.fullName || t('PersonalInfo.noInfo')}</p>
            <h3>{t('PersonalInfo.address')}</h3>
            <p>{application.personalInfo.address || t('PersonalInfo.noInfo')}</p>
            <h3>{t('PersonalInfo.phone')}</h3>
            <p>{application.personalInfo.phone || t('PersonalInfo.noInfo')}</p>
            <h3>{t('PersonalInfo.sex')}</h3>
            <p>{application.personalInfo.sex || t('PersonalInfo.noInfo')}</p>
            <h3>{t('PersonalInfo.dob')}</h3>
            <p>{application.personalInfo.dob || t('PersonalInfo.noInfo')}</p>
            <h3>{t('PersonalInfo.ssn')}</h3>
            <p>{application.personalInfo.ssn || t('PersonalInfo.noInfo')}</p>
          </div>
        ) : (
          <p>{t('PersonalInfo.noInfo')}</p>
        )}

        <h2>{t('W4I9Info.header')}</h2>
        {application.w4I9Info ? (
          <div>
            <h3>{t('W4I9Info.maritalStatus')}</h3>
            <p>{application.w4I9Info.maritalStatus || t('W4I9Info.noInfo')}</p>
            <h3>{t('W4I9Info.dependents')}</h3>
            <p>{application.w4I9Info.dependents || t('W4I9Info.noInfo')}</p>
            <h3>{t('W4I9Info.occupationType')}</h3>
            <p>{application.w4I9Info.occupationType || t('W4I9Info.noInfo')}</p>
            <h3>{t('W4I9Info.wacNumber')}</h3>
            <p>{application.w4I9Info.wacNumber || t('W4I9Info.noInfo')}</p>
            <h3>{t('W4I9Info.wacExpiration')}</h3>
            <p>{application.w4I9Info.wacExpiration || t('W4I9Info.noInfo')}</p>
          </div>
        ) : (
          <p>{t('W4I9Info.noInfo')}</p>
        )}

        <h2>{t('EmploymentHistory.header')}</h2>
        {formatEmploymentHistory(application.employmentHistory?.employmentHistory)}

        <h2>{t('Skills.header')}</h2>
        {formatSkills(application.skills)}

        <h2>{t('ApplicantQuestions.header')}</h2>
        {formatApplicantQuestions(application.applicantQuestions)}
      </div>
    </div>
  );
};

export default ApplicationDetail;
