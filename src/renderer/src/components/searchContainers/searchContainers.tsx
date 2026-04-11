import { Search as SearchIcon } from "lucide-react";
import * as S from "./searchContainers.style";
import { ContainerInfo } from "dockerode";
import Fuse from "fuse.js";

interface SearchProps {
  containers: ContainerInfo[];
  setResult: (containers: ContainerInfo[] | null) => void;
}

export function SearchContainers({ setResult, containers }: SearchProps): React.ReactNode {
  const handleSearch = (search: string): void => {
    if (search.length === 0 || !search) return setResult(null);

    const fuse = new Fuse(containers, {
      keys: ["Names", "Image", "Id"],
      threshold: 0.4,
    });

    const result = fuse.search(search);

    setResult(result.map(({ item }) => item));
  };

  return (
    <S.SearchWrapper>
      <SearchIcon size={18} />
      <S.SearchInput
        aria-label="Search containers"
        placeholder="Search containers..."
        type="text"
        onChange={(e) => handleSearch(e.target.value || "")}
      />
    </S.SearchWrapper>
  );
}
