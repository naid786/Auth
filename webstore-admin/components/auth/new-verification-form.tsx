"use client"
import { BeatLoader } from "react-spinners"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { CardWrapper } from "./card-wrapper"
import { newVerification } from "@/actions/new-verification"
import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"

export const NewVerificationForm = () => {
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()

    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {
        if (!token) {
            setError("Missing token");
            return;
        }

        newVerification(token)
            .then((data) => {
                setError(data.error)
                setSuccess(data.success)
            })
            .catch(() => {
                setError("Something went wrong")
            })
    }, [token,success,error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div>
            <CardWrapper
                headerLabel="Confirm your verification"
                backButonLabel="Back to login"
                backButtonHref="/auth/login"
                showSocial={false}
            >
                <div className="flex items-center w-full justify-center">
                    {!success && !error && (
                        < BeatLoader />
                    )}

                    <FormSuccess message={success} />
                    {!success && (
                        <FormError message={error} />
                    )}
                    
                </div>
            </CardWrapper>
        </div>

    )
}