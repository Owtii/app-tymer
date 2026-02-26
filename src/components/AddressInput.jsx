import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin } from 'lucide-react';
import { geocodeAddress } from '../services/MapboxService';
import './AddressInput.css';

const AddressInput = ({ value, onChange, placeholder = 'Search address...' }) => {
    const [query, setQuery] = useState(value?.address || '');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const debounceRef = useRef(null);
    const wrapperRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleInputChange = useCallback((e) => {
        const val = e.target.value;
        setQuery(val);

        // Clear previous debounce
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (val.length < 3) {
            setSuggestions([]);
            setShowDropdown(false);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setIsLoading(true);
            const results = await geocodeAddress(val);
            setSuggestions(results);
            setShowDropdown(results.length > 0);
            setIsLoading(false);
        }, 350);
    }, []);

    const handleSelect = (suggestion) => {
        setQuery(suggestion.place_name);
        setShowDropdown(false);
        setSuggestions([]);
        onChange({
            address: suggestion.place_name,
            coords: suggestion.center
        });
    };

    return (
        <div className="address-input-wrapper" ref={wrapperRef}>
            <div className="address-input-field">
                <MapPin size={16} className="address-input-icon" />
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                    placeholder={placeholder}
                    className="address-input"
                />
                {isLoading && <div className="address-spinner" />}
            </div>

            {showDropdown && (
                <div className="address-dropdown">
                    {suggestions.map((s, i) => (
                        <button
                            key={i}
                            className="address-suggestion"
                            onClick={() => handleSelect(s)}
                            type="button"
                        >
                            <MapPin size={14} className="suggestion-icon" />
                            <span>{s.place_name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddressInput;
