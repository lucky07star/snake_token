import { NotifyPropsType } from "../types/notify"

export function alertSuccess(message: string): NotifyPropsType {
    return {
        title: '',
        message: message,
        type: 'success',
        subTitle: ''
    }
}

// 
export function alertError(message: string): NotifyPropsType {
    return {
        title: '',
        message: message,
        type: 'error',
        subTitle: ''
    }
}

export function alertWarn(message: string): NotifyPropsType {
    return {
        title: '',
        message: message,
        type: 'warning',
        subTitle: ''
    }
}
