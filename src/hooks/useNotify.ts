import { useCallback } from 'react';
import { NotificationType, NotifyPropsType } from '../types/notify';
import addNotification from 'react-push-notification';

type Theme = {
    backgroundTop: string;
    backgroundBottom: string;
    colorTop: string;
    colorBottom: string;
}

const themes: Record<NotificationType, Theme> = {
    success: {
        backgroundTop: '#00c853',
        backgroundBottom: '#009624',
        colorTop: '#ffffff',
        colorBottom: '#ffffff',
    },
    error: {
        backgroundTop: '#d32f2f',
        backgroundBottom: '#b71c1c',
        colorTop: '#ffffff',
        colorBottom: '#ffffff',
    },
    warning: {
        backgroundTop: '#ffa000',
        backgroundBottom: '#ff6f00',
        colorTop: '#ffffff',
        colorBottom: '#ffffff',
    },
}

type ErrorObject = {
    message: string;
    code: string;
    param: string;
}

export const useNotify = () => {
    const notify = useCallback(({ type, message, title, subTitle }: NotifyPropsType) => {
        const theme = themes[type]

        addNotification({
            title,
            subtitle: subTitle,
            message,
            backgroundTop: theme.backgroundTop,
            backgroundBottom: theme.backgroundBottom,
            colorTop: theme.colorTop,
            colorBottom: theme.colorBottom,
        })
    }, [])

    const notifyErrors = useCallback((errors: ErrorObject[]) => {
        errors.forEach((error) => {
            notify({
                type: 'error',
                title: `Error in ${error.param}`,
                message: error.message,
                subTitle: `Code: ${error.code}`,
            })
        })
    }, [notify])

    return { notify, notifyErrors }
}
