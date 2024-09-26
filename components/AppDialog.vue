<script setup lang="ts">
import { useAlertDialogStore } from "~/store/alert-dialog";

const alertDialogStore = useAlertDialogStore();
</script>

<template>
	<AlertDialog :open="alertDialogStore.open">
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>{{
					alertDialogStore.state.title
				}}</AlertDialogTitle>
				<AlertDialogDescription>
					{{ alertDialogStore.state.message }}
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel @click="alertDialogStore.state.onCancel">
					{{ alertDialogStore.state.cancelText }}
				</AlertDialogCancel>
				<AlertDialogAction as-child>
					<Button
						variant="destructive"
						@click="alertDialogStore.state.onConfirm"
					>
						{{ alertDialogStore.state.confirmText }}
					</Button>
				</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</template>
