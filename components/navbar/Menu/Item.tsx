import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Item } from '#/lib/routes';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
export default function ItemMenu({ name, items, mobile = false }: { name: string, items: Array<any>, mobile: boolean }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                style={{
                    color: 'inherit'
                }}
            >
                {name} {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </Button>
            <Menu
                style={{
                    width: '100%'
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
               
            >
                {items.map((item: Item, i) => {
                    return <MenuItem onClick={handleClose} key={i}>{item.name}</MenuItem>

                })}
            </Menu>
        </div>
    );
}
