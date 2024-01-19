import React from 'react';
import './Cip.css'

type SelectedItemsProps = {
    items: Item[];
    onRemoveItem: (item: Item, event: React.MouseEvent) => void;
    placeholder: string;
    onClearAll: () => void;
    toggleDropdown: () => void;
    isDropdownOpen: boolean;
    
};


const SelectedItems: React.FC<SelectedItemsProps> = ({ 
    items, onRemoveItem, placeholder, onClearAll, toggleDropdown, isDropdownOpen 
}) => {
    return (
        <div className="select-container">
            <div className="selected-items" onClick={toggleDropdown}>
                {items.length > 0 ? (
                    <>
                        {items.map(item => (
                            <span key={item.id} className="selected-item">
                                {item.name}
                                <span className="remove" onClick={(e) => onRemoveItem(item, e)}> X </span>
                            </span>
                        ))}
                    </>
                ) : (
                    <div className="placeholder">{placeholder}</div>
                )}
            </div>
            <div className="dropdown-container" >
                    {items.length > 0 && (
                        <div className='clear-button'>
                                <span className="clear-all" onClick={onClearAll}>X</span>
                        </div>
                    )}
                    <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}></span>
            </div>
        </div>
    );
};

export default SelectedItems;
