import { ReactNode, useState } from "react";
import { IsCreatingContainerContext } from "./isCreatingContainer.context";

export function IsCreatingContainerProvider({ children }: { children: ReactNode }): React.ReactNode {
  const [isCreatingContainer, setIsCreatingContainer] = useState<boolean>(false);

  return (
    <IsCreatingContainerContext.Provider value={{ isCreatingContainer, set: (value) => setIsCreatingContainer(value) }}>
      {children}
    </IsCreatingContainerContext.Provider>
  );
}
