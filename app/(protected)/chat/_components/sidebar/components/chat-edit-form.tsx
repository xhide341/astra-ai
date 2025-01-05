import { Input } from "@/components/ui/input";

interface ChatEditFormProps {
    initialTitle: string;
    onSubmit: (newTitle: string) => void;
    onCancel: () => void;
}

const ChatEditForm = ({ initialTitle, onSubmit, onCancel }: ChatEditFormProps) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newTitle = formData.get('title') as string;
        onSubmit(newTitle);
    };

    return (
        <form onSubmit={handleSubmit} className="px-3 py-2">
            <Input
                name="title"
                autoFocus
                defaultValue={initialTitle}
                onBlur={onCancel}
                className="h-6 text-xs"
            />
        </form>
    );
};

export default ChatEditForm; 