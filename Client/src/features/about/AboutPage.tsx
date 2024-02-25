import { Typography } from "@mui/material";
import { useState } from "react";
import agent from "../../app/api/agent";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function handleValidationError() {
    agent.TestErrors.getValidationErrors()
      .then(() => console.log('Validation error, should not see this'))
      .catch(error => setValidationErrors(error));
  }

  return (
    <Typography variant="h2">About Page</Typography>
  );
}