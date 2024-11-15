import * as React from 'react';
import Modal from "@mui/material/Modal";
import ButtonView from './ButtonView';
import { Box, DialogActions, Typography } from '@mui/material';

interface ModalViewProps {
    isOpen: boolean;
    handleClose: () => void;
    title?: string;
    contentText?: string;
    handleApply: () => void;
    firstBtnText: string;
    secondBtnText: string;
    children?: React.ReactNode;
    width?: string;
    height?: string;
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const ModalView: React.FC<ModalViewProps> = ({
    isOpen,
    handleClose,
    title,
    contentText,
    handleApply,
    firstBtnText,
    secondBtnText,
    children,
    width = "30%",
    height = "auto"
}) => {

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    ...style,
                    width: width,
                    height: height
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>

                    {contentText && <p>{contentText}</p>}
                    {children}

                    <DialogActions className='d-flex dialog-actions'>
                        <ButtonView label={firstBtnText} onClickCallback={handleClose} />
                        <ButtonView label={secondBtnText} onClickCallback={handleApply} />
                    </DialogActions>
                </Box>
            </Modal>
        </div>

    );
};

export default ModalView;
