"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Modal from "../../modal";
import { Button } from "src/shared/ui/shadcn/components/ui/button";
import { FilterIcon } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/shared/ui/shadcn/components/ui/form";
import { Checkbox } from "src/shared/ui/shadcn/components/ui/checkbox";
import { toast } from "sonner";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "src/app/store/store";
import { RootState } from "src/app/store/rootReducer";
import { updateFilters } from "@/app/store/slices/filterSlice";
import { items } from "@/app/data/sampleFilterData";
const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Вы должны выбрать хотя бы один жанр",
  }),
});
interface args {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export default function FilterModal() {
  const [isOpen, setOpen] = useState(Boolean);
  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          setOpen(true);
        }}
      >
        <span className="my-auto hidden sm:flex focus:outline-0 focus:border-0 focus:ring-0 focus:bg-gray-100">
          Фильтры
        </span>
        <FilterIcon className="h-5 w-5 sm:ml-1" />
      </Button>
      <Provider store={store}>
        <Modal showModal={isOpen} setShowModal={setOpen} className="p-8 z-50">
          <h2 className="text-xl mb-5">Фильтры</h2>
          <FilterModalContent setOpen={setOpen} />
        </Modal>
      </Provider>
    </>
  );
}

function FilterModalContent({ setOpen }: args) {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filter.items);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: filters,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setOpen(false);
    toast("Фильтры успешно сохранены 💾", { duration: 1500 });
    dispatch(updateFilters(data.items));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Жанры</FormLabel>
                <FormDescription>
                  Выберите жанры книг, которые вы хотите видеть
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"outline"}>
          Сохранить
        </Button>
      </form>
    </Form>
  );
}
