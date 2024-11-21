import { createContext, ReactNode, useState } from "react";

interface DashboardContextType{
    onEdit: boolean;
    setEditMode: (value: boolean) => void;
    submittedPost: boolean;
    setOnSubmittedPost: (value: boolean) => void;
    deletePost: boolean;
    setOnDeletePost: (value: boolean) => void;
    onDrafts: boolean;
    setOnDrafts: (value: boolean) => void;
    isDraft: boolean;
    setIsDraft: (value: boolean) => void;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [onEdit, setOnEdit] = useState(false);
    const [submittedPost, setSubmittedPost] = useState(false)
    const [deletePost, setDeletePost] = useState(false)
    const [onDrafts, setDrafts] = useState(false)
    const [isDraft, setOnIsDraft] = useState(false)

    return (
        <DashboardContext.Provider value={{ onEdit, setEditMode: setOnEdit, submittedPost, setOnSubmittedPost: setSubmittedPost, deletePost, setOnDeletePost: setDeletePost,
        onDrafts, setOnDrafts: setDrafts, isDraft, setIsDraft: setOnIsDraft}}>
            {children}
        </DashboardContext.Provider>
    );
};