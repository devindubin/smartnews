import { Alert } from "@chakra-ui/react";

import React from "react";

const Alert = () => {
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Title></Alert.Title>
    </Alert.Root>
  );
};

export default Alert;
