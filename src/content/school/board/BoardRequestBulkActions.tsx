import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';


const ButtonSuccess = styled(Button)(
    ({ theme }) => `
    background: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    
    &: hover {
        background: ${theme.colors.success.dark};
    }`
);

const ButtonError = styled(Button)(
    ({ theme }) => `
       background: ${theme.colors.error.main};
       color: ${theme.palette.error.contrastText};
  
       &:hover {
          background: ${theme.colors.error.dark};
       }
      `
);

function BoardRequestBulkActions() {
    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                    <Typography variant='h5' color="text.secondary">
                        다중 선택:
                    </Typography>
                    <ButtonSuccess
                        sx={{ ml: 1 }}
                        startIcon={<CheckCircleOutlineOutlinedIcon />}
                        variant='contained'
                    >
                        승인
                    </ButtonSuccess>
                    <ButtonError
                        sx={{ ml: 1 }}
                        startIcon={<DoNotDisturbAltOutlinedIcon />}
                        variant="contained"
                    >
                        거부
                    </ButtonError>
                </Box>
            </Box>
        </>
    )

}

export default BoardRequestBulkActions;