import { useEffect } from "react";

export function useDocumentClick() {
    useEffect(() => {

        const handleDocumentClick = (e) => {
            console.log("Document clicked!!");
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    });
}