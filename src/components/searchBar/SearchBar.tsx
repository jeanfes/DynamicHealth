import IconSearch from '@/assets/icons/IconSearch';
import { useDebounce } from '@uidotdev/usehooks';
import { useState, useEffect } from 'react';
import './searchBar.scss';

interface SearchBarProps {
    showIcon?: boolean;
    searchValue?: string;
    setSearchValue: (value: string) => void;
    debounced?: boolean;
    placeholder?: string;
}

export const SearchBar = ({ showIcon = true, searchValue = '', setSearchValue, debounced = false, placeholder = 'Buscar...' }: SearchBarProps) => {
    const [localValue, setLocalValue] = useState(searchValue);
    const debouncedValue = useDebounce(localValue, 500);

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
                    <IconSearch color="#A1A1A1" width="16" height="16" />
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
