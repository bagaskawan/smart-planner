"use client"; // Required to use hooks like useSearchParams

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const [errorInfo, setErrorInfo] = useState({
    error: "",
    errorCode: "",
    errorDescription: "",
  });

  useEffect(() => {
    const error = searchParams.get("error");
    const errorCode = searchParams.get("error_code");
    const errorDescription = searchParams.get("error_description");

    setErrorInfo({
      error: error || "Unknown error",
      errorCode: errorCode || "N/A",
      errorDescription: errorDescription || "No description provided.",
    });
  }, [searchParams]);

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#333",
      }}
    >
      <h1 style={{ color: "#d9534f" }}>Sorry, something went wrong</h1>
      <p>We encountered an issue processing your request.</p>

      {/* Display specific message for the database error */}
      {errorInfo.errorDescription === "Database error saving new user" ? (
        <div
          style={{
            border: "1px solid #eecfcf",
            backgroundColor: "#fdf7f7",
            padding: "10px",
            borderRadius: "4px",
            marginTop: "15px",
          }}
        >
          <p>
            <strong>Account Setup Issue:</strong>
          </p>
          <p>
            It seems there was a problem fully setting up your account with our
            database after you authenticated with your provider. This is often
            due to a temporary issue or a misconfiguration in the post-login
            account synchronization.
          </p>
          <p>
            If you've just seen instructions about setting up database
            functions/triggers, please ensure those have been applied.
            Otherwise, please try logging in again in a few moments.
          </p>
        </div>
      ) : errorInfo.errorDescription &&
        errorInfo.errorDescription !== "No description provided." ? (
        // Display other error descriptions
        <div
          style={{
            border: "1px solid #eecfcf",
            backgroundColor: "#fdf7f7",
            padding: "10px",
            borderRadius: "4px",
            marginTop: "15px",
          }}
        >
          <p>
            <strong>Error Details:</strong> {errorInfo.errorDescription}
          </p>
        </div>
      ) : null}

      <div style={{ marginTop: "20px", fontSize: "0.9em", color: "#555" }}>
        <p>
          If you need to contact support or report this issue, please provide
          the following details:
        </p>
        <ul style={{ listStyleType: "none", paddingLeft: "10px" }}>
          <li>
            <strong>Error Type:</strong> {errorInfo.error}
          </li>
          <li>
            <strong>Error Code:</strong> {errorInfo.errorCode}
          </li>
        </ul>
      </div>

      <div style={{ marginTop: "30px" }}>
        <Link
          href="/login"
          style={{
            textDecoration: "none",
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "4px",
            marginRight: "10px",
          }}
        >
          Try Logging In Again
        </Link>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            padding: "10px 15px",
            backgroundColor: "#6c757d",
            color: "white",
            borderRadius: "4px",
          }}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
