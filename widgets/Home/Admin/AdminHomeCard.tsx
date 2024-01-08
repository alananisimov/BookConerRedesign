import { Card, CardContent } from "shadcn/components/ui/card";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Badge } from "shadcn/components/ui/badge";
import { Input } from "shadcn/components/ui/input";
import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button } from "shadcn/components/ui/button";
import createBook from "@/app/actions/books/createBook.server";
import { put } from "@vercel/blob";
import { toast } from "sonner";
import { Dispatch } from "@reduxjs/toolkit";
import { book_plus_reviews } from "@/app/models";

export default function AdminHomeCard() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [formValues, setFormValues] = useState({
    category: "",
    genre: "",
    name: "",
    price: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedImage(file || null);
  };
  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedImage) return;
    const blob = await put(selectedImage.name, selectedImage, {
      access: "public",
      token: "vercel_blob_rw_M8q0hKg7wGVJOfBX_y1xXDaixXou8Sj0BU3kBA8tewNurTL",
    });
    if (!blob.url) toast("Не удалось загрузить изображение");

    const res = await createBook({
      description: formValues.description,
      title: formValues.name,
      price: parseInt(formValues.price),
      image: blob.url,
      category: formValues.category,
      genre: formValues.genre,
    });

    console.log(res);
    if (res) {
      toast("Вы добавили книгу");
    }
  }
  return (
    <Card className={" "}>
      <form onSubmit={submitForm} id="form_id">
        <CardContent className="grid">
          <div className="hover:scale-105 transition-all z-0 max-h-40 mt-6 rounded-lg border border-dashed border-gray-900/25 px-6 py-3">
            <div className="text-center">
              <PhotoIcon
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <div className=" mt-2 flex flex-col text-sm leading-6 text-gray-600 overflow-ellipsis">
                <label
                  htmlFor="file-upload"
                  className=" relative cursor-pointer rounded-md bg-white font-semibold text-cyan-700  "
                >
                  <span className="line-clamp-1">Загрузите картинку</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    required
                    className="sr-only"
                    onChange={handleImageChange}
                  />
                </label>
                <p className="pl-1 text-xs line-clamp-1">
                  или просто перетащите
                </p>
              </div>
              <p className="text-xs leading-5 text-gray-600">
                PNG, но лучше JPG, JPEG
              </p>
              <span className="text-xs my-4">
                {selectedImage && `Выбрано ${selectedImage.name}`}
              </span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex flex-col xl:flex-row gap-3 ">
              <Badge
                className="text-xs font-semibold px-2.5 py-0.5"
                variant={"outline"}
              >
                <input
                  placeholder="Категория"
                  required
                  name="category"
                  onChange={handleInputChange}
                  className="focus:border-border focus:ring-0 focus:outline-none"
                />
              </Badge>
              <Badge
                className="text-xs font-semibold px-2.5 py-0.5"
                variant={"outline"}
              >
                <input
                  placeholder="Жанр"
                  required
                  onChange={handleInputChange}
                  name="genre"
                  className="focus:border-border focus:ring-0 focus:outline-none"
                />
              </Badge>
            </div>
            <div className="my-2 font-semibold leading-tight text-ellipsis text-wrap line-clamp-1 break-words">
              <input
                required
                placeholder="Название"
                name="name"
                onChange={handleInputChange}
                className="focus:border-border focus:ring-0 focus:outline-none"
              />
            </div>

            <div>
              <input
                placeholder="Цена"
                name="price"
                required
                onChange={handleInputChange}
                type="number"
                className="focus:border-border focus:ring-0 focus:outline-none"
              />
              <div className="text-gray-600 text-sm mt-2"></div>
            </div>
            <div>
              <textarea
                required
                placeholder="Описание"
                name="description"
                onChange={handleInputChange}
                className="p-0 text-xs w-full placeholder:text-sm focus:border-border focus:ring-0 focus:outline-none"
              />
            </div>
            <div>
              <Button
                type="submit"
                variant={"outline"}
                className="text-cyan-700"
              >
                Добавить
              </Button>
            </div>
          </div>
        </CardContent>
      </form>
    </Card>
  );
}
