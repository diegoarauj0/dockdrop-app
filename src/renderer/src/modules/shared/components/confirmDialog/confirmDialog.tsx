import { AlertTriangle, X } from "lucide-react";
import * as S from "./confirmDialog.style";

interface InterfaceConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialogComponent(props: InterfaceConfirmDialogProps): React.ReactNode {
  const { open, title, message, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel } = props;

  if (!open) return null;

  return (
    <S.Overlay onClick={onCancel}>
      <S.Dialog onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <S.IconWrapper>
            <AlertTriangle size={24} />
          </S.IconWrapper>
          <S.Title>{title}</S.Title>
          <S.CloseButton onClick={onCancel}>
            <X size={20} />
          </S.CloseButton>
        </S.Header>

        <S.Content>
          <S.Message>{message}</S.Message>
        </S.Content>

        <S.Footer>
          <S.Button $variant="secondary" onClick={onCancel}>
            {cancelText}
          </S.Button>
          <S.Button $variant="danger" onClick={onConfirm}>
            {confirmText}
          </S.Button>
        </S.Footer>
      </S.Dialog>
    </S.Overlay>
  );
}
