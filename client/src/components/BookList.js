import {useQuery} from "@apollo/client";
import {getBooksQuery} from "../queries/queries";
import BookDetails from "./BookDetails";
import {useState} from "react";

function BookList () {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [selectedBookId, setSelectedBookId] =  useState('');

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <div>
            <ul id="book-list">
                {data.books.map(book=> (
                    <li key={book.id}
                        onClick={()=> setSelectedBookId(book.id)}
                    >{book.name}</li>))
                }
            </ul>
            <BookDetails bookId={selectedBookId}/>
        </div>
    )
}

export default BookList;