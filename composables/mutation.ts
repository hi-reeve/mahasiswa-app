import { type Ref } from "vue";
type ErrorResponse = {
	statusCode: number;
	statusMessage: string;
};

type MutationFunction<TVariables, TResult> = (
	variables: TVariables
) => Promise<TResult>;

interface UseMutationResult<TVariables, TResult> {
	loading: Ref<boolean>;
	error: Ref<ErrorResponse | null>;
	mutate: (variables: TVariables) => Promise<void>;
	data: Ref<TResult | null>;
}

type MutationOptions<TResult, TVariables> = {
	onSuccess?: (data: TResult, variables: TVariables) => void;
	onError?: (error: ErrorResponse) => void;
};

export const useMutation = <TVariables = unknown, TResult = unknown>(
	mutationFunction: MutationFunction<TVariables, TResult>,
	options?: MutationOptions<TResult, TVariables>
): UseMutationResult<TVariables, TResult> => {
	const loading = ref(false);
	const error = ref<ErrorResponse | null>(null);
	const data = shallowRef<TResult | null>(null);

	const mutate = async (variables: TVariables): Promise<void> => {
		loading.value = true;
		error.value = null;

		try {
			const result = await mutationFunction(variables);
			data.value = result;
			if (options?.onSuccess) options.onSuccess(result, variables);
		} catch (err) {
			error.value = err as ErrorResponse;
			if (options?.onError) options.onError(err as ErrorResponse);
		} finally {
			loading.value = false;
		}
	};

	return {
		loading,
		error,
		mutate,
		data,
	};
};
