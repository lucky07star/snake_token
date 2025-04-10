
interface MessageTableProps {
    height?: string;
    data: Array<{ icon: string, username: string, userid: string, message: string }>;
}

function MessageTable({ height = '38vh', data, }: MessageTableProps) {
    return (
        <div className="w-100 border-0 bg-green-960">
            <div className='table-container ' style={{ height: `${height}`, overflowY: 'scroll' }}>
                {data.length === 0 ? (
                    <div className="fs-3 text-center p-3 border border-1">No Data</div>
                ) : (
                    data.map((item, index) => {
                        const { icon, username, userid, message } = item;
                        return (
                            <div className="w-100 border-bottom border-gray-300 p-3" key={index}>
                                <div className="user-info d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start align-items-center mb-2">
                                        <img src={icon} style={{ width: '60px', height: '60px' }} alt="icon" />
                                        <div className="px-2">
                                            <div className="px-1 text-gray-400">{username}</div>
                                            <div className="px-1 text-gray-400">{userid}</div>
                                        </div>
                                    </div>
                                    <button className="border border-0 bg-light-green-950 px-4 py-2">Follow</button>
                                </div>
                                <div className="user-message w-100">
                                    <p className="text-gray-400 m-0" style={{ fontFamily: 'Arial' }}>{message}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default MessageTable;
