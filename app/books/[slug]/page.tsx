import Book from "@/app/models";
import BookView, { BookViewWrapper } from "@/components/BookView";
import NoBooks from "@/components/books/NoBooks";
import prisma from "@/lib/prisma";
export default async function BookPreview({ params }: { params: { slug: string } }) {
    let selectedBook = await prisma.book.findFirst({
        where: {
            id: parseInt(params.slug) || 666
        }
    });
    console.log(selectedBook)
    return(
        <>
        { selectedBook ? 
        <div className="z-10 h-full -mt-12">
            <BookViewWrapper product={selectedBook}/>
        </div>
        :
        <div className="z-10  px-6 xl:px-0 lg:max-w-screen-xl xl:mx-auto my-auto ">
             <div className=""><NoBooks/></div>
        </div>
        }
        </>
    )
}