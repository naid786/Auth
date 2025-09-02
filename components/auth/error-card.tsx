import { BsExclamationTriangle } from "react-icons/bs";
import { BackButton } from "./back-button"
import { CardWrapper } from "./card-wrapper";
import { Header } from "./header"
import {
    Card,
    CardFooter,
    CardHeader
} from "@/components/ui/card"

export const ErrorCard = () =>{
    return (
        <CardWrapper
            headerLabel="Oops! Something went wrong"
            backButonLabel="Back to login"
            backButtonHref="/auth/login"
            showSocial={false}
        >
            <div className="w-full flex justify-center items-center">
                <BsExclamationTriangle  className="text-destructive"/>
            </div>
            
        </CardWrapper>
        
    )
};