import { AsyncFunctionDetails } from "shared/types";
import { ToastProps } from "@/lib/types";
import { useState } from "react";

export class UserError extends Error {}

type useServerActionType = <F>(
    action: F,
    options: {
        loadingToast: ToastProps;
        successToast: ToastProps;
        errorToast: ToastProps;
        onSuccess?: (result: AsyncFunctionDetails<F>["result"]) => void;
        onError?: (error: UserError) => void;
        onServerError?: (error: Error) => void;
        onFinished?: () => void;
        showLoading?: boolean;
        handleSuccess?: boolean;
        handleError?: boolean;
        handleServerError?: boolean;
    },
) => {
    action: F;
    pending: boolean;
};

export const useServerAction: useServerActionType = (
    action,
    {
        loadingToast,
        successToast,
        errorToast,
        onSuccess,
        onError,
        onServerError,
        onFinished,
        showLoading = true,
        handleSuccess = true,
        handleError = true,
        handleServerError = true,
    },
) => {
    const [pending, setPending] = useState(false);

    const wrappedAction = async (
        ...params: AsyncFunctionDetails<typeof action>["args"]
    ) => {
        setPending(true);

        return new Promise((resolve, reject) => {
            action(...params).then((result: ReturnType<typeof action>) => {});
        });
    };

    return {
        action: wrappedAction,
        pending,
    };
};
