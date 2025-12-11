import { useDebouncedCallback } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  const debouncedChange = useDebouncedCallback((value: string) => {
    onChange(value);
  }, 100);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedChange(e.target.value);
  };
  return (
    <input
      value={value}
      onChange={handleChange}
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
};

export default SearchBox;
