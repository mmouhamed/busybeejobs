import React from 'react';
import { useTranslations } from 'next-intl'; // Adjust import based on your localization library

export const Review = ({ formData, onValidChange }) => {
    const t = useTranslations();

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
                <p>{questions.previousEmployment === '1' ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

                <h3>{t('ApplicantQuestions.attendancePunctuality')}</h3>
                <p>{questions.attendancePunctuality === 'on' ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

                <h3>{t('ApplicantQuestions.eligibleForEmployment')}</h3>
                <p>{questions.eligibleForEmployment === 'on' ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

                <h3>{t('ApplicantQuestions.availableStartDate')}</h3>
                <p>{questions.availableStartDate || t('ApplicantQuestions.noInfo')}</p>

                <h3>{t('ApplicantQuestions.anotherJob')}</h3>
                <p>{questions.anotherJob === '1' ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

                <h3>{t('ApplicantQuestions.flexibleSchedule')}</h3>
                <p>{questions.flexibleSchedule === 'on' ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

                <h3>{t('ApplicantQuestions.availableForHolidays')}</h3>
                <p>{questions.availableForHolidays === 'on' ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

                <h3>{t('ApplicantQuestions.validDriversLicense')}</h3>
                <p>{questions.validDriversLicense === 'on' ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

                <h3>{t('ApplicantQuestions.criminalRecord')}</h3>
                <p>{questions.criminalRecord === '1' ? t('ApplicantQuestions.yes') : t('ApplicantQuestions.no')}</p>

                <h3>{t('ApplicantQuestions.emergencyContactName')}</h3>
                <p>{questions.emergencyContactName || t('ApplicantQuestions.noInfo')}</p>

                <h3>{t('ApplicantQuestions.emergencyContactRelation')}</h3>
                <p>{questions.emergencyContactRelation || t('ApplicantQuestions.noInfo')}</p>

                <h3>{t('ApplicantQuestions.emergencyContactNumber')}</h3>
                <p>{questions.emergencyContactNumber || t('ApplicantQuestions.noInfo')}</p>
            </div>
        );
    };

    return (
        <div className="review-section">
            <h1>{t('ApplicantForm.YourApplication')}</h1>
            <div className="review-content">
                <h2>{t('PersonalInfo.header')}</h2>
                {formData.personalInfo ? (
                    <div>
                        <h3>{t('PersonalInfo.fullName')}</h3>
                        <p>{formData.personalInfo.fullName || t('PersonalInfo.noInfo')}</p>
                        <h3>{t('PersonalInfo.address')}</h3>
                        <p>{formData.personalInfo.address || t('PersonalInfo.noInfo')}</p>
                        <h3>{t('PersonalInfo.phone')}</h3>
                        <p>{formData.personalInfo.phone || t('PersonalInfo.noInfo')}</p>
                        <h3>{t('PersonalInfo.sex')}</h3>
                        <p>{formData.personalInfo.sex || t('PersonalInfo.noInfo')}</p>
                        <h3>{t('PersonalInfo.dob')}</h3>
                        <p>{formData.personalInfo.dob || t('PersonalInfo.noInfo')}</p>
                        <h3>{t('PersonalInfo.ssn')}</h3>
                        <p>{formData.personalInfo.ssn || t('PersonalInfo.noInfo')}</p>
                    </div>
                ) : (
                    <p>{t('PersonalInfo.noInfo')}</p>
                )}

                <h2>{t('W4I9Info.header')}</h2>
                {formData.w4I9Info ? (
                    <div>
                        <h3>{t('W4I9Info.maritalStatus')}</h3>
                        <p>{formData.w4I9Info.maritalStatus || t('W4I9Info.noInfo')}</p>
                        <h3>{t('W4I9Info.dependents')}</h3>
                        <p>{formData.w4I9Info.dependents || t('W4I9Info.noInfo')}</p>
                        <h3>{t('W4I9Info.occupationType')}</h3>
                        <p>{formData.w4I9Info.occupationType || t('W4I9Info.noInfo')}</p>
                        <h3>{t('W4I9Info.wacNumber')}</h3>
                        <p>{formData.w4I9Info.wacNumber || t('W4I9Info.noInfo')}</p>
                        <h3>{t('W4I9Info.wacExpiration')}</h3>
                        <p>{formData.w4I9Info.wacExpiration || t('W4I9Info.noInfo')}</p>
                    </div>
                ) : (
                    <p>{t('W4I9Info.noInfo')}</p>
                )}

                <h2>{t('EmploymentHistory.header')}</h2>
                {formatEmploymentHistory(formData.employmentHistory?.employmentHistory)}

                <h2>{t('Skills.header')}</h2>
                {formatSkills(formData.skills?.skills)}

                <h2>{t('ApplicantQuestions.header')}</h2>
                {formatApplicantQuestions(formData.applicantQuestions)}
            </div>
        </div>
    );
};

export default Review;
