"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import "./admin-dashboard.css";
import getSession from "../../../../actions/getCurrentSession";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { getUserById } from "../../../../data/user.js";
import { useRouter } from "next/navigation";

const SupervisorDashboard = () => {
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [isSupervisor, setIsSupervisor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [sortOrderDate, setSortOrderDate] = useState("asc");
  const [sortOrderStatus, setSortOrderStatus] = useState("asc");
  const [sortOrderName, setSortOrderName] = useState("asc");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        setSession(sessionData);
        setIsSupervisor(sessionData?.user.role === "SUPERVISOR");
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch session:", error);
        toast.error("Failed to fetch session data.");
        setIsLoading(false);
      }
    };

    const fetchApplications = async () => {
      try {
        const response = await fetch("/api/applications");
        const data = await response.json();
        const filteredApplications = data.applications.filter(app => !app.supervisorStatus);
        setApplications(filteredApplications);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
        toast.error("Failed to fetch applications.");
      }
    };

    fetchSession();
    fetchApplications();
  }, []);

  const handleSortByDate = () => {
    const sortedApplications = [...applications].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrderDate === "asc" ? dateA - dateB : dateB - dateA;
    });

    setApplications(sortedApplications);
    setSortOrderDate(sortOrderDate === "asc" ? "desc" : "asc");
  };

  const handleSortByStatus = () => {
    const sortedApplications = [...applications].sort((a, b) => {
      if (a.isComplete === b.isComplete) return 0;
      return sortOrderStatus === "asc"
        ? (a.isComplete ? 1 : -1)
        : (a.isComplete ? -1 : 1);
    });

    setApplications(sortedApplications);
    setSortOrderStatus(sortOrderStatus === "asc" ? "desc" : "asc");
  };

  const handleSortByName = () => {
    const sortedApplications = [...applications].sort((a, b) => {
      const nameA = a.personalInfo?.fullName.toLowerCase() || "";
      const nameB = b.personalInfo?.fullName.toLowerCase() || "";
      return sortOrderName === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });

    setApplications(sortedApplications);
    setSortOrderName(sortOrderName === "asc" ? "desc" : "asc");
  };

  const handleSendEmailRedirect = (userId) => {
    // Redirect to the send-email page with the user's ID as a query parameter
    router.push(`/supervisor/send-email?userId=${userId}`);
  };


  if (isLoading) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="admin-dashboard">
      {isSupervisor ? (
        <div>
          <div className="gradientBoxStyle">
            <h2 className="centeredText">Supervisor Dashboard</h2>
          </div>
          <div className="admin-portal">
            <center><h1 className="mt-0 mb-10">All Applications</h1></center>
            <table className="applications-table">
              <thead>
                <tr>
                  <th>
                    Applicant Name
                    <button onClick={handleSortByName} className="sort-button">
                      <FontAwesomeIcon icon={sortOrderName === "asc" ? faArrowUp : faArrowDown} />
                    </button>
                  </th>
                  <th>
                    Date Submitted
                    <button onClick={handleSortByDate} className="sort-button">
                      <FontAwesomeIcon icon={sortOrderDate === "asc" ? faArrowUp : faArrowDown} />
                    </button>
                  </th>
                  <th>
                    Status
                    <button onClick={handleSortByStatus} className="sort-button">
                      <FontAwesomeIcon icon={sortOrderStatus === "asc" ? faArrowUp : faArrowDown} />
                    </button>
                  </th>
                  <th>Send Message</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id}>
                    <td>
                      <Link href={`/supervisor/${app.userId}`} className="applicant-link">
                        {app.personalInfo?.fullName || "Unknown"}
                      </Link>
                    </td>
                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td>{app.isComplete ? "Complete" : "Incomplete"}</td>
                    <td>
                      <a
                        href=""
                        onClick={() => handleSendEmailRedirect(app.userId)}
                        className="send-message-button"
                      >
                        Send Email
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="access-denied">
          <p>Access Denied</p>
        </div>
      )}
    </div>
  );
};

export default SupervisorDashboard;
