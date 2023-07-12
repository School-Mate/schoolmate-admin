import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRef, useState } from 'react';

const ButtonError = styled(Button)(
    ({ theme }) => `
       background: ${theme.colors.error.main};
       color: ${theme.palette.error.contrastText};
  
       &:hover {
          background: ${theme.colors.error.dark};
       }
      `
);

function RequestBulkActions() {
    const [onMenuOpen, menuOpen] = useState<boolean>(false);
    const moreRef = useRef<HTMLButtonElement | null>(null);

    const openMenu = (): void => {
        menuOpen(true);
    }

    const closeMenu = (): void => {
        menuOpen(false);
    }

}