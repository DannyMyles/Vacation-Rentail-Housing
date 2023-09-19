import { Toast } from "primereact/toast";
import { useRef } from "react";

export function useToast(){
    const toast = useRef<Toast>(null);
    const sendSuccessToast=(summary:string, detail:string)=>{
        toast.current?.show({severity:'success', summary:summary, detail:detail, life:2000});
    }
    const sendErrorToast=(summary:string, detail:string)=>{
        toast.current?.show({severity:'error', summary:summary, detail:detail, life:2000});
    }
    const sendInfoToast=(summary:string, detail:string)=>{
        toast.current?.show({severity:'info', summary:summary, detail:detail, life:2000});
    }

    return {
        sendSuccessToast,
        sendErrorToast,
        sendInfoToast,
        toast
    }
}