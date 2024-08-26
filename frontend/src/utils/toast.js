// Utility function for dynamic toast notifications
export const showToast = (toast, { title, description, status, duration = 5000, position = "top-right" }) => {
  toast({
    title,
    description,
    status,
    duration,
    isClosable: true,
    position,
  });
};
