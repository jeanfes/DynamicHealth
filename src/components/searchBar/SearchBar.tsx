import IconSearch from '@/assets/icons/IconSearch';
import { useDebounce } from '@uidotdev/usehooks';
import { useState, useEffect } from 'react';
import './searchBar.scss';

interface SearchBarProps {
    showIcon?: boolean;
    searchValue?: string;
    setSearchValue: (value: string) => void;
    debounced?: number;
    placeholder?: string;
}

export const SearchBar = ({ showIcon = true, searchValue = '', setSearchValue, debounced = 500, placeholder = 'Buscar...' }: SearchBarProps) => {
    const [localValue, setLocalValue] = useState(searchValue);
    const debouncedValue = useDebounce(localValue, debounced);

    useEffect(() => {
        if (debounced) {
            setSearchValue(debouncedValue);
        }
    }, [debouncedValue, debounced, setSearchValue]);

    useEffect(() => {
        if (!debounced) {
            setSearchValue(localValue);
        }
    }, [localValue, debounced, setSearchValue]);

    return (
        <div className="searchBar">
            {showIcon && (
                <div className="searchIcon">
                    <IconSearch color="var(--colorBlack)" width="18" height="18" />
                </div>
            )}
            <input
                id="searchInput"
                type="text"
                autoComplete="off"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
};
