import { toast } from "sonner"

export function showDefaultAlert(message: string) {
  toast(message, {
    duration: 3000,
    position: "top-right",
    style: {
      backgroundColor: "#fff",
      color: "#000",
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
  })
}

export function showErrorAlert(message: string) {
  toast.error(message, {
    duration: 5000,
    position: "top-right",
    style: {
      backgroundColor: "#f8d7da",
      color: "#721c24",
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
  })
}

export function showSuccessAlert(message: string) {
  toast.success(message, {
    duration: 3000,
    position: "top-right",
    style: {
      backgroundColor: "#d4edda",
      color: "#155724",
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
  })
}

export function showWarningAlert(message: string) {
  toast.warning(message, {
    duration: 3000,
    position: "top-right",
    style: {
      backgroundColor: "#fff3cd",
      color: "#856404",
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
  })
}

export function showInfoAlert(message: string) {
  toast.info(message, {
    duration: 3000,
    position: "top-right",
    style: {
      backgroundColor: "#d1ecf1",
      color: "#0c5460",
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
  })
}
