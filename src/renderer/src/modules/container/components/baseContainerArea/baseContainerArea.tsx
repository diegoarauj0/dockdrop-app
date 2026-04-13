import * as S from "./baseContainerArea.style";
import { useDroppable } from "@dnd-kit/core";
import React from "react";

interface InterfaceBaseContainerAreaProps {
  rightContent?: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ElementType;
  borderColor?: string;
  minHeight?: string;
  title: string;
  id: string;
}

export function BaseContainerAreaComponent(props: InterfaceBaseContainerAreaProps): React.ReactNode {
  const { id, title, icon: Icon, rightContent, children, minHeight, borderColor } = props;

  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <S.BaseContainerArea
      ref={setNodeRef}
      $active={isOver}
      style={{ minHeight, borderColor, boxShadow: `0px 0px 10px ${isOver ? borderColor : "transparent"}` }}
    >
      <S.Header>
        <S.Title>{title}</S.Title>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {rightContent}

          {Icon && (
            <S.IconWrapper style={{ color: borderColor }}>
              <Icon size={20} />
            </S.IconWrapper>
          )}
        </div>
      </S.Header>

      {children}
    </S.BaseContainerArea>
  );
}
