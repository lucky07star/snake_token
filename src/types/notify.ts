export type NotificationType = 'error' | 'warning' | 'success'

export type NotifyPropsType = {
    type: NotificationType;
    message: string;
    title: string;
    subTitle?: string;
}
