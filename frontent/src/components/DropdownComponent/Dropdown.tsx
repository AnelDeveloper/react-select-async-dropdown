import React, { forwardRef } from 'react';
import { FixedSizeList as List, ListOnItemsRenderedProps } from 'react-window';
import './Dropdown.css';

type Item = {
    id: number;
    name: string;
};

type DropdownProps = {
    items: Item[];
    isLoading: boolean;
    onItemSelect: (item: Item) => void;
    fetchMoreData: () => void;
    pagination: { next: number | null };
    onScroll: React.UIEventHandler<HTMLDivElement>;
};

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
    const { items, isLoading, onItemSelect, fetchMoreData, pagination } = props;

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
        <div 
            style={style} 
            key={items[index].id} 
            className="item" 
            onClick={() => onItemSelect(items[index])}
        >
            {items[index].name}
        </div>
    );

    const onListItemsRendered = ({
        visibleStopIndex,
    }: ListOnItemsRenderedProps) => {
        if (visibleStopIndex >= items.length - 1 && !isLoading && pagination?.next !== null) {
            fetchMoreData();
        }
    };
    

    return (
        <div ref={ref} className="dropdown-cont">
            <List
                height={150}
                itemCount={items.length}
                itemSize={25}
                width={400}
                onItemsRendered={onListItemsRendered}
                overscanCount={5}
            >
                {Row}
            </List>
            {isLoading && <div className="loader">Loading...</div>}
        </div>
    );
});

export default Dropdown;
