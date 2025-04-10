
interface SnakeProps {
    node_count: number | string | undefined;
}

function Snake({ node_count }: SnakeProps) {
    return (
        <div>{node_count}</div>
    );
}

export default Snake;
