"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getCurrentSession from "../../../../actions/getCurrentSession";
import { PersonalInfo } from "../../components/PersonalInfo";
import { W4I9Info } from "../../components/W4I9Info";
import { EmploymentHistory } from "../../components/EmploymentHistory";
import { Skills } from "../../components/Skills";
import { ApplicantQuestions } from "../../components/ApplicantQuestions";
import { Review } from "../../components/Review";
import { toast } from 'react-hot-toast';
import { useTranslations } from "next-intl";
import "./applicant-form.css";
import "../../components/form.css";

const Applicant = () => {
    const router = useRouter();

    const [session, setSession] = useState(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [formData, setFormData] = useState({
        personalInfo: {},
        w4I9Info: {},
        employmentHistory: {},
        skills: {},
        applicantQuestions: {},
    });
    const [isCurrentSectionValid, setIsCurrentSectionValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // New state to track submission status
    const [applicationId, setApplicationId] = useState(null); // State to track the application ID

    const sections = [
        "Personal Info",
        "W-4/I-9 Info",
        "Employment History",
        "Skills",
        "Applicant Questions",
        "Review"
    ];

    const t = useTranslations('ApplicantForm');

    const sendEmailNotification = async (actionType) => {
        try {
          const response = await fetch("/api/send-admins-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: actionType }), // Send action type
          });
      
          const result = await response.json();
          if (result.success) {
            console.log("Email sent successfully.");
          } else {
            console.error("Failed to send email:", result.error);
          }
        } catch (error) {
          console.error("Error sending email:", error);
        }
      };

    useEffect(() => {
        const fetchSessionAndApplication = async () => {
            try {
                // Fetch the current session
                const sessionData = await getCurrentSession();
                setSession(sessionData);
    
                // Fetch the existing application for the user
                const response = await fetch(`/api/applications/${sessionData.user.id}`);

                if (response.ok) {
                    const data = await response.json();
    
                    if (data.application) {
                        // Application exists, set data
                        setApplicationId(data.application.userId);
                        setFormData({
                            personalInfo: data.application.personalInfo || {},
                            w4I9Info: data.application.w4I9Info || {},
                            employmentHistory: data.application.employmentHistory || {},
                            skills: data.application.skills || {},
                            applicantQuestions: data.application.applicantQuestions || {},
                        });
                        sendEmailNotification("continue");
                    } else {
                        // No application data found, which is unexpected
                        throw new Error("Application not found but response is OK.");
                    }
                } else {
                    // No application found, create a new one
                    const createResponse = await fetch("/api/applications", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ 
                            userId: sessionData.user.id, 
                            personalInfo: {},
                            w4I9Info: {},
                            employmentHistory: {},
                            skills: {},
                            applicantQuestions: {}, 
                        }),
                    });

                    if (createResponse.ok) {
                        const newApplication = await createResponse.json();
                        setApplicationId(sessionData.user.id);

                        sendEmailNotification("new");
                    } else {
                        throw new Error("Failed to create a new application.");
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchSessionAndApplication();
    }, []);
    

    const handleNext = () => {
        if (currentSection < sections.length - 1) {
            if (isCurrentSectionValid || currentSection === sections.length - 2) {
                setCurrentSection(currentSection + 1);
                setIsCurrentSectionValid(false);
                updateDB();
            } else {
                toast.error(t('errorIncompleteFields'));
            }
        }
    };

    const updateDB = async () => {
        try {
            const response = await fetch(`/api/applications/${session.user.id}`, {
                method: "PUT", // Use PUT to update existing application
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    personalInfo: formData.personalInfo,
                    w4I9Info: formData.w4I9Info,
                    employmentHistory: formData.employmentHistory,
                    skills: formData.skills,
                    applicantQuestions: formData.applicantQuestions,
                    isComplete: true,
                }),
            });

            if (response.ok) {
                toast.success("Saved");
            } else {
                throw new Error("Failed to update application.");
            }
        } catch (error) {
            console.error(error);
            toast.error("There was an error updating the application.");
        }
    }

    const handleBack = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
        }
    };

    const handleInputChange = (section, e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [section]: {
                ...prevData[section],
                [name]: value,
            }
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true); // Set submitting state to true

        try {
            const response = await fetch(`/api/applications/${session.user.id}`, {
                method: "PUT", // Use PUT to update existing application
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    personalInfo: formData.personalInfo,
                    w4I9Info: formData.w4I9Info,
                    employmentHistory: formData.employmentHistory,
                    skills: formData.skills,
                    applicantQuestions: formData.applicantQuestions,
                    isComplete: true,
                }),
            });

            if (response.ok) {
                toast.success("Application updated successfully!");
                router.push('/application-submitted');
            } else {
                throw new Error("Failed to update application.");
            }
        } catch (error) {
            console.error(error);
            toast.error("There was an error updating the application.");
        } finally {
            setIsSubmitting(false); // Reset submitting state to false after completion
            sendEmailNotification("submit");
        }
    };

    if (!session) {
        return <p className="loading-text">Loading...</p>;
    }

    return (
        <div>
            <div className="gradientBoxStyle">
                <h2 className="centeredText">{t('YourApplication')}</h2>
            </div>
            
            <div className="form-container">
                <aside className="sidebar">
                    <div className="progress-bar">
                        {sections.map((section, index) => (
                            <div key={index} className={`progress-step ${currentSection > index ? "completed" : ""}`}>
                                <div className="step-indicator"></div>
                                {index < sections.length - 1 && <div className={`step-connector ${currentSection > index ? "completed" : ""}`}></div>}
                            </div>
                        ))}
                    </div>
                    <ul>
                        {sections.map((section, index) => (
                            <li key={index} className={index === currentSection ? "active" : ""}>
                                {t(section)}
                            </li>
                        ))}
                    </ul>
                </aside>
                <main className="form-content">
                    {currentSection === 0 && <PersonalInfo formData={formData.personalInfo} handleInputChange={(e) => handleInputChange('personalInfo', e)} onValidChange={setIsCurrentSectionValid}/>}
                    {currentSection === 1 && <W4I9Info formData={formData.w4I9Info} handleInputChange={(e) => handleInputChange('w4I9Info', e)} onValidChange={setIsCurrentSectionValid}/>}
                    {currentSection === 2 && <EmploymentHistory formData={formData.employmentHistory} handleInputChange={(e) => handleInputChange('employmentHistory', e)} onValidChange={setIsCurrentSectionValid}/>}
                    {currentSection === 3 && <Skills formData={formData.skills} handleInputChange={(e) => handleInputChange('skills', e)} onValidChange={setIsCurrentSectionValid}/>}
                    {currentSection === 4 && <ApplicantQuestions formData={formData.applicantQuestions} handleInputChange={(e) => handleInputChange('applicantQuestions', e)} onValidChange={setIsCurrentSectionValid}/>}
                    {currentSection === 5 && <Review formData={formData} onValidChange={setIsCurrentSectionValid}/>}
                    <div className="navigation-buttons">
                        {currentSection > 0 && <button type="button" onClick={handleBack} disabled={isSubmitting}>{t('Back')}</button>}
                        {currentSection < sections.length - 1 ? (
                            <button onClick={handleNext} disabled={isSubmitting}>{t("Next")}</button>
                        ) : (
                            <button onClick={handleSubmit} disabled={isSubmitting}>{t("Submit")}</button>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Applicant;
