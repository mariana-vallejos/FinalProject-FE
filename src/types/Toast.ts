export interface ToastProps {
  message: string;
  type?: "success" | "error";
  duration?: number;
  onClose?: () => void;
}
