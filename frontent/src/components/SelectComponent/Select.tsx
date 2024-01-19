import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import debounce from 'lodash.debounce';
import SelectedItems from '../CipComponent/Cip';
import './Select.css';
import Dropdown from '../DropdownComponent/Dropdown';

type Item = { id: number; name: string };
type Pagination = { next: number | null; previous: number | null; limit: number };

type Props = {
  value: Item[];
  onChange: (newValue: Item[]) => void;
  placeholder: string;
  apiUrl: string;
};

const Select = memo(({ value, onChange, placeholder, apiUrl }: Props) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false); 
  const [pagination, setPagination] = useState<Pagination>({ next: 1, previous: null, limit: 10 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((selectedItem: Item) => {
    onChange(
      value.some(item => item.id === selectedItem.id)
        ? value.filter(item => item.id !== selectedItem.id)
        : [...value, selectedItem]
    );
  }, [value, onChange]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}?limit=${pagination.limit}&start=0`);
        const data = await response.json();
        setItems(data.items);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
      setLoading(false);
    };

    fetchInitialData();
  }, [apiUrl, pagination.limit]);



  const fetchMoreData = useCallback(async () => {
    if (loading || pagination.next === null) return;

    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}?limit=${pagination.limit}&start=${pagination.next}`);
      const data = await response.json();

      setItems(prevItems => [...prevItems, ...data.items]);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching more data:', error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, loading, pagination]);

  const handleScroll = useCallback(
    debounce((e: React.UIEvent<HTMLDivElement>) => {
      if (!dropdownRef.current) return;

      const bottom = dropdownRef.current.scrollHeight - dropdownRef.current.scrollTop === dropdownRef.current.clientHeight;
      if (bottom) {
        fetchMoreData();
      }
    }, 300),
    [fetchMoreData]
  );



  const handleRemoveItem = (item: Item, event: React.MouseEvent) => {
    event.stopPropagation();
    onChange(value.filter(val => val.id !== item.id));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleClearAll = () => {
    onChange([]);
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="select-container">
      <div className="main-container">
        {!isMobile && (
          <SelectedItems
            items={value}
            onRemoveItem={handleRemoveItem}
            placeholder={placeholder}
            onClearAll={handleClearAll}
            toggleDropdown={toggleDropdown}
            isDropdownOpen={isDropdownOpen}
          />
        )}

        {isMobile ? (
          <div className="mobile-items-list">
            {items.map(item => (
              <div key={item.id} className="item">
                {item.name}
              </div>
            ))}
          </div>
        ) : (
          isDropdownOpen && (
            <div ref={dropdownRef}>
              <Dropdown
                items={items}
                isLoading={loading}
                onScroll={handleScroll}
                fetchMoreData={fetchMoreData}
                onItemSelect={handleChange}
                pagination={pagination}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
});

export default Select;
