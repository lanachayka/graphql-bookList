import {addBookMutation, getAuthorsQuery, getBooksQuery} from "../queries/queries";
import {useState} from "react";
import {useQuery, useMutation} from "@apollo/client";

function AddBook () {

    const [newBookName, setNewBookName] = useState('');
    const [newBookGenre, setNewBookGenre] = useState('');
    const [newBookAuthorId, setNewBookAuthorId] = useState('');

    const { loading, data } = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);

    const displayAuthors = () => {
        if (loading) {
            return (<option disabled>Loadings authors...</option>);
        } else {
            return data.authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
            ))
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
            addBook({
                variables: {name: newBookName, genre: newBookGenre, authorId: newBookAuthorId},
                refetchQueries: [{query: getBooksQuery}]
            })
    }

    return (
        <form id="add-book" onSubmit={submitForm}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e)=>setNewBookName(e.target.value)} />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e)=> setNewBookGenre(e.target.value)} />
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e)=> {setNewBookAuthorId(e.target.value)}}>
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button type="submit"> + </button>
        </form>
    )
}

export default AddBook;