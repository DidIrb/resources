import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

interface AlertProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
}

export const Alert: React.FC<AlertProps> = ({ title, message, onConfirm, onCancel, isOpen }) => {
    const handleConfirm = () => {
        onConfirm();
        onCancel();
    };

    return (
        <AlertDialog open={isOpen} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {message}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};