<script setup lang="ts">
import { ref } from "vue";
import {
	DateFormatter,
	type DateValue,
	getLocalTimeZone,
} from "@internationalized/date";

import { Calendar as CalendarIcon } from "lucide-vue-next";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "~/lib/utils";

type Props = {
	placeholder?: string;
	description?: string;
	max?: DateValue;
	min?: DateValue;
	label?: string;
	name: string;
};
const {
	placeholder = "Pilih Tanggal",
	name,
	max,
	min,
	description,
	label,
} = defineProps<Props>();
const df = new DateFormatter("id-Id", {
	dateStyle: "long",
});

const value = defineModel<DateValue>();
</script>

<template>
	<FormField v-slot="{ setValue }" :name="name">
		<FormItem class="flex flex-col">
			<FormLabel v-if="label">{{ label }}</FormLabel>
			<Popover>
				<PopoverTrigger as-child>
					<FormControl>
						<Button
							variant="outline"
							:class="
								cn(
									'w-full ps-3 text-start font-normal',
									!value && 'text-muted-foreground'
								)
							"
						>
							<span>{{
								value
									? df.format(
											value.toDate(getLocalTimeZone())
									  )
									: placeholder
							}}</span>
							<CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
						</Button>
						<input hidden />
					</FormControl>
				</PopoverTrigger>
				<PopoverContent class="w-auto p-0">
					<Calendar
						v-model="value"
						:calendar-label="label"
						initial-focus
						:min-value="min"
						:max-value="max"
						@update:model-value="
							v => {
								if (v)
									setValue(
										dateToEpochSecond(dateValueToDate(v))
									);
								else setValue(undefined);
							}
						"
					/>
				</PopoverContent>
			</Popover>
			<FormDescription v-if="description">
				{{ description }}
			</FormDescription>
			<FormMessage />
		</FormItem>
	</FormField>
</template>
