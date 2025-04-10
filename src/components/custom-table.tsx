import { ReactComponent as IconLike } from '../svgs/heart-regular.svg';
import { ReactComponent as IconReply } from '../svgs/refresh.svg';
import { ReactComponent as IconRetweet } from '../svgs/repost.svg';
import { ReactComponent as IconTrash } from '../svgs/trash.svg';

interface TableProps {
    height?: string;
    title: string;
    data: Array<{ text: string; date: string }>;
    action_icons: Array<'like' | 'reply' | 'retweet' | 'delete'>;
}

function CustomTable({ height = '38vh', title, data, action_icons }: TableProps) {
    return (
        <div className="w-100">
            <div className="fs-1 mb-2" style={{ lineHeight: 'normal' }}>{title}</div>
            <div className='table-container' style={{ height: `${height}`, overflowY: 'scroll' }}>
                {data.length === 0 ? (
                    <div className="fs-3 text-center p-3 border border-1">No Data</div>
                ) : (
                    data.map((item, index) => {
                        const { text, date } = item;
                        return (
                            <div className="d-flex justify-content-between align-items-center gap-2" key={index}>
                                <div className="item-data">
                                    <div className="px-2 fs-4">{text}</div>
                                    <div className="px-3 fs-6">{date}</div>
                                </div>
                                <div className="item-actions d-flex justify-content-between gap-1 mb-1 px-2">
                                    {action_icons.includes("like") && (
                                        <button className='text-center text-white bg-black border border-0 fs-7' style={{ width: '80px', height: '80px' }} aria-label="Like">
                                            <IconLike />
                                            LIKE
                                        </button>
                                    )}
                                    {action_icons.includes('reply') && (
                                        <button className='text-center text-white bg-black border border-0 fs-7' style={{ width: '80px', height: '80px' }} aria-label="Reply">
                                            <IconReply />
                                            REPLY
                                        </button>
                                    )}
                                    {action_icons.includes('retweet') && (
                                        <button className='text-center text-white bg-black border border-0 fs-7' style={{ width: '80px', height: '80px' }} aria-label="Retweet">
                                            <IconRetweet />
                                            RETWEET
                                        </button>
                                    )}
                                    {action_icons.includes('delete') && (
                                        <button className='text-center text-white bg-danger border border-0 fs-7' style={{ width: '80px', height: '80px' }} aria-label="Delete">
                                            <IconTrash />
                                            DELETE
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default CustomTable;
