import { toast as hotToast } from "react-hot-toast";

class Toast {
  success(message: string) {
    hotToast.success(message, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#10B981",
        color: "#FFFFFF",
      },
    });
  }

  error(message: string) {
    hotToast.error(message, {
      duration: 4000,
      position: "top-right",
      style: {
        background: "#EF4444",
        color: "#FFFFFF",
      },
    });
  }
}

export const toast = new Toast();
