import type { ButtonProps } from "~/components/ui/button";

type Payload = {
	message: string;
	title: string;
	cancelText?: string;
	onCancel?: () => void;
	confirmText?: string;
	confirmButtonProps?: ButtonProps;
	onConfirm: () => void;
};
export const useAlertDialogStore = defineStore("alert-dialog", () => {
	const open = ref(false);

	const state = reactive<Payload>({
		message: "",
		title: "",
		onConfirm: () => {},
		cancelText: "Batal",
		confirmText: "Konfirmasi",
		confirmButtonProps: undefined,
	});

	const onCancel = () => {
		open.value = false;

		if (state.onCancel) state.onCancel();
	};

	const openDialog = (payload: Payload) => {
		open.value = true;
		state.message = payload.message;
		state.title = payload.title;
		state.onConfirm = payload.onConfirm;
		state.onCancel = onCancel;

		if (payload.cancelText) state.cancelText = payload.cancelText;

		if (payload.confirmText) state.confirmText = payload.confirmText;

		if (payload.confirmButtonProps)
			state.confirmButtonProps = payload.confirmButtonProps;
	};

	const closeDialog = () => {
		open.value = false;
	};

	return {
		state,
		open,
		openDialog,
		onCancel,
		closeDialog,
	};
});
